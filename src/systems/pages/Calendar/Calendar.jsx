import classNames from "classnames/bind";
import styles from "./Calendar.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import CreateCalendar from "./CreateCalendar/CreateCalendar";
import ManageCalendar from "./ManageCalendar/ManageCalendar";

const cx = classNames.bind(styles);
export default function Calendar() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.calendar.allCalendar ? true : false;
    };

    const handleNavigate = () => {
        navigate(
            handleCompare()
                ? RouterDTO.calendar.create
                : RouterDTO.calendar.allCalendar
        );
    };
    return (
        <div className={cx("form-calendar")}>
            <div className={cx("control-calendar")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare()
                            ? "To Create Calendar"
                            : "To Manage Calendar"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/create" element={<CreateCalendar />} />
                    <Route path="/all" element={<ManageCalendar />} />
                    <Route path="/update" element={<CreateCalendar />} />
                </Routes>
            </div>
        </div>
    );
}
