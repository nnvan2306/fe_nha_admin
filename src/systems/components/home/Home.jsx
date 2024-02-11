import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../header/Header";

const cx = classNames.bind(styles);

export default function Home() {
    return (
        <>
            <div className={cx("form-header")}>
                <Header />
            </div>
            <div className={cx("form-sidebar", "container")}>
                <div className=""></div>
                <div className=""></div>
            </div>
        </>
    );
}
