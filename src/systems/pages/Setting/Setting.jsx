import classNames from "classnames/bind";
import styles from "./Setting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import {
    handleUpdateAvatarService,
    handleUpdateUserService,
} from "../../../service/authService";
import { updateAvatar, updateName } from "../../../features/auth/authSlice";
import { Modal } from "antd";
import handleValidateImage from "../../../helps/handleValidate";

const cx = classNames.bind(styles);

export default function Setting() {
    const [name, setName] = useState(
        useSelector((state) => state.authSlice.name)
    );
    const [isModalName, setIsModalName] = useState(false);
    const [isModalAvatar, setIsModalAvartar] = useState(false);
    const [fileAvatar, setFileAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(
        useSelector((state) => state.authSlice.avatar)
    );

    const refAvatar = useRef(null);

    const id = useSelector((state) => state.authSlice.id);
    const avatarDefault = useSelector((state) => state.authSlice.avatar);
    const dispatch = useDispatch();

    const showModalName = () => {
        setIsModalName(true);
    };

    const handleOkModalName = () => {
        setIsModalName(false);
    };

    const handleCancelModalName = () => {
        setIsModalName(false);
    };

    const showModalAvatar = () => {
        setIsModalAvartar(true);
    };

    const handleCancelModalAvatar = () => {
        setIsModalAvartar(false);
    };

    const handleUpdateName = () => {
        Swal.fire({
            title: `Do you want update name to ${name}?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let dataBuider = {
                        id: id,
                        name: name,
                    };
                    let Res = await handleUpdateUserService(dataBuider);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `update successfully`,
                        });
                        dispatch(updateName(dataBuider));
                        setIsModalName(false);
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `update failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleChooseFile = () => {
        const input = refAvatar.current;
        if (input) {
            input.click();
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (handleValidateImage(file)) {
            setAvatarPreview(URL.createObjectURL(file));
            setFileAvatar(file);
        }
    };

    const handleUpdateAvatar = async () => {
        if (!fileAvatar) {
            Swal.fire({
                icon: "warning",
                title: "please enter avatar !",
            });
            return;
        }

        let dataBuider = {
            avatar: avatarDefault,
            avatarNew: fileAvatar,
        };

        try {
            let res = await handleUpdateAvatarService(dataBuider);

            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "update success",
                });

                dispatch(updateAvatar({ avatar: res.data }));
                refAvatar.current.value = null;
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "err from server , please try again !",
            });
        }
    };

    const handleRemoveAvatar = () => {};

    return (
        <div className={cx("form-setting")}>
            <h3>Basic information</h3>

            <div className={cx("form-avatar")} onClick={showModalAvatar}>
                <p className={cx("title")}>profile photo</p>
                <p className={cx("detail")}>
                    Your profile photo will help you personalize your account
                </p>
                <div className={cx("form-image")}>
                    <img src="" alt="" />
                </div>
            </div>

            <Modal
                open={isModalAvatar}
                footer=""
                onCancel={handleCancelModalAvatar}
            >
                <div className={cx("form-update-avatar")}>
                    <h4>Profile photo</h4>
                    <p>
                        Your profile photo helps others recognize you and also
                        helps you know that you are signed in to your account
                    </p>

                    <div className={cx("form-img")}>
                        <div
                            className={cx("form-change-img")}
                            onClick={() => handleChooseFile()}
                        >
                            <p>
                                <i className="bi bi-camera-fill"></i>
                            </p>
                        </div>

                        {avatarPreview ? (
                            <img src={avatarPreview} alt="avatar" />
                        ) : (
                            <div className={cx("div-img")}>
                                <p>{name.slice(0, 1).toUpperCase()}</p>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                        ref={refAvatar}
                        onChange={handleChangeFile}
                    />

                    <div className={cx("form-button")}>
                        <button onClick={() => handleUpdateAvatar()}>
                            <i className="bi bi-pencil-fill"></i> Change
                        </button>
                        <button onClick={() => handleRemoveAvatar()}>
                            {" "}
                            <i className="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </Modal>

            <div className={cx("form-info")} onClick={showModalName}>
                <p className={cx("title")}>Name</p>

                <p className={cx("detail")}>{name}</p>

                <div className={cx("form-icon")}>
                    <p>
                        <i className="bi bi-chevron-right"></i>
                    </p>
                </div>
            </div>

            <Modal
                title="Basic Modal"
                open={isModalName}
                onOk={handleOkModalName}
                onCancel={handleCancelModalName}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <div className={cx("form-input")}>
                    <label htmlFor="">Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className={cx("form-icon")}>
                        <i
                            className="bi bi-pencil"
                            onClick={() => handleUpdateName()}
                        ></i>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
