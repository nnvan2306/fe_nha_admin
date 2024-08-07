import classNames from "classnames/bind";
import styles from "./Auth.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./register/Register";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function Auth() {
    const isLogin = useSelector((state) => state.authSlice.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate(RouterDTO.season.allSeason);
        }
    }, [isLogin]);

    const location = useLocation().pathname;

    return (
        <div className={cx("form-home")}>
            <img
                src="https://vcdn1-thethao.vnecdn.net/2020/09/11/top-1599798009-5478-1599798043.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=9kZv6VKTsxu7QK-NQ035Pw"
                // src={`${BASE_URL}/images/thumbnailAuth.png`}
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
