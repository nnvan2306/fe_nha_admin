import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../header/Header";
import { Route, Routes } from "react-router-dom";
import Season from "../../pages/Season/Season";
import { RouterDTO } from "../../../utils/routes.dto";
import Team from "../../pages/Team/Team";
import Player from "../../pages/Player/Player";
import Statistical from "../../pages/Statistical/Statistical";
import ManageStatistical from "../../pages/Statistical/ManageStatistical/ManageStatistical";

const cx = classNames.bind(styles);

export default function Home() {
    return (
        <>
            <div className={cx("form-header")}>
                <Header />
            </div>
            <div className={cx("form-content", "container")}>
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
                </Routes>
            </div>
        </>
    );
}
