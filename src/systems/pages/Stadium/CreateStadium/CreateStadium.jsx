import classNames from "classnames/bind";
import styles from "./CreateStadium.module.scss";
import { RouterDTO } from "../../../../utils/routes.dto";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    createStadiumService,
    updateStadiumService,
} from "../../../../service/stadiumService";
import { useLocation, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

export default function CreateStadium() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState(0);

    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location === RouterDTO.stadium.update) {
            setName(state.name);
            setId(state.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleValidate = () => {
        if (!name) {
            Swal.fire({
                icon: "warning",
                title: "please enter name !",
            });
            return false;
        }
        return true;
    };

    const handleCreate = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            name: name,
        };
        try {
            let res = await createStadiumService(dataBuider);

            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: res?.message,
                });
                setName(0);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error service please try again !",
            });
        }

        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            name: name,
            id: id,
        };

        try {
            let res = await updateStadiumService(dataBuider);
            if (res.errorCode === 0) {
                setIsLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "update successfully ",
                });
                navigate(RouterDTO.stadium.allStadium);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error from server please try again !",
            });
        }
    };

    return (
        <div className={cx("form-create", "container")}>
            <div className={cx("row")}>
                <div className={cx("col-6", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="name">Name</label> <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx("col-6", "col-md-6")}>
                    <div className={cx("button-Create")}>
                        {isLoading ? (
                            <button disabled className={cx("button-disabled")}>
                                <div
                                    className="spinner-border text-light"
                                    role="status"
                                ></div>
                            </button>
                        ) : (
                            <button
                                onClick={
                                    location === RouterDTO.stadium.update
                                        ? handleUpdate
                                        : handleCreate
                                }
                            >
                                {location === RouterDTO.stadium.update
                                    ? "Edit"
                                    : "Create"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
