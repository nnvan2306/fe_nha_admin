import classNames from "classnames/bind";
import styles from "./Season.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageSeason from "./ManageSeason/ManageSeason";
import CreateSeason from "./CreateSeason/CreateSeason";

const cx = classNames.bind(styles);

export default function Season() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.season.allSeason ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare()
                ? RouterDTO.season.create
                : RouterDTO.season.allSeason
        );
    };
    return (
        <div className={cx("form-season")}>
            <div className={cx("header-season")}>
                <h4>Premier League</h4>
                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Season"
                            : "To Manage Season"}
                    </button>
                </div>
            </div>

            {location === "/season" ? (
                <div className={cx("form-text")}>
                    <h3>Manage Season Premier League</h3>
                </div>
            ) : handleCompare() ? (
                <ManageSeason />
            ) : (
                <CreateSeason />
            )}
        </div>
    );
}
