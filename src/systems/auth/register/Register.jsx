import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import validateEmail from "../../../helps/validateEmail";

const cx = classNames.bind(styles);
const path = "/auth/register";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    let loction = useLocation().pathname;

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

    const handleRegister = () => {
        let check = handleValidateRegister();
        if (!check) return;

        let dataBuider = {
            email: email,
            name: name,
            password: password,
            rePassword: rePassword,
        };
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
    const handleLogin = () => {
        let check = validateLogin();
        if (!check) return;
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

                <div className={cx("close")}>
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

            {/* {loction === path ? (
                <></>
            ) : (
                <div className={cx("form-footer")}>
                    <img
                        src="https://www.thethaothientruong.vn/uploads/2023/giai-ngoai-hang-anh-la-gi.jpg"
                        alt=""
                    />
                </div>
            )} */}
        </div>
    );
}
