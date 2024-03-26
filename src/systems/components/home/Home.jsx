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
import Match from "../../pages/Match/Match";
import Stadium from "../../pages/Stadium/Stadium";
import Calendar from "../../pages/Calendar/Calendar";

const cx = classNames.bind(styles);

const handleViewThumbnails = (path) => {
    if (path === "/") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-opacity")}
                src={`${BASE_URL}/images/nha2.jpg`}
            ></img>
        );
    }
    const rePath = path.split("/*")[0];
    if (rePath === "/season") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-bottom-top")}
                src={`${BASE_URL}/images/season.jpg`}
            ></img>
        );
    } else if (rePath === "/team") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-right-left")}
                src={`${BASE_URL}/images/team.jpg`}
            ></img>
        );
    } else if (rePath === "/player") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-left-right")}
                src={`${BASE_URL}/images/player.jpg`}
            ></img>
        );
    } else if (rePath === "/match") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-top-bottom")}
                src={`${BASE_URL}/images/match.jpg`}
            ></img>
        );
    } else if (rePath === "/rating") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-top-bottom")}
                src={`${BASE_URL}/images/rating.jpg`}
            ></img>
        );
    } else if (rePath === "/stadium") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-top-bottom")}
                src={`${BASE_URL}/images/stadium.jpg`}
            ></img>
        );
    } else if (rePath === "/calendar") {
        return (
            <img
                className={cx("form-img-thumbnails", "animation-top-bottom")}
                src={`${BASE_URL}/images/calendar.png`}
            ></img>
        );
    } else {
        return <></>;
    }
};

export default function Home() {
    const location = useLocation().pathname;

    return (
        <div className={cx("form-main")}>
            <div className={cx("form-header")}>
                <Header />
            </div>

            {handleViewThumbnails(location)}

            <div className={cx("form-content")}>
                <Routes>
                    <Route
                        path={RouterDTO.season.manageSeason}
                        element={<Season />}
                    />
                    <Route
                        path={RouterDTO.team.manageTeam}
                        element={<Team />}
                    />
                    <Route
                        path={RouterDTO.player.managePlayer}
                        element={<Player />}
                    />
                    <Route
                        path={RouterDTO.statistical.manageStatistical}
                        element={<Statistical />}
                    />
                    <Route
                        path={RouterDTO.rating.manageRating}
                        element={<Rating />}
                    />
                    <Route
                        path={RouterDTO.match.manageMatch}
                        element={<Match />}
                    />
                    <Route
                        path={RouterDTO.stadium.manageStadium}
                        element={<Stadium />}
                    />

                    <Route
                        path={RouterDTO.calendar.manageCalendar}
                        element={<Calendar />}
                    />
                </Routes>
            </div>
        </div>
    );
}
