import classNames from "classnames/bind";
import styles from "./Setting.module.scss";

const cx = classNames.bind(styles);

export default function Setting() {
    return (
        <div className={cx("form-setting")}>
            <div className={cx("form-avatar")}>
                <img src="" alt="" />
            </div>
            <div className={cx("form-info")}>
                <div className={cx("form-input")}>
                    <label htmlFor="">Name</label>
                    <br />
                    <input type="text" />
                    <i className="bi bi-pencil"></i>
                </div>
            </div>
        </div>
    );
}
