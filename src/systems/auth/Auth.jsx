import classNames from "classnames/bind";
import styles from "./Auth.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./register/Register";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Auth() {
    const isLogin = useSelector((state) => state.authSlice.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin]);

    const location = useLocation().pathname;

    return (
        <div className={cx("form-home")}>
            <img
                // src="https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/112023/cang-thang-cuoc-dua-top-4-1_20231120021400.gif"
                src={`${BASE_URL}/images/thumbnailAuth.png`}
                alt=""
            />
            <div className={cx("form-control")}>
                <p>Welcome to Premier League</p>
                <div className={cx("form-button")}>
                    <NavLink className={cx("navlink")} to="/auth/login">
                        <button>
                            <p>Login</p>
                        </button>
                    </NavLink>
                    <NavLink className={cx("navlink")} to="/auth/register">
                        <button>
                            <p>Register</p>
                        </button>
                    </NavLink>
                </div>
            </div>

            {location === "/auth/login" || location === "/auth/register" ? (
                <Register />
            ) : (
                <></>
            )}
        </div>
    );
}
