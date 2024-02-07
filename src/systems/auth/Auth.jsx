import classNames from "classnames/bind";
import styles from "./Auth.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Register from "./register/Register";
import Login from "./login/Login";

const cx = classNames.bind(styles);

export default function Auth() {
    const [isShowForm, setIsShowForm] = useState(false);

    const location = useLocation().pathname;

    const handleShowForm = () => {
        console.log("a");
        setIsShowForm(true);
    };
    return (
        <div className={cx("form-home")}>
            <img
                src="https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/112023/cang-thang-cuoc-dua-top-4-1_20231120021400.gif"
                alt=""
            />
            <div className={cx("form-control")}>
                <p>Welcome to Premier League</p>
                <div className={cx("form-button")}>
                    <NavLink
                        className={cx("navlink")}
                        to="/auth/login"
                        onClick={() => handleShowForm()}
                    >
                        <button>
                            <p>Login</p>
                        </button>
                    </NavLink>
                    <NavLink
                        className={cx("navlink")}
                        to="/auth/register"
                        onClick={() => handleShowForm()}
                    >
                        <button>
                            <p>Register</p>
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className={cx(isShowForm ? "form-auth" : "d-none")}>
                {location === "/auth/login" ? <Login /> : <Register />}
            </div>
        </div>
    );
}
