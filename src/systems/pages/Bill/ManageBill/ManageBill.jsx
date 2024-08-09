import classNames from "classnames/bind";
import styles from "./ManageBill.module.scss";
import {
    handleDeleteBilllService,
    handleGetBillService,
    handleUpdateActiveBillService,
} from "../../../../service/billService";
import usePagination from "../../../../hooks/usePagination";
import { useState } from "react";
import Swal from "sweetalert2";
import { handleApi } from "../../../../service/handleApi";
import { Empty, Pagination } from "antd";
import moment from "moment";
import ModalDetailCalendar from "./ModalDetailCalendar/ModalDetailCalendar";

const cx = classNames.bind(styles);
export default function ManageBill() {
    const [isReload, setIsReload] = useState(false);

    const { data, meta, handleChangePage } = usePagination({
        api: handleGetBillService,
        page: 1,
        pageSize: 5,
        q: null,
        is_load_more: false,
        is_reload: isReload,
    });

    const handleReload = () => {
        setIsReload(!isReload);
    };

    const handleDelete = async (infoBill) => {
        Swal.fire({
            title: `Do you want to delete bill of ${infoBill.phoneNumber} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    try {
                        let Res = await handleApi(
                            handleDeleteBilllService,
                            infoBill.uuid
                        );
                        if (Res.errorCode === 0) {
                            Swal.fire({
                                icon: "success",
                                title: `delete  successfully`,
                            });
                            handleReload();
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

    const handleUpdateActiveBill = async (infoBill) => {
        Swal.fire({
            title: `Do you want to update IsDelivered  bill of ${infoBill.phoneNumber} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    try {
                        let dataBuider = {
                            uuid: infoBill.uuid,
                        };
                        let Res = await handleApi(
                            handleUpdateActiveBillService,
                            dataBuider
                        );

                        if (Res.errorCode === 0) {
                            Swal.fire({
                                icon: "success",
                                title: `update  successfully`,
                            });
                            handleReload();
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

    const handleChangePagination = (index) => {
        handleChangePage(index);
    };

    return (
        <div className={cx("form-bill")}>
            <table>
                <thead>
                    <tr>
                        <th className={cx("th-match")}>Stadium</th>
                        <th className={cx("th-date")}>Date</th>
                        <th className={cx("th-stand")}>Stand (Total Ticket)</th>
                        <th className={cx("th-email")}>email</th>
                        <th className={cx("th-phone")}>Phone</th>
                        <th className={cx("th-price ")}>Price</th>
                        <th className={cx("th-address")}>Address</th>
                        <th className={cx("th-city")}>City</th>
                        <th className={cx("th-country")}>Country</th>
                        <th className={cx("th-isDelivered")}>IsDelivered</th>
                        <th className={cx("th-action")}>Aciton</th>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={cx("td-match")}>
                                        <ModalDetailCalendar
                                            data={item.Ticket.Calendar}
                                        />
                                    </td>
                                    <td className={cx("td-date")}>
                                        {moment(
                                            item.Ticket.Calendar.date
                                        ).format("DD/MM/YYYY")}
                                    </td>
                                    <td className={cx("td-stand")}>
                                        {item.Ticket.name} ({item.totalTicket})
                                    </td>
                                    <td className={cx("td-email")}>
                                        {item.email}
                                    </td>
                                    <td className={cx("td-phone")}>
                                        {item.phoneNumber}
                                    </td>
                                    <td className={cx("td-price")}>
                                        {item.price} (VND)
                                    </td>
                                    <td className={cx("td-address")}>
                                        {item.address}
                                    </td>
                                    <td className={cx("td-city")}>
                                        {item.city}
                                    </td>
                                    <td className={cx("td-country")}>
                                        {item.country}
                                    </td>
                                    <td className={cx("td-isDelivered")}>
                                        {item.isDelivered ? (
                                            <span className="text-success">
                                                true
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                false
                                            </span>
                                        )}
                                    </td>
                                    <td className={cx("td-action")}>
                                        {item.isDelivered ? (
                                            <button
                                                className={cx(
                                                    "btn-notDelivered"
                                                )}
                                                onClick={() =>
                                                    handleUpdateActiveBill(item)
                                                }
                                            >
                                                Not Delivery
                                            </button>
                                        ) : (
                                            <button
                                                className={cx("btn-delivered")}
                                                onClick={() =>
                                                    handleUpdateActiveBill(item)
                                                }
                                            >
                                                Delivered
                                            </button>
                                        )}

                                        <button
                                            className={cx("btn-delete")}
                                            onClick={() => handleDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="12">
                                <div className="empty-container">
                                    <Empty style={{ padding: "40px" }} />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {meta && meta.currentPage <= meta.totalPages && (
                <Pagination
                    className={cx("form-pagination")}
                    defaultCurrent={1}
                    total={meta.totalIteams}
                    pageSize={5}
                    onChange={handleChangePagination}
                />
            )}
        </div>
    );
}
