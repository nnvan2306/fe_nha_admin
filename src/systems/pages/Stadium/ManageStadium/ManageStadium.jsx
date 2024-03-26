import classNames from "classnames/bind";
import styles from "./ManageStadium.module.scss";
import { useEffect, useState } from "react";
import {
    deleteStadiumService,
    getStadiumService,
} from "../../../../service/stadiumService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function ManageStadium() {
    const [listStadium, setListStadium] = useState([]);

    const navigate = useNavigate();

    const fetch = async () => {
        let res = await getStadiumService();
        if (res.errorCode === 0) {
            setListStadium(res.data);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleDelete = (data) => {
        Swal.fire({
            title: `Do you want to delete ${data.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await deleteStadiumService(data.id);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete ${data.name} successfully`,
                        });
                        fetch();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `delete ${data.name} failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdate = (data) => {
        navigate(RouterDTO.stadium.update, { state: data });
    };

    return (
        <div className={cx("form-manage")}>
            <table>
                <thead>
                    <tr className={cx("tr-head")}>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {listStadium &&
                        listStadium.length > 0 &&
                        listStadium.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td className={cx("form-action")}>
                                        <button
                                            className={cx("btn-delete")}
                                            onClick={() => handleDelete(item)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className={cx("btn-edit")}
                                            onClick={() => handleUpdate(item)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
