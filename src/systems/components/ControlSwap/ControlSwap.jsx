import classNames from "classnames/bind";
import styles from "./ControlSwap.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RouterDTO } from "../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function ControlSwap() {
    const [control, setControl] = useState([
        {
            label: "Create Season",
            path: RouterDTO.season.allSeason,
        },
        {
            label: "All Season",
            path: RouterDTO.season.allSeason,
        },
    ]);

    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (
            location === RouterDTO.season.allSeason ||
            location === RouterDTO.season.create
        ) {
            setControl([
                {
                    label: "All Season",
                    path: RouterDTO.season.allSeason,
                },
                {
                    label: "Create Season",
                    path: RouterDTO.season.create,
                },
            ]);
        }

        if (
            location === RouterDTO.team.allTeam ||
            location === RouterDTO.team.create
        ) {
            setControl([
                {
                    label: "ALl Team",
                    path: RouterDTO.team.allTeam,
                },
                {
                    label: "Create Team",
                    path: RouterDTO.team.create,
                },
            ]);
        }

        if (
            location === RouterDTO.player.allPlayer ||
            location === RouterDTO.player.create
        ) {
            setControl([
                {
                    label: "ALl Player",
                    path: RouterDTO.player.allPlayer,
                },
                {
                    label: "Create Player",
                    path: RouterDTO.player.create,
                },
            ]);
        }

        if (
            location === RouterDTO.statistical.allStatistical ||
            location === RouterDTO.statistical.create
        ) {
            setControl([
                {
                    label: "ALl Statistical",
                    path: RouterDTO.statistical.allStatistical,
                },
            ]);
        }

        if (
            location === RouterDTO.rating.allRating ||
            location === RouterDTO.rating.create
        ) {
            setControl([
                {
                    label: "ALl Rating",
                    path: RouterDTO.rating.allRating,
                },
                {
                    label: "Create Rating",
                    path: RouterDTO.rating.create,
                },
            ]);
        }

        if (
            location === RouterDTO.match.allMatch ||
            location === RouterDTO.match.create
        ) {
            setControl([
                {
                    label: "ALl Match",
                    path: RouterDTO.match.allMatch,
                },
                {
                    label: "Create Match",
                    path: RouterDTO.match.create,
                },
            ]);
        }

        if (
            location === RouterDTO.stadium.allStadium ||
            location === RouterDTO.stadium.create
        ) {
            setControl([
                {
                    label: "ALl Stadium",
                    path: RouterDTO.stadium.allStadium,
                },
                {
                    label: "Create Stadium",
                    path: RouterDTO.stadium.create,
                },
            ]);
        }

        if (
            location === RouterDTO.stand.allStand ||
            location === RouterDTO.stand.create
        ) {
            setControl([
                {
                    label: "ALl Stand",
                    path: RouterDTO.stand.allStand,
                },
                {
                    label: "Create Stand",
                    path: RouterDTO.stand.create,
                },
            ]);
        }

        if (
            location === RouterDTO.calendar.allCalendar ||
            location === RouterDTO.calendar.create
        ) {
            setControl([
                {
                    label: "ALl Calendar",
                    path: RouterDTO.calendar.allCalendar,
                },
                {
                    label: "Create Calendar",
                    path: RouterDTO.calendar.create,
                },
            ]);
        }

        if (
            location === RouterDTO.bill.allBill ||
            location === RouterDTO.bill.create
        ) {
            setControl([
                {
                    label: "ALl Bill",
                    path: RouterDTO.bill.allBill,
                },
            ]);
        }
    }, [location]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={cx("form-swap")}>
            {control &&
                control.length > 0 &&
                control.map((item, index) => {
                    return (
                        <div key={index}>
                            <button
                                className={cx(
                                    location === item.path ? "active" : ""
                                )}
                                onClick={() => handleNavigate(item.path)}
                            >
                                {item.label}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}
