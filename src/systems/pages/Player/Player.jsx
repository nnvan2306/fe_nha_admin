import classNames from "classnames/bind";
import styles from "./Player.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManagePlayer from "./ManagePlayer/ManagePlayer";
import CreatePlayer from "./CreatePlayer/CreatePlayer";

const cx = classNames.bind(styles);
export default function Player() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.player.allPlayer ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare()
                ? RouterDTO.player.create
                : RouterDTO.player.allPlayer
        );
    };

    return (
        <div className={cx("form-player")}>
            <div className={cx("header-player")}>
                <h4>Premier League</h4>
                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Player"
                            : "To Manage Player"}
                    </button>
                </div>
            </div>

            <>
                <Routes>
                    <Route path="/create" element={<CreatePlayer />}></Route>
                    <Route path={"/all"} element={<ManagePlayer />}></Route>
                    <Route path={"/update"} element={<CreatePlayer />}></Route>
                </Routes>
            </>
        </div>
    );
}
