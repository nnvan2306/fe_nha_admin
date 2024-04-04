import classNames from "classnames/bind";
import styles from "./ManageStand.module.scss";
import { useEffect, useState } from "react";
import { getStadiumService } from "../../../../service/stadiumService";
import Swal from "sweetalert2";
import {
    handleDeleteStandService,
    handleGetStandService,
} from "../../../../service/standService";

const cx = classNames.bind(styles);

export default function ManageStand() {
    const [listStadium, setListStadium] = useState([]);
    const [listStand, setListStand] = useState([]);
    const [stadiumId, setStadiumId] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const res = await getStadiumService();
            if (res.errorCode === 0) {
                setListStadium(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
            }
        };
        fetch();
    }, []);

    const handleGetStand = async (stadiumId) => {
        try {
            let res = await handleGetStandService(stadiumId);
            if (res.errorCode === 0) {
                setListStand(res.data);
                setStadiumId(stadiumId);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        }
    };

    const handleDeleteStand = async (standId) => {};

    return (
        <div className={cx("form-manage-stand")}>
            <div className={cx("form-select-stadium")}>
                <select onChange={(e) => handleGetStand(e.target.value)}>
                    <option value={0}>choose stadium</option>
                    {listStadium &&
                        listStadium.length > 0 &&
                        listStadium.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>

            <div className={cx("form-table-stand")}>
                <table>
                    <thead>
                        <tr>
                            <td className={cx("th-name")}>Name</td>
                            <td className={cx("th-isReady")}>Ready ?</td>
                            <td className={cx("th-isVip")}>Vip ?</td>
                            <td className={cx("th-price")}>Price (default)</td>
                            <td className={cx("th-totalTicket")}>
                                Total ticket (default)
                            </td>
                            <td className={cx("th-action")}>Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {listStand &&
                            listStand.length > 0 &&
                            listStand.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx("th-name")}>
                                            {item.name}
                                        </td>
                                        <td className={cx("th-isReady")}>
                                            {item.isReady ? (
                                                <span
                                                    style={{ color: "green" }}
                                                >
                                                    Ready
                                                </span>
                                            ) : (
                                                <span style={{ color: "red" }}>
                                                    UnReady
                                                </span>
                                            )}
                                        </td>
                                        <td className={cx("th-isVip")}>
                                            {item.isVipDefault ? (
                                                <span
                                                    style={{ color: "green" }}
                                                >
                                                    Vip
                                                </span>
                                            ) : (
                                                <span>Normal</span>
                                            )}
                                        </td>
                                        <td className={cx("th-price")}>
                                            {item.priceDefault}
                                        </td>
                                        <td className={cx("th-totalTicket")}>
                                            {item.totalTicketDefault}
                                        </td>
                                        <td className={cx("td-action")}>
                                            <button
                                                className={cx("btn-delete")}
                                                onClick={() =>
                                                    handleDeleteStand(item.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button className={cx("btn-edit")}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
