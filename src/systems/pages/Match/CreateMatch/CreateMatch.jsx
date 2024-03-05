import classNames from "classnames/bind";
import styles from "./CreateMatch.module.scss";
import { useEffect, useRef, useState } from "react";
import { getAllTeam } from "../../../../service/teamService";
import { getAllSeasonService } from "../../../../service/seasonService";
import Swal from "sweetalert2";
import handleValidateVideo from "../../../../helps/handleValidateVideo";
import {
    createMatchService,
    updateMatchService,
} from "../../../../service/matchService";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../../../utils/constants";
import { RouterDTO } from "../../../../utils/routes.dto";

const cx = classNames.bind(styles);

export default function CreateMatch() {
    const [id, setId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [meta, setMeta] = useState("");
    const [hostId, setHostId] = useState(0);
    const [guestId, setGuestId] = useState(0);
    const [hostGoal, setHostGoal] = useState(0);
    const [guestGoal, setGuestGoal] = useState(0);
    const [seasonId, setSeasonId] = useState(0);
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [video, setVideo] = useState(null);
    const [listTeam, setListTeam] = useState([]);
    const [listSeason, setListSeason] = useState([]);
    const [previewVideo, setPreviewVideo] = useState("");
    const [isChangeFile, setIsChangeFile] = useState(false);
    const [urlDelete, setUrlDelete] = useState("");

    const refInputVideo = useRef(null);
    const location = useLocation().pathname;
    const { state } = useLocation();
    console.log(state);

    useEffect(() => {
        const _fetch = async () => {
            let teams = await getAllTeam();
            let seasons = await getAllSeasonService();

            if (teams.errorCode === 0 && seasons.errorCode === 0) {
                setListTeam(teams.data);
                setListSeason(seasons.data);
            }
        };
        _fetch();

        if (location === RouterDTO.match.updateMatch) {
            setId(state.id);
            setTitle(state.title);
            setMeta(state.meta);
            setSeasonId(state.seasonId);
            setHostId(state.hostId);
            setGuestId(state.guestId);
            setHostGoal(state.hostGoal);
            setGuestGoal(state.guestGoal);
            setDate(state.date);
            setHour(state.hour);
            setPreviewVideo(`${BASE_URL}${state.match_url}`);
            setUrlDelete(`${BASE_URL}${state.match_url}`);
        }
    }, []);

    const handleChangeFile = () => {
        const input = refInputVideo.current;
        if (input) {
            input.click();
        }
    };

    const handleChooseFile = (e) => {
        const file = e.target.files[0];
        if (handleValidateVideo(file)) {
            setPreviewVideo(URL.createObjectURL(file));
            setVideo(file);
            if (location === RouterDTO.match.updateMatch) {
                setIsChangeFile(true);
            }
        }
    };

    const reSet = () => {
        setTitle("");
        setMeta("");
        setSeasonId(0);
        setHostId(0);
        setGuestId(0);
        setHostGoal(0);
        setGuestGoal(0);
        setDate("");
        setHour("");
        setVideo(null);
        setPreviewVideo("");
        refInputVideo.current.value = null;
    };

    const handleValidate = () => {
        if (
            !title ||
            !meta ||
            !hostId ||
            !guestId ||
            !seasonId ||
            !date ||
            !hour
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }

        if (location !== RouterDTO.match.updateMatch) {
            if (!video) {
                Swal.fire({
                    icon: "warning",
                    title: "Please enter complete information !",
                });
                return false;
            }
        }
        return true;
    };

    const handleCreateMatch = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            title: title,
            meta: meta,
            date: date,
            hour: hour,
            hostGoal: hostGoal,
            guestGoal: guestGoal,
            hostId: hostId,
            guestId: guestId,
            seasonId: seasonId,
        };
        if (location === RouterDTO.match.updateMatch) {
            dataBuider.id = id;
            dataBuider.isChangeFile = isChangeFile;
            dataBuider.match_url = urlDelete;
        }
        if (location !== RouterDTO.match.updateMatch || isChangeFile) {
            dataBuider.file = video;
        }
        try {
            let res =
                location === RouterDTO.match.updateMatch
                    ? await updateMatchService(dataBuider)
                    : await createMatchService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "create match successfully",
                });
                reSet();
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error service ...",
            });
        }

        setIsLoading(false);
    };

    return (
        <div className={cx("form-create", "container")}>
            <div className={cx("row", "form-control")}>
                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="meta">Meta</label>
                        <br />
                        <input
                            type="text"
                            id="meta"
                            value={meta}
                            onChange={(e) => setMeta(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="season">Season</label>
                        <br />

                        <select
                            value={seasonId}
                            onChange={(e) => setSeasonId(e.target.value)}
                        >
                            <option value={0}>season</option>
                            {listSeason &&
                                listSeason.length > 0 &&
                                listSeason.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="">File Match</label>
                        <br />
                        <input
                            hidden
                            type="file"
                            ref={refInputVideo}
                            onChange={handleChooseFile}
                            accept="video/mp4"
                        />
                        <div
                            className={cx("box-choose-file")}
                            onClick={handleChangeFile}
                        >
                            <p>
                                {" "}
                                <i className="bi bi-plus-circle"></i>
                                <span> Choose File</span>
                            </p>
                        </div>
                        <div className={cx("form-preview")}>
                            <video src={previewVideo} controls></video>
                        </div>
                    </div>
                </div>

                {/* col two */}

                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("row")}>
                        <div className={cx("col-5")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostTeam">Host Team</label>
                                <br />

                                <select
                                    value={hostId}
                                    onChange={(e) => setHostId(e.target.value)}
                                >
                                    <option value={0}>team</option>
                                    {listTeam &&
                                        listTeam.length > 0 &&
                                        listTeam.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>

                        <div className="col-2">
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: "30px",
                                    fontWeight: "500",
                                    marginTop: "30px",
                                }}
                            >
                                Vs
                            </p>
                        </div>

                        <div className={cx("col-5")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestTeam">Guest Team</label>
                                <br />

                                <select
                                    value={guestId}
                                    onChange={(e) => setGuestId(e.target.value)}
                                >
                                    <option value={0}>team</option>
                                    {listTeam &&
                                        listTeam.length > 0 &&
                                        listTeam.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="goalHost">Goal Host</label>
                                <br />

                                <input
                                    type="number"
                                    id="goalHost"
                                    value={hostGoal}
                                    onChange={(e) =>
                                        setHostGoal(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="goalGuest">Goal Guest</label>
                                <br />
                                <input
                                    type="number"
                                    id="goalGuest"
                                    value={guestGoal}
                                    onChange={(e) =>
                                        setGuestGoal(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="Date">Date</label>
                                <br />
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hour">Hour</label>
                                <br />
                                <input
                                    type="time"
                                    id="hour"
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
                    <button onClick={handleCreateMatch}>
                        {location === RouterDTO.match.updateMatch
                            ? "Update"
                            : "Create"}
                    </button>
                )}
            </div>
        </div>
    );
}
