import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import { linkWhite } from "../../../helps/linkWhite";

const cx = classNames.bind(styles);

export default function Header() {
    const navigate = useNavigate();
    const loction = `${useLocation().pathname}/*`;
    const path = useLocation().pathname;

    const handleNavigate = (link) => {
        navigate(link.split("/*")[0]);
    };
    return (
        <>
            <div
                className={cx(
                    "form-header",
                    linkWhite.includes(path) ? "bg-white" : ""
                )}
            >
                <div className={cx("form-nav", "container")}>
                    <div className={cx("icon-menu")}>
                        {/* <i className={cx("bi", " bi-list")}></i> */}
                    </div>
                    <ul>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.season.manageSeason
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.season.manageSeason
                                    )
                                }
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
                                onClick={() =>
                                    handleNavigate(RouterDTO.team.manageTeam)
                                }
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
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.player.managePlayer
                                    )
                                }
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
                                    loction ===
                                        RouterDTO.statistical.manageStatistical
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.statistical.allStatistical
                                    )
                                }
                            >
                                <p>
                                    <i
                                        className="bi bi-calculator-fill"
                                        style={{ paddingRight: "10px" }}
                                    ></i>
                                    Statistical
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.rating.manageRating
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.rating.manageRating
                                    )
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-bar-chart"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Rating
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.match.manageMatch
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(RouterDTO.match.manageMatch)
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-tv"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Match
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.stadium.manageStadium
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.stadium.manageStadium
                                    )
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-tv"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Stadium
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.stand.manageStand
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(RouterDTO.stand.manageStand)
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-binoculars-fill"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Stand
                                </p>
                            </button>
                        </li>
                        <li>
                            <button
                                className={cx(
                                    loction ===
                                        RouterDTO.calendar.manageCalendar
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(
                                        RouterDTO.calendar.manageCalendar
                                    )
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-tv"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Calendar
                                </p>
                            </button>
                        </li>

                        <li>
                            <button
                                className={cx(
                                    loction === RouterDTO.bill.manageBill
                                        ? "active"
                                        : ""
                                )}
                                onClick={() =>
                                    handleNavigate(RouterDTO.bill.manageBill)
                                }
                            >
                                <p>
                                    {" "}
                                    <i
                                        className="bi bi-receipt"
                                        style={{ padding: "10px" }}
                                    ></i>
                                    Bill
                                </p>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* <div className=""></div> */}
            </div>
        </>
    );
}
