import classNames from "classnames/bind";
import styles from "./ManageSeason.module.scss";
import usePagination from "../../../../hooks/usePagination";
import {
    deleteSeasonService,
    getSeasonService,
} from "../../../../service/seasonService";
import { Pagination } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import ModalUpdate from "./ModalUpdate/ModalUpdate";

const cx = classNames.bind(styles);

export default function ManageSeason() {
    const [isReload, setIsReload] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [infoSeasonUpdate, setInfoSeasonUpdtae] = useState(null);
    const { data, meta, handleChangePage } = usePagination({
        api: getSeasonService,
        page: 1,
        pageSize: 5,
        q: null,
        is_load_more: false,
        is_reload: isReload,
    });

    const handleChangePagination = (index) => {
        handleChangePage(index);
    };

    const handleReload = () => {
        setIsReload(!isReload);
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: `Do you want to delete season ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await deleteSeasonService(data.index);
                    if (Res.errorCode === 0) {
                        handleReload();
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdate = (season) => {
        setInfoSeasonUpdtae(season);
        setIsOpenModal(true);
    };

    const handleClose = () => {
        setIsOpenModal(false);
    };

    return (
        <div className={cx("form-manage")}>
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
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
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
                                                    className={cx(
                                                        "button-edit"
                                                    )}
                                                    onClick={() =>
                                                        handleUpdate(item)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={cx(
                                                        "button-delete"
                                                    )}
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
            </div>
            {meta && meta.currentPage <= meta.totalPages && (
                <Pagination
                    defaultCurrent={1}
                    total={meta.totalIteams}
                    pageSize={5}
                    className={cx("form-pagination")}
                    onChange={handleChangePagination}
                />
            )}

            {isOpenModal ? (
                <ModalUpdate
                    infoSeason={infoSeasonUpdate}
                    funcClose={handleClose}
                    funcReLoad={handleReload}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
