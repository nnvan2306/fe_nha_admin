import classNames from "classnames/bind";
import styles from "./ManageCalendar.module.scss";
import { useEffect, useState } from "react";
import { getAllTeam } from "../../../../service/teamService";
import Swal from "sweetalert2";
import { getCalendarService } from "../../../../service/calendarService";

const cx = classNames.bind(styles);

export default function ManageCalendar() {
    const [listTeam, setListTeam] = useState([]);
    const [hostId, setHostId] = useState(0);
    const [guestId, setGuestId] = useState(0);
    const [listCalendar, setListCalendar] = useState([]);

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
                        <td>Host Team</td>
                        <td>Guest Team</td>
                        <td>Stadium</td>
                        <td>Date</td>
                        <td>Hour</td>
                        <td className={cx("td-action")}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {listCalendar &&
                        listCalendar.length > 0 &&
                        listCalendar.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
