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
import { useLocation, useNavigate } from "react-router-dom";
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
    const [isPlayded, setIsPlayded] = useState(0);
    const [hostShoot, setHostShoot] = useState(0);
    const [guestShoot, setGuestShoot] = useState(0);
    const [hostTarget, setHostTarget] = useState(0);
    const [guestTarget, setGuestTarget] = useState(0);
    const [hostBallControl, setHostBallControl] = useState(0);
    const [hostConnerKick, setHostConnerKick] = useState(0);
    const [guestConnerKick, setGuestConnerKick] = useState(0);

    const [hostRedCard, setHostRedCard] = useState(0);
    const [guestRedCard, setGuestRedCard] = useState(0);
    const [hostYellowCard, setHostYellowCard] = useState(0);
    const [guestYellowCard, setGuestYellowCard] = useState(0);

    const refInputVideo = useRef(null);
    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();

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
            setIsPlayded(state.isPlayded);
            setHostShoot(state.hostShoot);
            setGuestShoot(state.guestShoot);
            setHostTarget(state.target);
            setGuestTarget(state.guestTarget);
            setHostBallControl(state.hostBallControl);
            setHostConnerKick(state.hostConnerKick);
            setGuestConnerKick(state.guestConnerKick);
            setHostRedCard(state.hostRedCard);
            setGuestRedCard(state.guestRedCard);
            setHostYellowCard(state.hostYellowCard);
            setGuestYellowCard(state.guestYellowCard);
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
        setIsPlayded(0);
        setHostShoot(0);
        setGuestShoot(0);
        setHostTarget(0);
        setGuestTarget(0);
        setHostBallControl(0);
        setHostConnerKick(0);
        setGuestConnerKick(0);
        setHostRedCard(0);
        setGuestRedCard(0);
        setHostYellowCard(0);
        setGuestYellowCard(0);
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
            if (isPlayded) {
                console.log("true");
            }
            if (isPlayded && !video) {
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
            file: video,
            isPlayded: isPlayded ? true : false,
            hostShoot: hostShoot,
            guestShoot: guestShoot,
            hostTarget: hostTarget,
            guestTarget: guestTarget,
            hostBallControl: hostBallControl,
            hostConnerKick: hostConnerKick,
            guestConnerKick: guestConnerKick,
            hostRedCard: hostRedCard,
            guestRedCard: guestRedCard,
            hostYellowCard: hostYellowCard,
            guestYellowCard: guestYellowCard,
        };
        if (location === RouterDTO.match.updateMatch) {
            dataBuider.id = id;
            dataBuider.isChangeFile = isChangeFile;
            dataBuider.match_url = urlDelete;
        }

        try {
            let res =
                location === RouterDTO.match.updateMatch
                    ? await updateMatchService(dataBuider)
                    : await createMatchService(dataBuider);
            console.log(res);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "create match successfully",
                });
                if (location === RouterDTO.match.updateMatch) {
                    navigate(RouterDTO.match.allMatch);
                } else {
                    reSet();
                }
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
                        <label htmlFor="isPlayded">Is Playded</label>
                        <br />

                        <select
                            value={isPlayded}
                            onChange={(e) => setIsPlayded(e.target.value)}
                        >
                            <option value={0}>false</option>
                            <option value={1}>true</option>
                        </select>
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="hostBallControl">
                            Host Ball Control
                        </label>
                        <br />

                        <input
                            type="number"
                            value={hostBallControl}
                            onChange={(e) => setHostBallControl(e.target.value)}
                        />
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

                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostShoot">Host Shoot</label>
                                <br />
                                <input
                                    type="number"
                                    id="hostShoot"
                                    value={hostShoot}
                                    onChange={(e) =>
                                        setHostShoot(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestShoot">Guest Shoot</label>
                                <br />
                                <input
                                    type="number"
                                    id="guestShoot"
                                    value={guestShoot}
                                    onChange={(e) =>
                                        setGuestShoot(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostTarget">Host Target</label>
                                <br />
                                <input
                                    type="number"
                                    id="hostTarget"
                                    value={hostTarget}
                                    onChange={(e) =>
                                        setHostTarget(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestTarget">
                                    Guest Target
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="guestTarget"
                                    value={guestTarget}
                                    onChange={(e) =>
                                        setGuestTarget(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostConnerKick">
                                    Host Conner kick
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="hostConnerKick"
                                    value={hostConnerKick}
                                    onChange={(e) =>
                                        setHostConnerKick(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestConnerKick">
                                    Guest Conner Kick
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="guestConnerKick"
                                    value={guestConnerKick}
                                    onChange={(e) =>
                                        setGuestConnerKick(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostRedCard">
                                    Host Red Card
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="hostRedCard"
                                    value={hostRedCard}
                                    onChange={(e) =>
                                        setHostRedCard(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestRedCard">
                                    Guest Red Card
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="guestRedCard"
                                    value={guestRedCard}
                                    onChange={(e) =>
                                        setGuestRedCard(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="hostYellowCard">
                                    Host Yellow Card
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="hostYellowCard"
                                    value={hostYellowCard}
                                    onChange={(e) =>
                                        setHostYellowCard(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx("col-6")}>
                            <div className={cx("form-input")}>
                                <label htmlFor="guestYellowCard">
                                    Guest Yellow Card
                                </label>
                                <br />
                                <input
                                    type="number"
                                    id="guestYellowCard"
                                    value={guestYellowCard}
                                    onChange={(e) =>
                                        setGuestYellowCard(e.target.value)
                                    }
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
