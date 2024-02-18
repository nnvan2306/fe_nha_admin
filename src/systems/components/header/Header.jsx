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
                    <ul>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.season.allSeason
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/season/all")}
                            >
                                <p>Season</p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.team.manageTeam
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/team/all")}
                            >
                                <p>Team</p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.player.managePlayer
                                        ? "active"
                                        : ""
                                )}
                                onClick={() => handleNavigate("/player/all")}
                            >
                                <p>Player</p>
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
