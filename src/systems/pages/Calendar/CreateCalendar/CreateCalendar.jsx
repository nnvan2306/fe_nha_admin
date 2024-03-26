import classNames from "classnames/bind";
import styles from "./CreateCalendar.module.scss";
import { useEffect, useState } from "react";
import { RouterDTO } from "../../../../utils/routes.dto";
import { getStadiumService } from "../../../../service/stadiumService";
import { getAllTeam } from "../../../../service/teamService";
import Swal from "sweetalert2";
import { createCalendarService } from "../../../../service/calendarService";

const cx = classNames.bind(styles);

export default function CreateCalendar() {
    const [isLoading, setIsLoading] = useState(false);
    const [listStadium, setListStadium] = useState([]);
    const [listTeam, setListTeam] = useState([]);
    const [hostId, setHostId] = useState(0);
    const [guestId, setGuestId] = useState(0);
    const [stadiumId, setStadiumId] = useState(0);
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const resStadiums = await getStadiumService();
            const resTeams = await getAllTeam();

            if (resTeams.errorCode === 0 && resStadiums.errorCode === 0) {
                setListStadium(
                    resStadiums.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
                setListTeam(
                    resTeams.data.map((item) => {
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

    const handleValidate = () => {
        if (!hostId || !guestId || !stadiumId || !date || !hour) {
            Swal.fire({
                icon: "warning",
                title: "please enter info !",
            });
            return false;
        }
        if (hostId === guestId) {
            Swal.fire({
                icon: "warning",
                title: "host Team and guest tem mustn't same !",
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
            hostId: hostId,
            guestId: guestId,
            stadiumId: stadiumId,
            date: date,
            hour: hour,
        };

        try {
            let res = await createCalendarService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "craete calendra success",
                });
                setGuestId(0);
                setHostId(0);
                setDate("");
                setHour("");
                setStadiumId(0);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error from server please try again !",
            });
        }
        setIsLoading(false);
    };

    const handleUpdate = () => {};

    return (
        <div className={cx("form-create", "container")}>
            <div className={cx("row")}>
                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="hostId">Host Team</label> <br />
                        <select
                            name=""
                            id="hostId"
                            value={hostId}
                            onChange={(e) => setHostId(e.target.value)}
                        >
                            <option value={0}>choose team</option>
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
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="guest Id">Guest Team</label> <br />
                        <select
                            name=""
                            id="guestId"
                            value={guestId}
                            onChange={(e) => setGuestId(e.target.value)}
                        >
                            <option value={0}>choose team</option>
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
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="stadiumId">Stadium</label> <br />
                        <select
                            name=""
                            id="stadiumId"
                            value={stadiumId}
                            onChange={(e) => setStadiumId(e.target.value)}
                        >
                            <option value={0}>choose stadium</option>
                            {listStadium &&
                                listStadium.length > 0 &&
                                listStadium.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>

                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="date">Date</label> <br />
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="hour">Hour</label> <br />
                        <input
                            type="time"
                            id="hour"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                        />
                    </div>

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
                                    location === RouterDTO.calendar.update
                                        ? handleUpdate
                                        : handleCreate
                                }
                            >
                                {location === RouterDTO.team.updateTeam
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
