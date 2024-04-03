import classNames from "classnames/bind";
import styles from "./Rating.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import CreateRating from "./CreateRating/CreateRating";
import ManageRating from "./ManageRating/ManageRating";

const cx = classNames.bind(styles);

export default function Rating() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.rating.allRating ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare()
                ? RouterDTO.rating.create
                : RouterDTO.rating.allRating
        );
    };
    return (
        <div className={cx("form-rating")}>
            <div className={cx("control-rating")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Rating"
                            : "To Manage Rating"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateRating />} />
                    <Route path="/all" element={<ManageRating />} />
                    <Route path="/update" element={<CreateRating />} />
                </Routes>
            </div>
        </div>
    );
}
