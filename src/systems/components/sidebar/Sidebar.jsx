import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import { Tooltip } from "antd";
import { handleLogoutService } from "../../../service/authService";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../features/auth/authSlice";

const cx = classNames.bind(styles);

export default function Sidebar() {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (link) => {
        navigate(link);
    };

    const handleLogout = async () => {
        dispatch(logoutAction());
        await handleLogoutService();
        navigate(RouterDTO.auth.login);
    };

    const handleToSetting = () => {
        navigate(RouterDTO.setting.manageSetting);
    };

    return (
        <div className={cx("sibar")}>
            <div className={cx("control-auth")}>
                <Tooltip
                    placement="rightTop"
                    trigger="click"
                    className="bg-[#000]"
                    title={
                        <div className={cx("form-auth")}>
                            <div
                                className={cx("form-item")}
                                onClick={() => handleToSetting()}
                            >
                                <p>
                                    <i className="bi bi-gear"></i> Setting
                                </p>
                            </div>
                            <div
                                className={cx("form-item")}
                                onClick={() => handleLogout()}
                            >
                                {" "}
                                <p>
                                    <i className="bi bi-box-arrow-right"></i>{" "}
                                    Logout
                                </p>
                            </div>
                        </div>
                    }
                >
                    <div className={cx("avatar")}></div>
                </Tooltip>
            </div>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Season</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.season.allSeason ||
                            location === RouterDTO.season.create
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.season.allSeason)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-calendar-event"></i>
                    </p>
                    <p className={cx("header-item")}>Season</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Team</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.team.allTeam ||
                            location === RouterDTO.team.create ||
                            location === RouterDTO.team.updateTeam
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.team.allTeam)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-people"></i>
                    </p>
                    <p className={cx("header-item")}>Team</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Player</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.player.allPlayer ||
                            location === RouterDTO.player.create ||
                            location === RouterDTO.player.updatePlayer
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.player.allPlayer)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-person"></i>
                    </p>
                    <p className={cx("header-item")}>Player</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Statistical</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.statistical.allStatistical ||
                            location === RouterDTO.statistical.create ||
                            location === RouterDTO.statistical.update
                            ? "active"
                            : ""
                    )}
                    onClick={() =>
                        handleNavigate(RouterDTO.statistical.allStatistical)
                    }
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-calculator-fill"></i>
                    </p>
                    <p className={cx("header-item")}>Statistical</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Rating</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.rating.allRating ||
                            location === RouterDTO.rating.create ||
                            location === RouterDTO.rating.update
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.rating.allRating)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-bar-chart"></i>
                    </p>
                    <p className={cx("header-item")}>Rating</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Match</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.match.allMatch ||
                            location === RouterDTO.match.create ||
                            location === RouterDTO.match.updateMatch
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.match.allMatch)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-tv"></i>
                    </p>
                    <p className={cx("header-item")}>Match</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Stadium</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.stadium.allStadium ||
                            location === RouterDTO.stadium.create ||
                            location === RouterDTO.stadium.update
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.stadium.allStadium)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-tv"></i>
                    </p>
                    <p className={cx("header-item")}>Stadium</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Stand</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.stand.allStand ||
                            location === RouterDTO.stand.create ||
                            location === RouterDTO.stand.update
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.stand.allStand)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-binoculars-fill"></i>
                    </p>
                    <p className={cx("header-item")}>Stand</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Calendar</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.calendar.allCalendar ||
                            location === RouterDTO.calendar.create ||
                            location === RouterDTO.calendar.update
                            ? "active"
                            : ""
                    )}
                    onClick={() =>
                        handleNavigate(RouterDTO.calendar.allCalendar)
                    }
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-tv"></i>
                    </p>
                    <p className={cx("header-item")}>Calendar</p>
                </div>
            </Tooltip>

            <Tooltip
                placement="right"
                title={
                    <div className={cx("tooltip-text")}>
                        <p>Bill</p>
                    </div>
                }
            >
                <div
                    className={cx(
                        "form-item",
                        location === RouterDTO.bill.allBill ||
                            location === RouterDTO.bill.create ||
                            location === RouterDTO.bill.Update
                            ? "active"
                            : ""
                    )}
                    onClick={() => handleNavigate(RouterDTO.bill.allBill)}
                >
                    <p className={cx("icon-item")}>
                        <i className="bi bi-receipt"></i>
                    </p>
                    <p className={cx("header-item")}>Bill</p>
                </div>
            </Tooltip>
        </div>
    );
}
