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
import { Pagination } from "antd";

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
                        let Res = await handleApi(
                            handleUpdateActiveBillService,
                            infoBill.uuid
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
                        <th className={cx("th-match")}>Match</th>
                        <th className={cx("th-date")}>Date</th>
                        <th className={cx("th-stand")}>Stand</th>
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
                    {data &&
                        data.length > 0 &&
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={cx("td-match")}>Match</td>
                                    <td className={cx("td-date")}>Date</td>
                                    <td className={cx("td-stand")}>Stand</td>
                                    <td className={cx("td-email")}>
                                        {item.email}
                                    </td>
                                    <td className={cx("td-phone")}>
                                        {item.phoneNumber}
                                    </td>
                                    <td className={cx("td-price")}>
                                        {item.price}
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
                                        IsDelivered
                                    </td>
                                    <td className={cx("td-action")}>
                                        {item.address ? (
                                            <button
                                                className={cx(
                                                    "btn-notDelivered"
                                                )}
                                                onClick={() =>
                                                    handleUpdateActiveBill(item)
                                                }
                                            >
                                                IsDelivered
                                            </button>
                                        ) : (
                                            <button
                                                className={cx(
                                                    "btn-notDelivered"
                                                )}
                                                onClick={() =>
                                                    handleUpdateActiveBill(item)
                                                }
                                            >
                                                IsDelivered
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
                        })}
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
