import classNames from "classnames/bind";
import styles from "./ModalTicket.module.scss";
import { Divider, Modal } from "antd";
import { memo, useState } from "react";
import {
    createTicketService,
    deleteAllTicketService,
    deleteTicketService,
    getTicketService,
    handleUpdateTicketService,
} from "../../../../../service/ticketService";
import Swal from "sweetalert2";
import { handleGetStandService } from "../../../../../service/standService";
import { handleApi } from "../../../../../service/handleApi";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const ModalTicket = memo(function ModalTicket({ info }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [infoCalendar, setInfoCalendar] = useState(null);
    const [listTicket, setListTicket] = useState([]);
    const [listCheckCreate, setListCheckCreate] = useState([]);
    const [listCheckDelete, setListCheckDelete] = useState([]);

    const [listStand, setListStand] = useState([]);

    const showModal = async () => {
        setIsModalOpen(true);
        setInfoCalendar(info);
        await handleGetTicketAndStand();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleGetTicketAndStand = async () => {
        // eslint-disable-next-line react/prop-types
        const res = await getTicketService(+info?.id);

        // eslint-disable-next-line react/prop-types
        const resListStand = await handleGetStandService(info.stadiumId);
        if (resListStand.errorCode === 0 && res.errorCode === 0) {
            let arrSort = res.data.sort((itemOne, itemTwo) => {
                let indexOne = +itemOne.name.slice(1);
                let indexTwo = +itemTwo.name.slice(1);
                return indexOne - indexTwo;
            });
            setListTicket(arrSort);

            const arrClone = resListStand.data.filter((item) => {
                let check = 0;
                res.data.forEach((ele) => {
                    if (ele.name === item.name) {
                        check = check + 1;
                    }
                });
                if (check === 0) {
                    return item;
                }
            });
            setListStand(arrClone);
        }
    };

    const handleChangeValueTicket = (indexChange, w, value) => {
        let listClone = listTicket.map((item, index) => {
            if (index === indexChange) {
                w === 1
                    ? value === "true"
                        ? (item.isVip = true)
                        : false
                    : w === 2
                    ? (item.price = value)
                    : (item.totalTicket = value);
            }

            return item;
        });
        setListTicket(listClone);
    };

    const handleChangeValueStand = (indexChange, w, value) => {
        let listClone = listStand.map((item, index) => {
            if (index === indexChange) {
                w === 1
                    ? value === "true"
                        ? (item.isVipDefault = true)
                        : false
                    : w === 2
                    ? (item.priceDefault = value)
                    : (item.totalTicketDefault = value);
            }

            return item;
        });
        setListStand(listClone);
    };

    const handleChecked = (index, isCreate) => {
        let listNew;
        if (isCreate) {
            if (!listCheckCreate.includes(index)) {
                listNew = [...listCheckCreate, index];
                setListCheckCreate(listNew);
                return;
            }
            listNew = listCheckCreate.filter((item) => item !== index);
            setListCheckCreate(listNew);
            return;
        }

        if (!listCheckDelete.includes(index)) {
            listNew = [...listCheckDelete, index];
            setListCheckDelete(listNew);
            return;
        }
        listNew = listCheckDelete.filter((item) => item !== index);
        setListCheckDelete(listNew);
    };

    const handleValidateCreate = (isCreateAll) => {
        if (isCreateAll) {
            listStand.forEach((item) => {
                if (
                    item.isReady &&
                    (!item.priceDefault || !item.totalTicketDefault)
                ) {
                    Swal.fire({
                        icon: "warning",
                        title: "Please enter complete information for the selected fields",
                    });
                    return false;
                }
            });
            return true;
        }

        if (!listCheckCreate.length) {
            Swal.fire({
                icon: "warning",
                title: "please checked stand !",
            });
            return false;
        }

        listCheckCreate.forEach((item) => {
            if (
                !listStand[item].priceDefault ||
                !listStand[item].totalTicketDefault
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Please enter complete information for the selected fields",
                });
                return false;
            }
        });
        return true;
    };

    const handleCreateTicket = async (isCreateAll) => {
        setIsLoading(true);
        let check = handleValidateCreate(isCreateAll);
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = isCreateAll
            ? listStand
                  .filter((item) => item.isReady)
                  .map((item) => {
                      return {
                          name: item.name,
                          price: item.priceDefault,
                          totalTicket: item.totalTicketDefault,
                          calendarId: infoCalendar.id,
                          isVip: item.isVipDefault,
                      };
                  })
            : listStand
                  .filter((item, index) => listCheckCreate.includes(index))
                  .map((item) => {
                      return {
                          name: item.name,
                          price: item.priceDefault,
                          totalTicket: item.totalTicketDefault,
                          calendarId: infoCalendar.id,
                          isVip: item.isVipDefault,
                      };
                  });

        try {
            let res = await handleApi(createTicketService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Create successfully",
                });
                setListCheckCreate([]);
                await handleGetTicketAndStand();
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "warning",
                title: err.response.data.message,
            });
        }
        setIsLoading(false);
    };

    const handleDelete = async (isDeleteAll) => {
        Swal.fire({
            title: `Do you want delete ${isDeleteAll ? "all" : ""} tickets ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let dataBuider;

                    if (!isDeleteAll) {
                        dataBuider = listTicket
                            .filter((item, index) =>
                                listCheckDelete.includes(index)
                            )
                            .map((item) => {
                                return { id: item.id };
                            });
                    }

                    let Res = isDeleteAll
                        ? await handleApi(
                              deleteAllTicketService,
                              infoCalendar.id
                          )
                        : await handleApi(deleteTicketService, dataBuider);

                    try {
                        if (Res.errorCode === 0) {
                            Swal.fire({
                                icon: "success",
                                title: `delete successfully`,
                            });

                            setListCheckDelete([]);
                            await handleGetTicketAndStand(infoCalendar.id);
                        }
                    } catch (err) {
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: err.response.data.message,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdateTicket = async (index) => {
        Swal.fire({
            title: `Do you want update ${listTicket[index].name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let dataBuider = listTicket[index];

                    let Res = await handleApi(
                        handleUpdateTicketService,
                        dataBuider
                    );

                    try {
                        if (Res.errorCode === 0) {
                            Swal.fire({
                                icon: "success",
                                title: `delete successfully`,
                            });

                            await handleGetTicketAndStand(infoCalendar.id);
                        }
                    } catch (err) {
                        console.log(err);
                        Swal.fire({
                            icon: "error",
                            title: err.response.data.message,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className={cx("form-modal-ticket", "test-modal")}>
            <button onClick={showModal}>Ticket</button>
            <Modal
                title="Modal ticket"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1200}
                className={cx("modal-ticket")}
            >
                <div
                    className={cx("form-content-modal")}
                    style={{ maxHeight: "450px", overflow: "auto" }}
                >
                    <div className="w-100 d-flex justify-content-end">
                        <div className="w-25 border border-dark rounded px-3 mx-2">
                            <i className="bi bi-exclamation-triangle-fill text-danger fs-4 "></i>
                            <span> Stand is being maintained</span>
                        </div>
                        <button
                            className="w-20 border border-1 rounded shadow-sm p-2 mb-2 bg-danger text-white"
                            style={{ marginRight: "10px" }}
                            onClick={() => handleDelete(1)}
                        >
                            <i className="bi bi-trash3 p-2"></i>
                            Delete All
                        </button>

                        <button
                            className="w-20 border border-1 rounded shadow-sm p-2 mb-2 bg-danger text-white"
                            onClick={() => handleDelete(0)}
                        >
                            <i className="bi bi-trash3 p-2"></i>Delete More
                        </button>
                    </div>
                    <p className={cx("text-center fs-3 fw-bold")}>
                        Manage Ticket
                    </p>
                    {listTicket &&
                        listTicket.length > 0 &&
                        listTicket.map((item, index) => {
                            return (
                                <div
                                    className={cx(
                                        "form-create d-flex justify-content-around align-items-center mb-2"
                                    )}
                                    key={index}
                                >
                                    <div className={cx("form-checkbox")}>
                                        {listCheckDelete.includes(index) ? (
                                            <input
                                                checked
                                                type="checkbox"
                                                onChange={() =>
                                                    handleChecked(index, 0)
                                                }
                                            />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    handleChecked(index, 0)
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className={cx("form-input")}>
                                        <label htmlFor="name" className="mb-2">
                                            Name
                                        </label>
                                        <br />
                                        <div className={cx("name-ticket")}>
                                            <p>{item.name}</p>
                                        </div>
                                    </div>

                                    <div className={cx("form-input")}>
                                        <label htmlFor="isVip" className="mb-2">
                                            Vip ?
                                        </label>
                                        <br />
                                        <select
                                            className="p-1 border border-1 rounded shadow-sm"
                                            value={item.isVip}
                                            onChange={(e) =>
                                                handleChangeValueTicket(
                                                    index,
                                                    1,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={false}>false</option>
                                            <option value={true}>true</option>
                                        </select>
                                    </div>

                                    <div className={cx("form-input")}>
                                        <label htmlFor="price" className="mb-2">
                                            Price ($)
                                        </label>
                                        <br />
                                        <input
                                            type="number"
                                            id="price"
                                            className="p-1 border border-1 rounded shadow-sm"
                                            value={item.price}
                                            onChange={(e) =>
                                                handleChangeValueTicket(
                                                    index,
                                                    2,
                                                    +e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className={cx("form-input")}>
                                        <label
                                            htmlFor="totalTicket"
                                            className="mb-2"
                                        >
                                            Total Ticket
                                        </label>
                                        <br />
                                        <input
                                            type="number"
                                            id="totalTicket"
                                            className="p-1 border border-1 rounded shadow-sm"
                                            value={item.totalTicket}
                                            onChange={(e) =>
                                                handleChangeValueTicket(
                                                    index,
                                                    3,
                                                    +e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <button
                                        className={cx(
                                            "btn btn-warning text-white mt-4"
                                        )}
                                        onClick={() =>
                                            handleUpdateTicket(index)
                                        }
                                    >
                                        Update
                                    </button>
                                </div>
                            );
                        })}
                    <Divider />

                    <div className={cx("form-list-stand")}>
                        <div className="w-100 d-flex justify-content-end">
                            <button
                                className="w-25 border border-1 rounded shadow-sm p-3 mb-2 bg-success text-white"
                                style={{ marginRight: "10px" }}
                                onClick={() => handleCreateTicket(true)}
                            >
                                Create All
                            </button>
                            {isLoading ? (
                                <button
                                    disabled
                                    className={cx(
                                        "button-disabled w-25  bg-success text-white p-2 rounded mb-2 border-0"
                                    )}
                                >
                                    <div className="spinner-border text-light"></div>
                                </button>
                            ) : (
                                <button
                                    className="w-25 border border-1 rounded shadow-sm p-3 mb-2 bg-success text-white"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => handleCreateTicket(false)}
                                >
                                    Create
                                </button>
                            )}
                        </div>
                        <p
                            className={cx("text-center fs-3 fw-bold")}
                            onClick={handleCreateTicket}
                        >
                            Create Ticket
                        </p>
                        {listStand &&
                            listStand.length > 0 &&
                            listStand.map((item, index) => {
                                return (
                                    <div
                                        className={cx("stand-item")}
                                        key={index}
                                    >
                                        <div className={cx("form-checkbox")}>
                                            {item.isReady ? (
                                                listCheckCreate.includes(
                                                    index
                                                ) ? (
                                                    <input
                                                        checked
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleChecked(
                                                                index,
                                                                1
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleChecked(
                                                                index,
                                                                1
                                                            )
                                                        }
                                                    />
                                                )
                                            ) : (
                                                <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                                            )}
                                        </div>

                                        <div className={cx("form-input")}>
                                            <label
                                                htmlFor="name"
                                                className="mb-2"
                                            >
                                                Name
                                            </label>
                                            <br />
                                            <div className={cx("name-ticket")}>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>

                                        <div className={cx("form-input")}>
                                            <label
                                                htmlFor="isVip"
                                                className="mb-2"
                                            >
                                                Vip ?
                                            </label>
                                            <br />
                                            <select
                                                className="p-1 border border-1 rounded shadow-sm"
                                                value={item.isVipDefault}
                                                onChange={(e) =>
                                                    handleChangeValueStand(
                                                        index,
                                                        1,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value={false}>
                                                    false
                                                </option>
                                                <option value={true}>
                                                    true
                                                </option>
                                            </select>
                                        </div>

                                        <div className={cx("form-input")}>
                                            <label
                                                htmlFor="price"
                                                className="mb-2"
                                            >
                                                Price ($)
                                            </label>
                                            <br />
                                            <input
                                                type="number"
                                                id="price"
                                                className="p-1 border border-1 rounded shadow-sm"
                                                value={item.priceDefault}
                                                onChange={(e) =>
                                                    handleChangeValueStand(
                                                        index,
                                                        2,
                                                        +e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className={cx("form-input")}>
                                            <label
                                                htmlFor="totalTicket"
                                                className="mb-2"
                                            >
                                                Total Ticket
                                            </label>
                                            <br />
                                            <input
                                                type="number"
                                                id="totalTicket"
                                                className="p-1 border border-1 rounded shadow-sm"
                                                value={item.totalTicketDefault}
                                                onChange={(e) =>
                                                    handleChangeValueStand(
                                                        index,
                                                        3,
                                                        +e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Modal>
        </div>
    );
});

export default ModalTicket;
