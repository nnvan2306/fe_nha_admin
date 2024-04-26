import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Sidebar from "../sidebar/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageSeason from "../../pages/Season/ManageSeason/ManageSeason";
import ManageTeam from "../../pages/Team/ManageTeam/ManageTeam";
import ManagePlayer from "../../pages/Player/ManagePlayer/ManagePlayer";
import ManageStatistical from "../../pages/Statistical/ManageStatistical/ManageStatistical";
import ManageRating from "../../pages/Rating/ManageRating/ManageRating";
import ManageMatch from "../../pages/Match/ManageMatch/ManageMatch";
import ManageStadium from "../../pages/Stadium/ManageStadium/ManageStadium";
import ManageStand from "../../pages/Stand/ManageStand/ManageStand";
import ManageCalendar from "../../pages/Calendar/ManageCalendar/ManageCalendar";
import ManageBill from "../../pages/Bill/ManageBill/ManageBill";
import ControlSwap from "../ControlSwap/ControlSwap";
import CreateSeason from "../../pages/Season/CreateSeason/CreateSeason";
import CreateTeam from "../../pages/Team/CreateTeam/CreateTeam";
import CreatePlayer from "../../pages/Player/CreatePlayer/CreatePlayer";
import CreateStatistical from "../../pages/Statistical/CreateStatistical/CreateStatistical";
import CreateRating from "../../pages/Rating/CreateRating/CreateRating";
import CreateMatch from "../../pages/Match/CreateMatch/CreateMatch";
import CreateStadium from "../../pages/Stadium/CreateStadium/CreateStadium";
import CreateStand from "../../pages/Stand/CreateStand/CreateStand";
import CreateCalendar from "../../pages/Calendar/CreateCalendar/CreateCalendar";
import Setting from "../../pages/Setting/Setting";

const cx = classNames.bind(styles);

export default function Home() {
    const location = useLocation().pathname;

    return (
        <div className={cx("form-main")}>
            <div className={cx("sibar")}>
                <Sidebar />
            </div>

            <div className={cx("form-content")}>
                {location === RouterDTO.setting.manageSetting ? (
                    <></>
                ) : (
                    <div className={cx("control-content")}>
                        <ControlSwap />
                    </div>
                )}

                <div className={cx("detail-content")}>
                    <Routes>
                        {/* setting */}

                        <Route
                            path={RouterDTO.setting.manageSetting}
                            element={<Setting />}
                        />

                        {/* season */}

                        <Route
                            path={RouterDTO.season.allSeason}
                            element={<ManageSeason />}
                        />
                        <Route
                            path={RouterDTO.season.create}
                            element={<CreateSeason />}
                        />

                        {/* team */}

                        <Route
                            path={RouterDTO.team.allTeam}
                            element={<ManageTeam />}
                        />
                        <Route
                            path={RouterDTO.team.create}
                            element={<CreateTeam />}
                        />
                        <Route
                            path={RouterDTO.team.updateTeam}
                            element={<CreateTeam />}
                        />

                        {/* player */}

                        <Route
                            path={RouterDTO.player.allPlayer}
                            element={<ManagePlayer />}
                        />
                        <Route
                            path={RouterDTO.player.create}
                            element={<CreatePlayer />}
                        />
                        <Route
                            path={RouterDTO.player.updatePlayer}
                            element={<CreatePlayer />}
                        />

                        {/* statistical */}

                        <Route
                            path={RouterDTO.statistical.allStatistical}
                            element={<ManageStatistical />}
                        />
                        <Route
                            path={RouterDTO.statistical.create}
                            element={<CreateStatistical />}
                        />
                        <Route
                            path={RouterDTO.statistical.update}
                            element={<CreateStatistical />}
                        />

                        {/* rating */}

                        <Route
                            path={RouterDTO.rating.allRating}
                            element={<ManageRating />}
                        />
                        <Route
                            path={RouterDTO.rating.create}
                            element={<CreateRating />}
                        />
                        <Route
                            path={RouterDTO.rating.update}
                            element={<CreateRating />}
                        />

                        {/* match */}

                        <Route
                            path={RouterDTO.match.allMatch}
                            element={<ManageMatch />}
                        />
                        <Route
                            path={RouterDTO.match.create}
                            element={<CreateMatch />}
                        />
                        <Route
                            path={RouterDTO.match.updateMatch}
                            element={<CreateMatch />}
                        />

                        {/* stadium */}

                        <Route
                            path={RouterDTO.stadium.allStadium}
                            element={<ManageStadium />}
                        />
                        <Route
                            path={RouterDTO.stadium.create}
                            element={<CreateStadium />}
                        />
                        <Route
                            path={RouterDTO.stadium.update}
                            element={<CreateStadium />}
                        />

                        {/* stand */}

                        <Route
                            path={RouterDTO.stand.allStand}
                            element={<ManageStand />}
                        />
                        <Route
                            path={RouterDTO.stand.create}
                            element={<CreateStand />}
                        />
                        <Route
                            path={RouterDTO.stand.update}
                            element={<CreateStand />}
                        />

                        {/* calendar */}

                        <Route
                            path={RouterDTO.calendar.allCalendar}
                            element={<ManageCalendar />}
                        />
                        <Route
                            path={RouterDTO.calendar.create}
                            element={<CreateCalendar />}
                        />
                        <Route
                            path={RouterDTO.calendar.update}
                            element={<CreateCalendar />}
                        />

                        {/* bill */}

                        <Route
                            path={RouterDTO.bill.allBill}
                            element={<ManageBill />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
