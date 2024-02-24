import classNames from "classnames/bind";
import styles from "./ManageTeam.module.scss";
import Swal from "sweetalert2";
import {
    deletTeameService,
    getTeamservice,
} from "../../../../service/teamService";
import { Pagination } from "antd";
import { useState } from "react";
import usePagination from "../../../../hooks/usePagination";
import { BASE_URL } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function ManageTeam() {
    const [isReload, setIsReload] = useState(false);
    const { data, meta, handleChangePage } = usePagination({
        api: getTeamservice,
        page: 1,
        pageSize: 5,
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

    const handleToManagePlayer = () => {
        navigate(RouterDTO.team.managePlayerOfTeam);
    };

    const handleDelete = (data) => {
        console.log(data);
        Swal.fire({
            title: `Do you want to delete ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("ok");
                const _fetch = async () => {
                    let Res = await deletTeameService(data.code);
                    console.log(Res);
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

    const handleUpdate = (team) => {
        navigate("/team/update", { state: team });
    };

    return (
        <div className={cx("form-manage")}>
            <div className={cx("form-table")}>
                <table>
                    <thead>
                        <tr>
                            <th className={cx("col-index")}>Code</th>
                            <th className={cx("col-logo")}>Logo</th>
                            <th className={cx("col-name")}>Team</th>
                            <th className={cx("col-des")}>Description</th>
                            <th className={cx("col-manage-player")}>
                                Manage Player
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
                                        <td className={cx("td-logo")}>
                                            <img
                                                src={`${BASE_URL}${item.logo_url}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td className={cx("td-des")}>
                                            <div
                                                className={cx("text-des")}
                                                dangerouslySetInnerHTML={{
                                                    __html: item.description,
                                                }}
                                            ></div>
                                        </td>
                                        <td className={cx("td-manage-player")}>
                                            <div>
                                                <button
                                                    onClick={
                                                        handleToManagePlayer
                                                    }
                                                >
                                                    To manage
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
