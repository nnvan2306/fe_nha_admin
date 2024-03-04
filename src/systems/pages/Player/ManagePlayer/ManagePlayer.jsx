import classNames from "classnames/bind";
import styles from "./ManagePlayer.module.scss";
import Swal from "sweetalert2";
import { Pagination } from "antd";
import { useState } from "react";
import usePagination from "../../../../hooks/usePagination";
import { BASE_URL } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import {
    deletePlayerService,
    getPlayerService,
} from "../../../../service/playerService";
import moment from "moment";
import { RouterDTO } from "../../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function ManagePlayer() {
    const [isReload, setIsReload] = useState(false);
    const { data, meta, handleChangePage } = usePagination({
        api: getPlayerService,
        page: 1,
        pageSize: 5,
        q: null,
        is_load_more: false,
        is_reload: isReload,
    });

    const navigate = useNavigate();

    const handleChangePagination = (index) => {
        handleChangePage(index);
    };

    const handleReload = () => {
        setIsReload(!isReload);
    };

    const handleToViewStatistical = () => {
        // navigate(RouterDTO.team.managePlayerOfTeam);
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: `Do you want to delete ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await deletePlayerService(data.code);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete ${data.name} successfully`,
                        });
                        handleReload();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `delete ${data.name} failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdate = (player) => {
        navigate(RouterDTO.player.updatePlayer, { state: player });
    };

    return (
        <div className={cx("form-manage")}>
            <div className={cx("form-table")}>
                <table>
                    <thead>
                        <tr>
                            <th className={cx("col-code")}>Code</th>
                            <th className={cx("col-avatar")}>Avavtar</th>
                            <th className={cx("col-name")}>Name</th>
                            <th className={cx("col-birthday")}>Birthday</th>
                            <th className={cx("col-nationality")}>
                                Nationality
                            </th>
                            <th className={cx("col-height")}>
                                height <span>(m)</span>
                            </th>
                            <th className={cx("col-weight")}>
                                weight <span>(kg)</span>
                            </th>
                            <th className={cx("col-statistical")}>
                                Statistical
                            </th>
                            <th className={cx("col-active")}>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.code}</td>
                                        <td className={cx("td-avatar")}>
                                            <img
                                                src={`${BASE_URL}${item.avatar_url}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>
                                            {moment(item.birthday).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </td>
                                        <td>{item.nationality}</td>
                                        <td>{item.height}</td>
                                        <td>{item.weight}</td>
                                        <td className={cx("td-statistical")}>
                                            <div>
                                                <button
                                                    onClick={
                                                        handleToViewStatistical
                                                    }
                                                >
                                                    View
                                                </button>
                                            </div>
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
