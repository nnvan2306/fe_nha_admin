import classNames from "classnames/bind";
import styles from "./Stand.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import CreateStand from "./CreateStand/CreateStand";
import ManageStand from "./ManageStand/ManageStand";

const cx = classNames.bind(styles);
export default function Stand() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.stand.allStand ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare() ? RouterDTO.stand.create : RouterDTO.stand.allStand
        );
    };
    return (
        <div className={cx("form-stand")}>
            <div className={cx("control-stand")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Stand"
                            : "To Manage Stand"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateStand />} />
                    <Route path="/all" element={<ManageStand />} />
                    <Route path="/update" element={<CreateStand />} />
                </Routes>
            </div>
        </div>
    );
}
