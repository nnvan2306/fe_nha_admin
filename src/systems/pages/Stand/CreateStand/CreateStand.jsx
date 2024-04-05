import classNames from "classnames/bind";
import styles from "./CreateStand.module.scss";
import { useEffect, useState } from "react";
import { RouterDTO } from "../../../../utils/routes.dto";
import Swal from "sweetalert2";
import {
    handleCreateStandService,
    handleUpdateStandService,
} from "../../../../service/standService";
import { getStadiumService } from "../../../../service/stadiumService";
import { Tooltip } from "antd";
import { BASE_URL } from "../../../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function CreateStand() {
    const [isLoading, setIsLoading] = useState(false);
    const [listStadium, setListStadium] = useState([]);
    const [listForm, setListForm] = useState([
        {
            name: "",
            isReady: 1,
            isVipDefault: 0,
            priceDefault: 0,
            totalTicketDefault: 0,
            stadiumId: 0,
        },
    ]);

    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            let res = await getStadiumService();
            if (res.errorCode === 0) {
                setListStadium(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                            stadiumImage_url: item.stadiumImage_url,
                        };
                    })
                );
            }
        };
        fetch();

        if (location === RouterDTO.stand.update) {
            setListForm([
                {
                    name: state.name,
                    isReady: state.isReady,
                    isVipDefault: state.isVipDefault,
                    priceDefault: state.priceDefault,
                    totalTicketDefault: state.totalTicketDefault,
                    stadiumId: state.stadiumId,
                },
            ]);
        }
    }, []);

    const handleAddForm = (indexChange) => {
        if (indexChange === listForm.length - 1) {
            setListForm((prev) => [
                ...prev,
                {
                    name: "",
                    isReady: 1,
                    isVipDefault: 0,
                    priceDefault: 0,
                    totalTicketDefault: 0,
                    stadiumId: 0,
                },
            ]);
        } else {
            let arrClone = listForm.filter(
                (item, index) => index !== indexChange
            );
            setListForm(arrClone);
        }
    };

    const handleChangeValue = (indexChange, w, value) => {
        let listClone = listForm.map((item, index) => {
            if (index === indexChange) {
                w === 1
                    ? (item.name = value.toUpperCase())
                    : w === 2
                    ? (item.isReady = value)
                    : w === 3
                    ? (item.isVipDefault = value)
                    : w === 4
                    ? (item.priceDefault = value)
                    : w === 5
                    ? (item.totalTicketDefault = value)
                    : (item.stadiumId = value);
            }

            return item;
        });
        setListForm(listClone);
    };

    const handleValidate = () => {
        listForm.forEach((item) => {
            if (
                !item.name ||
                !item.priceDefault ||
                !item.totalTicketDefault ||
                !item.stadiumId
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "information mustn't empty !",
                });
                return false;
            }
        });
        return true;
    };

    const handleCreateStand = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }
        try {
            if (location === RouterDTO.stand.update) {
                listForm[0].id = state.id;
            }
            let res =
                location === RouterDTO.stand.update
                    ? await handleUpdateStandService(listForm)
                    : await handleCreateStandService(listForm);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "create successfully",
                });
                if (location === RouterDTO.stand.update) {
                    navigate(RouterDTO.stand.allStand, {
                        state: state.stadiumId,
                    });
                }
                setListForm([
                    {
                        name: "",
                        isReady: 1,
                        isVipDefault: 0,
                        priceDefault: 0,
                        totalTicketDefault: 0,
                        stadiumId: 0,
                    },
                ]);
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

    return (
        <div className={cx("form-create-stand", "container")}>
            {listForm &&
                listForm.length > 0 &&
                listForm.map((item, index) => {
                    return (
                        <div className={cx("row")} key={index}>
                            <div className={cx("col-1")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="name">Name</label>
                                    <br />
                                    <input
                                        id="name"
                                        type="text"
                                        value={item.name}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                1,
                                                e.target.value.toUpperCase()
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx("col-1")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="isReady">Ready ?</label>{" "}
                                    <br />
                                    <select
                                        id="isReady"
                                        value={item.isReady}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                2,
                                                +e.target.value
                                            )
                                        }
                                    >
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </select>
                                </div>
                            </div>

                            <div className={cx("col-1")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="isVip">Vip ?</label> <br />
                                    <select
                                        id="isVip"
                                        value={item.isVipDefault}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                3,
                                                +e.target.value
                                            )
                                        }
                                    >
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </select>
                                </div>
                            </div>

                            <div className={cx("col-2")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="price">
                                        Price (default)
                                    </label>{" "}
                                    <br />
                                    <input
                                        id="price"
                                        type="number"
                                        value={item.priceDefault}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                4,
                                                +e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx("col-2")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="totalTicket">
                                        Total Ticket (default)
                                    </label>{" "}
                                    <br />
                                    <input
                                        id="totalTicket"
                                        type="number"
                                        value={item.totalTicketDefault}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                5,
                                                +e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={cx("col-4")}>
                                <div className={cx("form-input")}>
                                    <label htmlFor="stadiumId">stadium</label>{" "}
                                    <br />
                                    <select
                                        className={cx("select-stadium")}
                                        id="stadiumId"
                                        value={item.stadiumId}
                                        onChange={(e) =>
                                            handleChangeValue(
                                                index,
                                                6,
                                                +e.target.value
                                            )
                                        }
                                    >
                                        <option value={0}>
                                            choose stadium
                                        </option>
                                        {listStadium &&
                                            listStadium.length > 0 &&
                                            listStadium.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item.value}
                                                        key={index}
                                                    >
                                                        {item.label}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    <Tooltip
                                        title={
                                            item.stadiumId ? (
                                                <img
                                                    src={`${BASE_URL}${
                                                        listStadium[
                                                            item.stadiumId
                                                        ]?.stadiumImage_url
                                                    }`}
                                                    alt="image"
                                                    style={{
                                                        width: "500px",
                                                        height: "350px",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                            ) : (
                                                "please choose stadium !"
                                            )
                                        }
                                        placement="left"
                                        trigger="click"
                                        style={{
                                            width: "1000px",
                                            height: "500px",
                                        }}
                                        width={500}
                                    >
                                        <i
                                            className={cx(
                                                "bi bi-eye-fill",
                                                "icon-view-stadium"
                                            )}
                                        ></i>
                                    </Tooltip>
                                </div>
                            </div>

                            {location === RouterDTO.stand.update ? (
                                <></>
                            ) : (
                                <div
                                    className={cx(
                                        "col-1",
                                        "d-flex justify-content-center align-items-end"
                                    )}
                                >
                                    <div
                                        className={cx("form-add")}
                                        onClick={() => handleAddForm(index)}
                                    >
                                        {index === listForm.length - 1 ? (
                                            <i className="bi bi-plus-circle"></i>
                                        ) : (
                                            <i className="bi bi-dash-circle"></i>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

            <div className={cx("form-action")}>
                {isLoading ? (
                    <button disabled className={cx("button-disabled")}>
                        <div
                            className="spinner-border text-light"
                            role="status"
                        ></div>
                    </button>
                ) : (
                    <button onClick={handleCreateStand}>
                        {location === RouterDTO.stand.update
                            ? "Update"
                            : "Create"}
                    </button>
                )}
            </div>
        </div>
    );
}
