import classNames from "classnames/bind";
import styles from "./CreateStatistical.module.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import { getAllSeasonService } from "../../../../service/seasonService";
import { RouterDTO } from "../../../../utils/routes.dto";
import Swal from "sweetalert2";
import {
    createStatisticService,
    updateStatisticService,
} from "../../../../service/statisticService";
import { handleApi } from "../../../../service/handleApi";

const cx = classNames.bind(styles);

export default function CreateStatistical() {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(0);
    const [goal, setGoal] = useState(0);
    const [assist, setAssist] = useState(0);
    const [pa, setPa] = useState(0);
    const [yellowCard, setYellowCard] = useState(0);
    const [redCard, setRedCard] = useState(0);
    const [seasonId, setSeasonId] = useState(0);
    const [seasonName, setSeasonName] = useState("");
    const [optionSeasons, setOptionSeasons] = useState([]);
    const { state } = useLocation();
    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            let res = await getAllSeasonService();
            if (res.errorCode === 0) {
                setOptionSeasons(
                    res.data.map((item) => {
                        return { value: item.id, label: item.name };
                    })
                );
            }
        };
        fetch();

        if (location === RouterDTO.statistical.update) {
            setGoal(state?.goal);
            setAssist(state?.assist);
            setYellowCard(state?.yellowCard);
            setRedCard(state?.redCard);
            setPa(state?.pA);
            setSeasonName(state?.seasonName);
            setSeasonId(state?.seasonId);
            setId(state?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reSet = () => {
        setGoal(0);
        setAssist(0);
        setPa(0);
        setYellowCard(0);
        setRedCard(0);
        setSeasonId(0);
    };

    const handleChangeOption = (id) => {
        setSeasonId(id);
        let nameSeason = optionSeasons.filter((item) => item.value === +id)[0]
            .label;
        setSeasonName(nameSeason);
    };

    //validate
    const handleValidate = () => {
        if (!seasonId) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    const handleCreate = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            goal: goal,
            assist: assist,
            pA: pa,
            yellowCard: yellowCard,
            redCard: redCard,
            seasonName: seasonName,
            playerId:
                location === RouterDTO.statistical.create
                    ? state.id
                    : state.playerId,
            seasonId: seasonId,
        };

        if (location === RouterDTO.statistical.update) {
            dataBuider.id = id;
        }

        try {
            let res =
                location === RouterDTO.statistical.update
                    ? await handleApi(updateStatisticService, dataBuider)
                    : await handleApi(createStatisticService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title:
                        location === RouterDTO.statistical.update
                            ? "update statistical successfully"
                            : "create statistical successfully",
                });
                reSet();
                if (location === RouterDTO.statistical.update) {
                    navigate(RouterDTO.statistical.allStatistical);
                }
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error occurred. Please try again later !",
            });
        }

        setIsLoading(false);
    };

    return (
        <div className={cx("form-create")}>
            <div className={cx("form-header")} style={{ textAlign: "center" }}>
                <div>
                    Create Statistical{" "}
                    <span style={{ color: "var(--color-button-primary)" }}>
                        {" "}
                        {state.name}
                    </span>
                </div>
                <img src={`${BASE_URL}${state.avatar_url}`} alt="" />
            </div>

            <div className={cx("control-input", "container")}>
                <div className={cx("row")}>
                    <div className={cx("col-6")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="goal">Total Goal</label>
                            <br />
                            <input
                                type="text"
                                id="goal"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="assist">Total Assist</label>
                            <br />
                            <input
                                type="text"
                                id="assist"
                                value={assist}
                                onChange={(e) => setAssist(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="pa">PA</label>
                            <br />
                            <input
                                type="text"
                                id="pa"
                                value={pa}
                                onChange={(e) => setPa(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx("col-6")}>
                        <div className={cx("form-input")}>
                            <label htmlFor="yc">Total Yellow Card</label>
                            <br />
                            <input
                                type="text"
                                id="yc"
                                value={yellowCard}
                                onChange={(e) => setYellowCard(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="rc">Total Red Card</label>
                            <br />
                            <input
                                type="text"
                                id="rc"
                                value={redCard}
                                onChange={(e) => setRedCard(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-input")}>
                            <label htmlFor="season">Season</label>
                            <br />
                            <select
                                name=""
                                id=""
                                value={seasonId}
                                onChange={(e) =>
                                    handleChangeOption(e.target.value)
                                }
                            >
                                <option value={0}>season</option>
                                {optionSeasons &&
                                    optionSeasons.length > 0 &&
                                    optionSeasons.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.value}
                                                label={item.label}
                                            >
                                                {/* {item.label} */}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx("form-submit")}>
                {isLoading ? (
                    <button disabled className={cx("button-disabled")}>
                        <div
                            className="spinner-border text-light"
                            role="status"
                        ></div>
                    </button>
                ) : (
                    <button onClick={handleCreate}>
                        {location === RouterDTO.statistical.create
                            ? "Create"
                            : "Update"}
                    </button>
                )}
            </div>
        </div>
    );
}
