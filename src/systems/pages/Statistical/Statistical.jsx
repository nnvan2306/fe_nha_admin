import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import { Route, Routes } from "react-router-dom";
import ManageStatistical from "./ManageStatistical/ManageStatistical";
import CreateStatistical from "./CreateStatistical/CreateStatistical";

const cx = classNames.bind(styles);

export default function Statistical() {
    return (
        <div className={cx("form-statistical")}>
            <Routes>
                <Route
                    path={"/allStatistical"}
                    element={<ManageStatistical />}
                ></Route>
                <Route path={"/create"} element={<CreateStatistical />}></Route>
                <Route path="/update" element={<CreateStatistical />}></Route>
            </Routes>
        </div>
    );
}
