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
import { BASE_URL } from "../../../../utils/constants";
import { handleApi } from "../../../../service/handleApi";

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
                    let Res = await handleApi(deleteStadiumService, data.id);
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
                        <th>Name</th>
                        <th>Location</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listStadium &&
                        listStadium.length > 0 &&
                        listStadium.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={cx("td-name")}>
                                        {item.name}
                                    </td>
                                    <td className={cx("td-location")}>
                                        {item.location}
                                    </td>
                                    <td className={cx("td-image")}>
                                        <img
                                            src={`${BASE_URL}${item.stadiumImage_url}`}
                                            alt=""
                                        />
                                    </td>
                                    <td className={cx("td-action")}>
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
