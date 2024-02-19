import classNames from "classnames/bind";
import styles from "./ManageSeason.module.scss";
import usePagination from "../../../../hooks/usePagination";
import {
    deleteSeasonService,
    getAllSeasonService,
} from "../../../../service/seasonService";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

export default function ManageSeason() {
    const [seasons, setSeasons] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const { data, meta, handleChangePage } = usePagination({
        api: getAllSeasonService,
        page: 1,
        pageSize: 5,
        is_load_more: false,
        is_reload: isReload,
    });

    useEffect(() => {
        if (data) {
            setSeasons(data);
        }
    }, [data]);

    const handleChangePagination = (index) => {
        handleChangePage(index);
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: `Do you want to delete season ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("ok");
                const _fetch = async () => {
                    let Res = await deleteSeasonService(data.index);
                    console.log(Res);
                    if (Res.errorCode === 0) {
                        setIsReload(!isReload);
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className={cx("form-table")}>
            <table>
                <thead>
                    <tr>
                        <th className={cx("col-index")}>Index</th>
                        <th className={cx("col-season")}>Season</th>
                        <th className={cx("col-des")}>Description</th>
                        <th className={cx("col-active")}>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {seasons &&
                        seasons.length > 0 &&
                        seasons.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.index}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: item.description,
                                            }}
                                        ></div>
                                    </td>
                                    <td>
                                        <div className={cx("form-active")}>
                                            <button
                                                className={cx("button-edit")}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={cx("button-delete")}
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            {meta && meta.currentPage <= meta.totalPages && (
                <Pagination
                    defaultCurrent={1}
                    total={meta.totalIteams}
                    pageSize={5}
                    className={cx("form-pagination")}
                    onChange={handleChangePagination}
                />
            )}
        </div>
    );
}
