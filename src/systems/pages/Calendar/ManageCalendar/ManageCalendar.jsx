import classNames from "classnames/bind";
import styles from "./ManageCalendar.module.scss";
import { useEffect, useState } from "react";
import { getAllTeam } from "../../../../service/teamService";
import Swal from "sweetalert2";
import {
    deleteCalendarService,
    getCalendarService,
} from "../../../../service/calendarService";
import { BASE_URL } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";
import ModalTicket from "./ModalTicket/ModalTicket";
import { handleApi } from "../../../../service/handleApi";
import { Empty } from "antd";

const cx = classNames.bind(styles);

export default function ManageCalendar() {
    const [listTeam, setListTeam] = useState([]);
    const [hostId, setHostId] = useState(0);
    const [guestId, setGuestId] = useState(0);
    const [listCalendar, setListCalendar] = useState([]);
    console.log(listCalendar);

    const navigate = useNavigate();

    const handleGetCalendar = async () => {
        try {
            let res = await getCalendarService(+hostId, +guestId);
            if (res.errorCode === 0) {
                setListCalendar(res.data);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error from server please try again !",
            });
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllTeam();
            if (res.errorCode === 0) {
                setListTeam(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
            }
        };
        fetch();
    }, []);

    const handleDelete = (data) => {
        Swal.fire({
            title: `Do you want to delete calendar ${data?.Teams[0]?.name} vs ${data?.Teams[1]?.name} ?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const _fetch = async () => {
                    let Res = await handleApi(deleteCalendarService, data.id);
                    if (Res.errorCode === 0) {
                        Swal.fire({
                            icon: "success",
                            title: `delete successfully`,
                        });
                        handleGetCalendar();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: `delete failure !`,
                        });
                    }
                };
                _fetch();
            }
        });
    };

    const handleUpdate = (data) => {
        navigate(RouterDTO.calendar.update, { state: data });
    };

    return (
        <div className={cx("from-manage")}>
            <div className={cx("form-search")}>
                <select
                    name=""
                    id=""
                    value={hostId}
                    onChange={(e) => setHostId(e.target.value)}
                >
                    <option value={0}>choose host team</option>
                    {listTeam &&
                        listTeam.length > 0 &&
                        listTeam.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
                <select
                    name=""
                    id=""
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
                >
                    {" "}
                    <option value={0}>choose guest team</option>
                    {listTeam &&
                        listTeam.length > 0 &&
                        listTeam.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
                <button onClick={handleGetCalendar}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Host Team</th>
                        <th>Guest Team</th>
                        <th>Stadium</th>
                        <th>Date</th>
                        <th>Hour</th>
                        <th className={cx("th-action")}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listCalendar && listCalendar.length > 0 ? (
                        listCalendar.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className={cx("td-team")}>
                                        <img
                                            src={`${BASE_URL}${
                                                item.hostId ===
                                                item.Teams[0]?.id
                                                    ? item.Teams[0]?.logo_url
                                                    : item.Teams[1]?.logo_url
                                            }`}
                                            alt="logo"
                                        />
                                        <p>
                                            {item.hostId === item.Teams[0]?.id
                                                ? item.Teams[0]?.name
                                                : item.Teams[1]?.name}
                                        </p>
                                    </td>
                                    <td className={cx("td-team")}>
                                        <img
                                            src={`${BASE_URL}${
                                                item.guestId ===
                                                item.Teams[0]?.id
                                                    ? item.Teams[0]?.logo_url
                                                    : item.Teams[1]?.logo_url
                                            }`}
                                            alt="logo"
                                        />
                                        <p>
                                            {item.guestId === item.Teams[0]?.id
                                                ? item.Teams[0]?.name
                                                : item.Teams[1]?.name}
                                        </p>
                                    </td>
                                    <td>{item.Stadium.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.hour}</td>
                                    <td className={cx("td-action")}>
                                        <button
                                            onClick={() => handleDelete(item)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(item)}
                                        >
                                            Edit
                                        </button>

                                        <div className={cx("form-modal")}>
                                            <ModalTicket info={item} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6">
                                <div className="empty-container">
                                    <Empty style={{ padding: "40px" }} />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
