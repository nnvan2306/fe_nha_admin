import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import validateEmail from "../../../helps/validateEmail";
import {
    RegisterService,
    handleLoginService,
} from "../../../service/authService";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../features/auth/authSlice";
import { RouterDTO } from "../../../utils/routes.dto";

const cx = classNames.bind(styles);
const path = "/auth/register";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const isLogin = useSelector((state) => state.authSlice.isLogin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let loction = useLocation().pathname;

    useEffect(() => {
        if (!isLogin) {
            navigate("/auth/login");
        }
    }, [navigate, isLogin]);

    const reSetValue = () => {
        setEmail("");
        setName("");
        setPassword("");
        setRePassword("");
    };

    const handleClose = () => {
        navigate("/auth");
    };

    // Register

    const handleValidateRegister = () => {
        const arrCheck = [email, name, password, rePassword];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!arrCheck[i]) {
                Swal.fire({
                    icon: "warning",
                    title: "Please fill in all information !",
                });
                return false;
            }
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: "warning",
                title: "Please enter the correct email format",
            });
            return false;
        }

        if (password !== rePassword) {
            Swal.fire({
                icon: "warning",
                title: "password and re-pasword are not the same",
            });
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        let check = handleValidateRegister();
        if (!check) return;

        let dataBuider = {
            email: email,
            name: name,
            password: password,
            rePassword: rePassword,
        };

        try {
            let fetch = await RegisterService(dataBuider);
            if (fetch?.errorCode === 0) {
                reSetValue();
                navigate("/auth/login");
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        }
    };

    // Login

    const validateLogin = () => {
        const arrCheck = [email, password];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!arrCheck[i]) {
                Swal.fire({
                    icon: "warning",
                    title: "Please fill in all information !",
                });
                return false;
            }
        }
        if (!validateEmail(email)) {
            Swal.fire({
                icon: "warning",
                title: "Please enter the correct email format",
            });
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        let check = validateLogin();
        if (!check) return;

        let dataBuider = {
            email: email,
            password: password,
        };

        try {
            let fetch = await handleLoginService(dataBuider);
            if (fetch?.errorCode === 0) {
                reSetValue();
                dispatch(loginSuccess(fetch?.data));
                navigate(RouterDTO.season.allSeason);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        }
    };

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
                    <p>{loction === path ? "Register" : "Login"}</p>
                </div>

                <div className={cx("close")} onClick={handleClose}>
                    <i
                        className={cx("bi bi-x-circle", "icon-close")}
                        style={{
                            color: "red",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                    ></i>
                </div>
            </div>

            <div className={cx("input-control")}>
                <div className={cx("form-input")}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {loction === path ? (
                    <div className={cx("form-input")}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                ) : (
                    <></>
                )}

                <div className={cx("form-input")}>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {loction === path ? (
                    <div className={cx("form-input")}>
                        <label htmlFor="re-password">Re-password</label>
                        <br />
                        <input
                            type="text"
                            id="re-password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className={cx("form-submit")}>
                <button
                    className={cx("button-submit")}
                    onClick={() =>
                        loction === path ? handleRegister() : handleLogin()
                    }
                >
                    {loction === path ? "Register" : "Login"}
                </button>
            </div>

            <div className={cx("form-support")}>
                <span>
                    {loction === path
                        ? "Do you already have an account"
                        : "Already have an account?"}{" "}
                    ?{" "}
                </span>
                <NavLink
                    className={cx("navlink")}
                    to={loction === path ? "/auth/login" : "/auth/register"}
                >
                    {loction === path ? "(Login)" : "(Register)"}
                </NavLink>
            </div>
        </div>
    );
}
