import classNames from "classnames/bind";
import styles from "./Stadium.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import CreateStadium from "./CreateStadium/CreateStadium";
import ManageStadium from "./ManageStadium/ManageStadium";

const cx = classNames.bind(styles);
export default function Stadium() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.stadium.allStadium ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare()
                ? RouterDTO.stadium.create
                : RouterDTO.stadium.allStadium
        );
    };
    return (
        <div className={cx("form-stadium")}>
            <div className={cx("control-stadium")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Stadium"
                            : "To Manage Stadium"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateStadium />}></Route>
                    <Route path="/all" element={<ManageStadium />}></Route>
                    <Route path="/update" element={<CreateStadium />}></Route>
                </Routes>
            </div>
        </div>
    );
}
