import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function Header() {
    const navigate = useNavigate();
    const loction = useLocation().pathname;

    const handleNavigate = (link) => {
        navigate(link);
    };
    return (
        <>
            <div className={cx("form-header")}>
                <div className={cx("form-nav", "container")}>
                    <div className={cx("icon-menu")}>
                        <i className={cx("bi", " bi-list")}></i>
                    </div>
                    <ul>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.season.manageSeason
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/season")}
                            >
                                <p>
                                    <i
                                        className="bi bi-calendar-event"
                                        style={{ paddingRight: "10px" }}
                                    ></i>
                                    Season
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.team.manageTeam
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/team")}
                            >
                                <p>
                                    <i
                                        className="bi bi-people"
                                        style={{ paddingRight: "10px" }}
                                    ></i>
                                    Team
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.player.managePlayer
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/player")}
                            >
                                <p>
                                    <i
                                        className="bi bi-person"
                                        style={{ paddingRight: "10px" }}
                                    ></i>
                                    Player
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === "/wait" ? "active" : ""
                                )}
                                onClick={() => handleNavigate("/wait")}
                            >
                                <p>Wait</p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === "/wait" ? "active" : ""
                                )}
                                onClick={() => handleNavigate("/wait")}
                            >
                                <p>Wait</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className=""></div>
            </div>
        </>
    );
}
