import classNames from "classnames/bind";
import styles from "./ModalTicket.module.scss";
import { Divider, Modal } from "antd";
import { memo, useState } from "react";
import {
    deleteAllTicketService,
    getTicketService,
} from "../../../../../service/ticketService";
import Swal from "sweetalert2";
import { handleGetStandService } from "../../../../../service/standService";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
const ModalTicket = memo(function ModalTicket({ info }) {
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
        setListTicket(listClone);
    };

    const handleChecked = (index, w) => {
        console.log("a");
        let listNew;
        if (w) {
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

    const handleCreateTicket = async () => {};

    const handleDeleteAll = async () => {
        Swal.fire({
            title: `Do you want delete all tickets ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await deleteAllTicketService(infoCalendar.id);
                    try {
                        if (Res.errorCode === 0) {
                            Swal.fire({
                                icon: "success",
                                title: `delete successfully`,
                            });
                            // setListTicketDelete([]);
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
                width={1000}
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
                            onClick={handleDeleteAll}
                        >
                            <i className="bi bi-trash3 p-2"></i>
                            Delete All
                        </button>
                        <button className="w-20 border border-1 rounded shadow-sm p-2 mb-2 bg-danger text-white">
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
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleChecked(index, 0)
                                            }
                                        />
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
                                className="w-25 border border-1 rounded shadow-sm p-2 mb-2 bg-success text-white"
                                style={{ marginRight: "10px" }}
                                onClick={handleDeleteAll}
                            >
                                Create
                            </button>
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
                                                <input
                                                    type="checkbox"
                                                    onChange={() =>
                                                        handleChecked(index, 1)
                                                    }
                                                />
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
