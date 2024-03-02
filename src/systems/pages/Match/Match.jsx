import classNames from "classnames/bind";
import styles from "./Match.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import CreateMatch from "./CreateMatch/CreateMatch";
import ManageMatch from "./ManageMatch/ManageMatch";

const cx = classNames.bind(styles);

export default function Match() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.match.allMatch ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare() ? RouterDTO.match.create : RouterDTO.match.allMatch
        );
    };
    return (
        <div className={cx("form-match")}>
            <div className={cx("header-match")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Player"
                            : "To Manage Player"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateMatch />}></Route>
                    <Route path="/all" element={<ManageMatch />}></Route>
                </Routes>
            </div>
        </div>
    );
}
