import classNames from "classnames/bind";
import styles from "./CreateRating.module.scss";
import { useState } from "react";
import { RouterDTO } from "../../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function CreateRating() {
    const [isLoading, setIsLoading] = useState(false);
    const [win, setWin] = useState(0);
    const [lose, setLose] = useState(0);
    const [draw, setDraw] = useState(0);
    const [totalGoal, setTotalGoal] = useState(0);
    const [totalLostGoal, setTotalLostGoal] = useState(0);
    const [seasonId, setSeasonId] = useState(0);
    const [teamId, setTeamId] = useState(0);

    const handleCreateRating = () => {
        setIsLoading(true);
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
