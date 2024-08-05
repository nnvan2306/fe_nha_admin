import classNames from "classnames/bind";
import styles from "./ManageStatistical.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDebounce } from "../../../../hooks/useDebounce";
import { searchPlayerService } from "../../../../service/playerService";
import {
    deleteStatisticService,
    getStatisticService,
} from "../../../../service/statisticService";
import { BASE_URL } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";
import Swal from "sweetalert2";
import { handleApi } from "../../../../service/handleApi";
const cx = classNames.bind(styles);

export default function ManageStatistical() {
    const [textSearch, setTextSearch] = useState("");
    const [playerView, setPlayerView] = useState(null);
    const [isOptionItems, setIsOptionItems] = useState(false);
    const [listPlayers, setListPlayers] = useState([]);
    const [listStatistic, setListStatistic] = useState([]);

    const navigate = useNavigate();
    const debounce = useDebounce(textSearch, 700);

    useEffect(() => {
        const fetch = async () => {
            let res = await searchPlayerService(debounce);
            if (res.errorCode === 0) {
                setListPlayers(res?.data);
            }
        };
        if (debounce) {
            fetch();
            setIsOptionItems(true);
        } else {
            setIsOptionItems(false);
        }
    }, [debounce]);

    const handleView = async (player) => {
        setPlayerView(player);
        let res = await getStatisticService(player.id);
        if (res.errorCode === 0) {
            setIsOptionItems(false);
            setListStatistic(res.data);
        }
    };

    const handleToCreate = () => {
        navigate(RouterDTO.statistical.create, { state: playerView });
    };

    const handleUpdate = (data) => {
        let dataBuider = { ...data, avatar_url: playerView?.avatar_url };
        navigate(RouterDTO.statistical.update, { state: dataBuider });
    };

    const handleDelete = async (data) => {
        Swal.fire({
            title: `Do you want to delete statistic ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await handleApi(deleteStatisticService, data.id);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete ${data.name} successfully`,
                        });
                        handleView(playerView);
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

    return (
        <div className={cx("form-statistical")}>
            <h4>Manage Statistical</h4>
            <div className={cx("form-search")}>
                <div className={cx("input-search")}>
                    <input
                        type="text"
                        placeholder="Please enter name player"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>
                <div className={cx("icon-search")}>
                    <i className="bi bi-search"></i>
                </div>
            </div>
            {isOptionItems && (
                <div className={cx("form-items")}>
                    {listPlayers &&
                        listPlayers.length > 0 &&
                        listPlayers.map((item, index) => {
                            return (
                                <div
                                    className={cx("item")}
                                    key={index}
                                    onClick={() => handleView(item)}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                </div>
            )}
            {playerView && (
                <div className={cx("form-content", "container")}>
                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-img")}>
                                <img
                                    src={`${BASE_URL}${playerView?.avatar_url}`}
                                    alt=""
                                />
                                <div className={cx("info")}>
                                    <p className={cx("name")}>
                                        {playerView?.name}
                                    </p>
                                    <p className={cx("birthday")}>
                                        {moment(playerView.birthday).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </p>
                                    <p className={cx("nationality")}>
                                        nationality :
                                        <span> {playerView.nationality}</span>
                                    </p>
                                    <p className={cx("height")}>
                                        Height :
                                        <span> {playerView.height}</span>
                                    </p>
                                    <p className={cx("weight")}>
                                        weight :
                                        <span> {playerView.weight}</span>
                                    </p>
                                </div>
                            </div>

                            <div className={cx("form-detail")}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: playerView.description,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className={cx("col-6", "form-statistical")}>
                            <h5 style={{ textAlign: "center" }}>Statistical</h5>
                            <div className={cx("form-table")}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={cx("season")}>
                                                Season
                                            </th>
                                            <th className={cx("goal")}>Goal</th>
                                            <th className={cx("assist")}>
                                                Assist
                                            </th>
                                            <th className={cx("yc")}>
                                                YellowCard
                                            </th>
                                            <th className={cx("rc")}>
                                                RedCard
                                            </th>
                                            <th className={cx("pa")}>PA</th>
                                            <th className={cx("action")}>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listStatistic &&
                                            listStatistic.length > 0 &&
                                            listStatistic.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td
                                                            className={cx(
                                                                "season"
                                                            )}
                                                        >
                                                            {item.seasonName}
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "goal"
                                                            )}
                                                        >
                                                            {item.goal}
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "assist"
                                                            )}
                                                        >
                                                            {item.assist}
                                                        </td>
                                                        <td
                                                            className={cx("yc")}
                                                        >
                                                            {item.yellowCard}
                                                        </td>
                                                        <td
                                                            className={cx("rc")}
                                                        >
                                                            {item.redCard}
                                                        </td>
                                                        <td
                                                            className={cx("pa")}
                                                        >
                                                            {item.pA}
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "action"
                                                            )}
                                                        >
                                                            <button
                                                                className={cx(
                                                                    "btn",
                                                                    "btn-warning"
                                                                )}
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                edit
                                                            </button>
                                                            <button
                                                                className={cx(
                                                                    "btn",
                                                                    "btn-danger"
                                                                )}
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                className={cx("form-create")}
                                onClick={handleToCreate}
                            >
                                <p>
                                    <i className="bi bi-plus-circle-dotted"></i>{" "}
                                    Create Statistical
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
