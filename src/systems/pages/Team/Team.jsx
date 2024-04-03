import classNames from "classnames/bind";
import styles from "./Team.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageTeam from "./ManageTeam/ManageTeam";
import CreateTeam from "./CreateTeam/CreateTeam";
import ManagePlayerOfTeam from "./ManagePlayerTeam/ManagePlayerTeam";

const cx = classNames.bind(styles);

export default function Team() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.team.allTeam ? true : false;
    };

    const handleCompareWithPathManage = () => {
        return location === RouterDTO.team.managePlayerOfTeam ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare() ? RouterDTO.team.create : RouterDTO.team.allTeam
        );
    };

    return (
        <div className={cx("form-team")}>
            <div className={cx("control-team")}>
                <p>Premier League</p>
                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompareWithPathManage() ? (
                            <>
                                <i className="bi bi-chevron-left"></i>Back
                            </>
                        ) : handleCompare() ? (
                            "To Create Team"
                        ) : (
                            "To Manage Team"
                        )}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateTeam />} />
                    <Route path={"/all"} element={<ManageTeam />} />
                    <Route
                        path={"/managePlayer"}
                        element={<ManagePlayerOfTeam />}
                    />
                    <Route path="/update" element={<CreateTeam />} />
                </Routes>
            </div>
        </div>
    );
}
