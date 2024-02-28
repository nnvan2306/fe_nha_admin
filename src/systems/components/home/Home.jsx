import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Season from "../../pages/Season/Season";
import { RouterDTO } from "../../../utils/routes.dto";
import Team from "../../pages/Team/Team";
import Player from "../../pages/Player/Player";
import Statistical from "../../pages/Statistical/Statistical";
import Rating from "../../pages/Rating/Rating";
import { BASE_URL } from "../../../utils/constants";

const cx = classNames.bind(styles);

export default function Home() {
    const location = useLocation().pathname;
    return (
        <div className={cx("main")}>
            <div className={cx("form-header")}>
                <Header />
            </div>
            <div className={cx("form-img")}>
                {location === "/" ? (
                    <img
                        src={`${BASE_URL}/images/nha2.jpg`}
                        alt=""
                        style={{ width: "200px", height: "200px" }}
                    />
                ) : (
                    <></>
                )}

                <div className={cx("form-content")}>
                    <Routes>
                        <Route
                            path={RouterDTO.season.manageSeason}
                            element={<Season />}
                        ></Route>
                        <Route
                            path={RouterDTO.team.manageTeam}
                            element={<Team />}
                        ></Route>
                        <Route
                            path={RouterDTO.player.managePlayer}
                            element={<Player />}
                        ></Route>
                        <Route
                            path={RouterDTO.statistical.manageStatistical}
                            element={<Statistical />}
                        ></Route>
                        <Route
                            path={RouterDTO.rating.manageRating}
                            element={<Rating />}
                        ></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
