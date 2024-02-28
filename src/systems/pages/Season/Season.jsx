import classNames from "classnames/bind";
import styles from "./Season.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageSeason from "./ManageSeason/ManageSeason";
import CreateSeason from "./CreateSeason/CreateSeason";
import { BASE_URL } from "../../../utils/constants";

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
            {location === "/season" ? (
                <img src={`${BASE_URL}/images/season.jpg`} alt="" />
            ) : (
                <></>
            )}

            <div className={cx("header-season")}>
                <p>Premier League</p>
                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Season"
                            : "To Manage Season"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                {location === "/season" ? (
                    <></>
                ) : handleCompare() ? (
                    <ManageSeason />
                ) : (
                    <CreateSeason />
                )}
            </div>
        </div>
    );
}
