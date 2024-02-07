import classNames from "classnames/bind";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

export default function Register() {
    return (
        <div className={cx("form-register")}>
            <div className={cx("form-header")}>
                <div className={cx("logo")}>
                    <img
                        src="https://img.lazcdn.com/g/p/ab08ba216c27c3674f224010c399ac50.jpg_720x720q80.jpg"
                        alt="logo"
                    />
                </div>

                <div className={cx("text-header")}>
                    <p>Register</p>
                </div>
                <div className={cx("close")}>
                    <i
                        className={cx("bi bi-x-circle")}
                        style={{
                            color: "red",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    ></i>
                </div>
            </div>
        </div>
    );
}
