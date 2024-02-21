import classNames from "classnames/bind";
import styles from "./Team.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageTeam from "./ManageTeam/ManageTeam";
import CreateTeam from "./CreateTeam/CreateTeam";

const cx = classNames.bind(styles);

export default function Team() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.team.allTeam ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare() ? RouterDTO.team.create : RouterDTO.team.allTeam
        );
    };
    return (
        <div className={cx("form-team")}>
            <div className={cx("header-team")}>
                <h4>Premier League</h4>
                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare() ? "To Create Team" : "To Manage Team"}
                    </button>
                </div>
            </div>

            {location === "/team" ? (
                <div className={cx("form-text")}>
                    <h3>Manage Team Premier League</h3>
                </div>
            ) : handleCompare() ? (
                <ManageTeam />
            ) : (
                <CreateTeam />
            )}
        </div>
    );
}
