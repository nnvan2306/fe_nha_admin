import classNames from "classnames/bind";
import styles from "./ManageMatch.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonService } from "../../../../service/seasonService";
import {
    deleteMatchService,
    getMatchService,
} from "../../../../service/matchService";
import usePagination from "../../../../hooks/usePagination";
import { Pagination, Modal, Button, Row, Col, Empty } from "antd";
import { BASE_URL } from "../../../../utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";
import {
    handleCreateScoredService,
    handleDeleteScoredService,
    handleGetScoredService,
} from "../../../../service/scoredService";
import { getPlayerDetailSeasonService } from "../../../../service/playerService";
import { handleApi } from "../../../../service/handleApi";

const cx = classNames.bind(styles);

export default function ManageMatch() {
    const [listSeason, setListSeason] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listScored, setListScored] = useState([]);
    // const [listPlayer, setListPlayer] = useState([]);
    const [infoMatch, setInfoMatch] = useState(null);
    const [namePlayer, setNamePLayer] = useState("");
    const [minute, setMinute] = useState(0);
    const [isPen, setISPen] = useState(0);
    const [teamId, setTeamId] = useState(0);

    const navigate = useNavigate();

    const { data, meta, handleChangePage, handleChangeValueSearch } =
        usePagination({
            api: getMatchService,
            page: 1,
            pageSize: 5,
            q: 0,
            is_load_more: false,
            is_reload: isReload,
        });

    const handleChangeSeason = (e) => {
        handleChangeValueSearch(+e);
    };

    const handleReLoad = () => {
        setIsReload(!isReload);
    };

    useEffect(() => {
        const _fetch = async () => {
            let res = await getAllSeasonService();
            if (res.errorCode === 0) {
                setListSeason(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
            }
        };
        _fetch();
    }, []);

    const handleChangePagination = (index) => {
        handleChangePage(index);
    };

    const handleDeleteMatch = async (infoMatch) => {
        await Swal.fire({
            title: `Do you want to delete ${infoMatch.title} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await handleApi(deleteMatchService, infoMatch.id);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete match successfully`,
                        });
                        handleReLoad();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `delete ${infoMatch.title} failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdateMatch = (infoMatch) => {
        navigate(RouterDTO.match.updateMatch, { state: infoMatch });
    };

    const handleGetScored = async (data) => {
        const fetch = await handleGetScoredService(data.id);
        return fetch;
    };

    const showModal = async (data) => {
        setIsModalOpen(true);
        let scored = await handleGetScored(data);
        const players = await getPlayerDetailSeasonService(
            data.hostId,
            data.guestId
        );
        if (players.errorCode === 0 && scored.errorCode === 0) {
            setListScored(scored.data);
            // setListPlayer(players.data);
            setInfoMatch(data);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleValidate = () => {
        if (!namePlayer || !minute || !teamId) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };
    const handleCreateScored = async () => {
        let check = handleValidate();
        if (!check) {
            return;
        }

        let dataBuider = {
            namePlayer: namePlayer,
            minuteGoal: minute,
            isPenalty: isPen ? true : false,
            matchId: infoMatch.id,
            teamId: teamId,
        };

        const fetch = await handleApi(handleCreateScoredService, dataBuider);
        if (fetch.errorCode === 0) {
            Swal.fire({
                icon: "success",
                title: "Create scored succesfully",
            });
            setNamePLayer("");
            setMinute(0);
            setISPen(0);
            setTeamId(0);
            let scored = await handleGetScored(infoMatch);
            if (scored.errorCode === 0) {
                setListScored(scored.data);
            }
        }
    };

    const handleDeleteScored = async (infoScored) => {
        await Swal.fire({
            title: `Do you want to delete ${infoScored.namePlayer} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await handleApi(
                        handleDeleteScoredService,
                        infoScored.id
                    );
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete scored successfully`,
                        });
                        let scored = await handleGetScored(infoMatch);
                        if (scored.errorCode === 0) {
                            setListScored(scored.data);
                        }
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `delete ${infoScored.namePlayer} failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    return (
        <div className={cx("form-manage")}>
            <div className={cx("input-select")}>
                <select
                    name=""
                    id=""
                    onChange={(e) => handleChangeSeason(e.target.value)}
                >
                    <option value={0}>Choose season</option>
                    {listSeason &&
                        listSeason.length > 0 &&
                        listSeason.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={cx("form-table")}>
                <table>
                    <thead>
                        <tr>
                            <th className={cx("th-team")}>Team</th>
                            <th className={cx("th-score")}>Score</th>
                            <th className={cx("th-video")}>Video</th>
                            <th className={cx("th-describe")}>Describe</th>
                            <th className={cx("th-addScored")}>Scored</th>
                            <th className={cx("th-action")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx("td-team")}>
                                            <div className="row">
                                                <div
                                                    className={cx(
                                                        "col-5",
                                                        "col-logo"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "logo-team"
                                                        )}
                                                    >
                                                        <img
                                                            src={`${BASE_URL}${item.Teams[0].logo_url}`}
                                                            alt="logo"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "col-2",
                                                        "col-text"
                                                    )}
                                                >
                                                    <p>Vs</p>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "col-5",
                                                        "col-logo"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "logo-team"
                                                        )}
                                                    >
                                                        <img
                                                            src={`${BASE_URL}${item.Teams[1].logo_url}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={cx("td-score")}>
                                            <p>{`${item.hostGoal} - ${item.guestGoal}`}</p>
                                        </td>

                                        <td className={cx("td-video")}>
                                            <video
                                                src={`${BASE_URL}${item.match_url}`}
                                                controls
                                            ></video>
                                        </td>

                                        <td className={cx("td-describe")}>
                                            <p>
                                                {item.title} |
                                                <span> {item.meta}</span>
                                            </p>
                                        </td>

                                        <td className={cx("td-addScored")}>
                                            <Button
                                                className={cx("button-add")}
                                                type="primary"
                                                onClick={() => showModal(item)}
                                            >
                                                Add
                                            </Button>
                                        </td>

                                        <td className={cx("td-action")}>
                                            <button
                                                className={cx("btn-update")}
                                                onClick={() =>
                                                    handleUpdateMatch(item)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={cx("btn-delete")}
                                                onClick={() =>
                                                    handleDeleteMatch(item)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6">
                                    <div className="empty-container">
                                        <Empty style={{ padding: "40px" }} />
                                    </div>
                                </td>
                            </tr>
                        )}
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

            <Modal
                className={cx("form-modal")}
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <Row>
                    <Col span={6} className={cx("col-modal")}>
                        <img
                            className={cx("modal-img-logo")}
                            src={`${BASE_URL}${infoMatch?.Teams[0]?.logo_url}`}
                            alt="logo"
                        />
                        <div className={cx("list-scored")}>
                            {listScored &&
                                listScored.length > 0 &&
                                listScored.map((item, index) => {
                                    return (
                                        <div className="" key={index}>
                                            {item.teamId ===
                                            infoMatch?.hostId ? (
                                                <p className="">
                                                    {item.namePlayer}{" "}
                                                    {item.minuteGoal}
                                                    {"'"}{" "}
                                                    {item.isPenalty
                                                        ? "(P)"
                                                        : ""}{" "}
                                                    <span>
                                                        <i
                                                            className="bi bi-x-circle"
                                                            onClick={() =>
                                                                handleDeleteScored(
                                                                    item
                                                                )
                                                            }
                                                        ></i>{" "}
                                                    </span>
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </Col>

                    <Col span={12} className={cx("col-modal-center")}>
                        <p>Create</p>
                        <div className={cx("form-input-modal")}>
                            <label htmlFor="name">name</label>
                            <br />
                            <input
                                type="text"
                                value={namePlayer}
                                onChange={(e) => setNamePLayer(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input-modal")}>
                            <label htmlFor="minute">minute</label>
                            <br />
                            <input
                                type="number"
                                value={minute}
                                onChange={(e) => setMinute(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input-modal")}>
                            <label htmlFor="minute">isPen</label>
                            <br />
                            <select
                                name=""
                                id=""
                                value={isPen}
                                onChange={(e) => setISPen(e.target.value)}
                            >
                                <option value={0}>false</option>
                                <option value={1}>True</option>
                            </select>
                        </div>

                        <div className={cx("form-input-modal")}>
                            <label htmlFor="minute">team</label>
                            <br />
                            <select
                                name=""
                                id=""
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                            >
                                <option value={0}>Choose Team</option>
                                <option value={infoMatch?.Teams[0].id}>
                                    {infoMatch?.Teams[0].name}{" "}
                                </option>
                                <option value={infoMatch?.Teams[1].id}>
                                    {infoMatch?.Teams[1].name}{" "}
                                </option>{" "}
                            </select>
                        </div>

                        <div
                            className={cx("button-create")}
                            onClick={handleCreateScored}
                        >
                            create
                        </div>
                    </Col>

                    <Col span={6} className={cx("col-modal")}>
                        <img
                            className={cx("modal-img-logo")}
                            src={`${BASE_URL}${infoMatch?.Teams[1]?.logo_url}`}
                            alt="logo"
                        />
                        <div className={cx("list-scored")}>
                            {listScored &&
                                listScored.length > 0 &&
                                listScored.map((item, index) => {
                                    return (
                                        <div className="" key={index}>
                                            {item.teamId ===
                                            infoMatch?.guestId ? (
                                                <p className="">
                                                    {item.namePlayer}{" "}
                                                    {item.minuteGoal}
                                                    {"'"}{" "}
                                                    {item.isPenalty
                                                        ? "(P)"
                                                        : ""}{" "}
                                                    <span>
                                                        <i
                                                            className="bi bi-x-circle"
                                                            onClick={() =>
                                                                handleDeleteScored(
                                                                    item
                                                                )
                                                            }
                                                        ></i>{" "}
                                                    </span>
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}
