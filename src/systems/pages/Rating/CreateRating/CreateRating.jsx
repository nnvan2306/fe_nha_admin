import classNames from "classnames/bind";
import styles from "./CreateRating.module.scss";
import { useEffect, useState } from "react";
import { RouterDTO } from "../../../../utils/routes.dto";
import { getAllSeasonService } from "../../../../service/seasonService";
import { getAllTeam } from "../../../../service/teamService";
import Swal from "sweetalert2";
import {
    createRatingService,
    updateRatingService,
} from "../../../../service/ratingService";
import { useLocation, useNavigate } from "react-router-dom";
import { handleApi } from "../../../../service/handleApi";

const cx = classNames.bind(styles);

export default function CreateRating() {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(0);
    const [win, setWin] = useState(0);
    const [lose, setLose] = useState(0);
    const [draw, setDraw] = useState(0);
    const [totalGoal, setTotalGoal] = useState(0);
    const [totalLostGoal, setTotalLostGoal] = useState(0);
    const [seasonId, setSeasonId] = useState(0);
    const [teamId, setTeamId] = useState(0);
    const [listSeasons, setListSeasons] = useState([]);
    const [listTeams, setListTeams] = useState([]);

    const navigate = useNavigate();
    const location = useLocation().pathname;
    const { state } = useLocation();

    console.log(state);

    useEffect(() => {
        const fetch = async () => {
            const seasons = await getAllSeasonService();
            const teams = await getAllTeam();

            if (seasons.errorCode === 0 && teams.errorCode === 0) {
                setListSeasons(
                    seasons.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
                setListTeams(
                    teams.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );

                if (location === RouterDTO.rating.update) {
                    setId(state.id);
                    setSeasonId(state.seasonId);
                    setTeamId(state.teamId);
                    setTotalGoal(state.totalGoal);
                    setTotalLostGoal(state.totalLostGoal);
                    setWin(state.win);
                    setDraw(state.draw);
                    setLose(state.lose);
                }
            }
        };
        fetch();
    }, []);

    const reSet = () => {
        setSeasonId(0);
        setTeamId(0);
        setTotalGoal(0);
        setTotalLostGoal(0);
        setWin(0);
        setLose(0);
        setDraw(0);
    };

    const handleValidate = () => {
        if (!seasonId || !teamId) {
            Swal.fire({
                icon: "warning",
                title: "please select team and season !",
            });
            return false;
        }
        return true;
    };

    const handleCreateRating = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            seasonId: seasonId,
            teamId: teamId,
            win: win,
            lose: lose,
            draw: draw,
            totalGoal: totalGoal,
            totalLostGoal: totalLostGoal,
        };

        if (location === RouterDTO.rating.update) {
            dataBuider.id = id;
        }

        try {
            let res =
                location === RouterDTO.rating.update
                    ? await handleApi(updateRatingService, dataBuider)
                    : await handleApi(createRatingService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: `${
                        location === RouterDTO.rating.update
                            ? "update"
                            : "create"
                    } rating successfully`,
                });
                if (location === RouterDTO.rating.update) {
                    navigate(RouterDTO.rating.allRating);
                } else {
                    reSet();
                }
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err?.response?.data?.message,
            });
        }
        setIsLoading(false);
    };

    return (
        <div className={cx("form-create")}>
            <div className={cx("control-input")}>
                <div className="row">
                    <div className={cx("col-6")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="season">Season</label>
                            <br />
                            <select
                                name=""
                                id="season"
                                value={seasonId}
                                onChange={(e) => setSeasonId(e.target.value)}
                            >
                                <option value="">choose season</option>
                                {listSeasons &&
                                    listSeasons.length > 0 &&
                                    listSeasons.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="team">Team</label>
                            <br />
                            <select
                                name=""
                                id="team"
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                            >
                                <option value="">choose team</option>
                                {listTeams &&
                                    listTeams.length > 0 &&
                                    listTeams.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="totalGoal">Total Goal</label>
                            <br />
                            <input
                                type="text"
                                id="totalGoal"
                                value={totalGoal}
                                onChange={(e) => setTotalGoal(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="totalLostGoal">
                                Total Lost Goal
                            </label>
                            <br />
                            <input
                                type="text"
                                id="totalLostGoal"
                                value={totalLostGoal}
                                onChange={(e) =>
                                    setTotalLostGoal(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className={cx("col-6")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="win">Win</label>
                            <br />
                            <input
                                type="text"
                                id="win"
                                value={win}
                                onChange={(e) => setWin(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="lose">Lose</label>
                            <br />
                            <input
                                type="text"
                                id="lose"
                                value={lose}
                                onChange={(e) => setLose(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            <label htmlFor="draw">Draw</label>
                            <br />
                            <input
                                type="text"
                                id="draw"
                                value={draw}
                                onChange={(e) => setDraw(e.target.value)}
                            />
                        </div>

                        <div className={cx("form-input")}>
                            {isLoading ? (
                                <button
                                    disabled
                                    className={cx("button-disabled")}
                                >
                                    <div
                                        className="spinner-border text-light"
                                        role="status"
                                    ></div>
                                </button>
                            ) : (
                                <button onClick={handleCreateRating}>
                                    {location === RouterDTO.rating.update
                                        ? "Edit"
                                        : "Create"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
