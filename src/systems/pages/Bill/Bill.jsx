import classNames from "classnames/bind";
import styles from "./Bill.module.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../utils/routes.dto";
import ManageBill from "./ManageBill/ManageBill";

const cx = classNames.bind(styles);
export default function Bill() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const handleCompare = () => {
        return location === RouterDTO.bill.allBill ? true : false;
    };

    const handleNavigate = () => {
        navigate(handleCompare() ? "/bill" : RouterDTO.bill.allBill);
    };
    return (
        <div className={cx("form-bill")}>
            <div className={cx("control-bill")}>
                <p>Premier League</p>

                <div className={cx("button-swap")}>
                    <button onClick={handleNavigate}>
                        {handleCompare() ? "To home Bill" : "To Manage Bill"}
                    </button>
                </div>
            </div>

            <div className={cx("form-content")}>
                <Routes>
                    <Route path="/all" element={<ManageBill />} />
                </Routes>
            </div>
        </div>
    );
}
