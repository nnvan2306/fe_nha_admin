import classNames from "classnames/bind";
import styles from "./Setting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { handleUpdateUserService } from "../../../service/authService";
import { updateUser } from "../../../features/auth/authSlice";

const cx = classNames.bind(styles);

export default function Setting() {
    const [name, setName] = useState(
        useSelector((state) => state.authSlice.name)
    );

    const id = useSelector((state) => state.authSlice.id);
    const dispatch = useDispatch();

    const handleUpdate = () => {
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

                        dispatch(updateUser(dataBuider));
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

    return (
        <div className={cx("form-setting")}>
            <div className={cx("form-avatar")}>
                <img src="" alt="" />
            </div>
            <div className={cx("form-info")}>
                <div className={cx("form-input")}>
                    <label htmlFor="">Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <i
                        className="bi bi-pencil"
                        onClick={() => handleUpdate()}
                    ></i>
                </div>
            </div>
        </div>
    );
}
