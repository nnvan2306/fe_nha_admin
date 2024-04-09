import classNames from "classnames/bind";
import styles from "./CreatePlayer.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useRef, useState } from "react";
import { getAllTeam } from "../../../../service/teamService";
import handleValidateImage from "../../../../helps/handleValidate";
import Swal from "sweetalert2";
import {
    createPlayerService,
    updatePlayerService,
} from "../../../../service/playerService";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";
import { BASE_URL } from "../../../../utils/constants";
import { handleApi } from "../../../../service/handleApi";
// import moment from "moment";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const cx = classNames.bind(styles);
export default function CreatePlayer() {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(0);
    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [nationality, setNationality] = useState("");
    const [birthday, setBirthday] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarUrlOld, setAvatarUrlOld] = useState("");
    const [isActive, setIsActive] = useState(0);
    const [teamId, setTeamId] = useState(0);
    const [isChangeFileUpdate, setIsChangeFileUpdate] = useState(false);
    const [locationPlayer, setLocationPlayer] = useState(0);
    const [options, setOptions] = useState([]);
    const [markdown, setMarkdown] = useState({
        text: "",
        html: "",
    });

    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();
    const refInputThumbnail = useRef(null);

    useEffect(() => {
        if (location === RouterDTO.player.updatePlayer) {
            setId(state.id);
            setCode(state.code);
            setName(state.name);
            setNationality(state.nationality);
            setBirthday(state.birthday.split("T")[0]);
            setHeight(state.height);
            setWeight(state.weight);
            setAvatarPreview(`${BASE_URL}${state.avatar_url}`);
            setTeamId(state.teamId);
            setIsActive(state.isActive ? 1 : 0);
            setLocationPlayer(state.location);
            setMarkdown({
                text: state.des_text,
                html: state.description,
            });
            setAvatarUrlOld(state.avatar_url);
        }
    }, [state, location]);

    function handleEditorChange({ html, text }) {
        setMarkdown({ html: html, text: text });
    }

    useEffect(() => {
        const _fetch = async () => {
            let res = await getAllTeam();
            setOptions(
                res.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.name,
                    };
                })
            );
        };
        _fetch();
    }, []);

    const reSetValue = () => {
        setCode(0);
        setName("");
        setNationality("");
        setBirthday("");
        setHeight(0);
        setWeight(0);
        setTeamId(0);
        setAvatar(null);
        setAvatarPreview("");
        setIsActive(0);
        setLocationPlayer(0);
        setMarkdown({
            text: "",
            html: "",
        });
        refInputThumbnail.current.value = null;
    };

    const handleChooseFile = () => {
        const input = refInputThumbnail.current;
        if (input) {
            input.click();
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (handleValidateImage(file)) {
            setAvatarPreview(URL.createObjectURL(file));
            setAvatar(file);
            setIsChangeFileUpdate(true);
        }
    };

    const handleChangeTeam = (id) => {
        setTeamId(id);
    };

    const handleValidate = () => {
        if (
            !code ||
            !name ||
            !markdown.text ||
            !markdown.html ||
            !nationality ||
            !height ||
            !weight ||
            !birthday ||
            !teamId ||
            !avatar ||
            !locationPlayer
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    // create

    const handleCreatePlayer = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }
        let dataBuider = {
            code: code,
            name: name,
            nationality: nationality,
            location: locationPlayer,
            height: height,
            weight: weight,
            birthday: birthday,
            teamId: teamId,
            isActive: isActive ? true : false,
            file: avatar,
            description: markdown.html,
            des_text: markdown.text,
        };
        try {
            let res = await handleApi(createPlayerService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Create Player successfully !",
                });
                reSetValue();
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "error occurred. Please try again later !",
            });
        }
        setIsLoading(false);
    };

    // update

    const handleValidateUpdate = () => {
        if (
            !code ||
            !name ||
            !markdown.text ||
            !markdown.html ||
            !nationality ||
            !height ||
            !weight ||
            !birthday ||
            !teamId ||
            !locationPlayer
        ) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    const handleUpdatePlayer = async () => {
        setIsLoading(true);
        let check = handleValidateUpdate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            id: id,
            code: code,
            name: name,
            description: markdown.html,
            des_text: markdown.text,
            location: locationPlayer,
            nationality: nationality,
            height: height,
            weight: weight,
            birthday: birthday,
            isActive: isActive ? true : false,
            teamId: teamId,
            avatar_url: avatarUrlOld,
            isChangeFile: isChangeFileUpdate,
        };
        if (isChangeFileUpdate) {
            dataBuider.file = avatar;
        }
        try {
            let res = await handleApi(updatePlayerService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Update Player successfully !",
                });
                navigate(RouterDTO.player.allPlayer);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error occurred. Please try again later !",
            });
        }
        setIsLoading(false);
    };

    return (
        <div className={cx("form-create", "container")}>
            <div className={cx("row")}>
                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="code">code</label> <br />
                        <input
                            type="number"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="name">name</label> <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="nationality">nationality</label> <br />
                        <input
                            type="text"
                            id="nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>
                    <div className={cx("form-input")}>
                        <label htmlFor="birthday">birthday</label> <br />
                        <input
                            type="date"
                            id="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input", "col-3")}>
                        <label htmlFor="height">
                            height <span>(m)</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input", "col-3")}>
                        <label htmlFor="weight">
                            weight <span>(kg)</span>
                        </label>
                        <br />
                        <input
                            type="text"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-upload-image")}>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            ref={refInputThumbnail}
                            onChange={handleChangeFile}
                        />
                        <div className={cx("upload-image")}>
                            <button
                                className={cx("icon")}
                                onClick={handleChooseFile}
                            >
                                <p>+</p>
                            </button>
                            <img
                                src={
                                    avatarPreview
                                        ? avatarPreview
                                        : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={cx("form-select")}>
                        <label htmlFor="team">team</label> <br />
                        <select
                            value={teamId}
                            onChange={(e) => handleChangeTeam(e.target.value)}
                        >
                            <option value={0}>teams</option>
                            {options &&
                                options.length > 0 &&
                                options.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    <div className={cx("form-select")}>
                        <label htmlFor="location">Location</label> <br />
                        <select
                            value={locationPlayer}
                            onChange={(e) => setLocationPlayer(e.target.value)}
                        >
                            <option value={0}>choose location</option>
                            <option value={1}>thủ môn</option>
                            <option value={2}>trung vệ</option>
                            <option value={3}>hậu vệ</option>
                            <option value={4}>tiền vệ</option>
                            <option value={5}>tiền đạo</option>
                        </select>
                    </div>

                    <div className={cx("form-select")}>
                        <label htmlFor="isActive">Active</label> <br />
                        <select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                        >
                            <option value={0}>false</option>
                            <option value={1}>true</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={cx("row")}>
                <div className={cx("form-markdown")}>
                    <label>Description</label>
                    <MdEditor
                        value={markdown.text}
                        style={{ height: "500px" }}
                        // onImageUpload={handleUploadImageMarkdown}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
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
                    <button
                        onClick={
                            location === RouterDTO.player.updatePlayer
                                ? handleUpdatePlayer
                                : handleCreatePlayer
                        }
                    >
                        {location === RouterDTO.player.updatePlayer
                            ? "Edit"
                            : "Create"}
                    </button>
                )}
            </div>
        </div>
    );
}
