import classNames from "classnames/bind";
import styles from "./CreateTeam.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
    createTeamService,
    updateTeamService,
} from "../../../../service/teamService";
import handleValidateImage from "../../../../helps/handleValidate";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routes.dto";
import { BASE_URL } from "../../../../utils/constants";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const cx = classNames.bind(styles);

export default function CreateTeam() {
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(0);
    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [logoUrlUpdate, setLogoUrlUpdate] = useState("");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [isChangeFileUpload, setIsChangeFileUpload] = useState(false);
    const [markdown, setMarkdown] = useState({
        text: "",
        html: "",
    });

    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();

    console.log(state);
    useEffect(() => {
        if (location === RouterDTO.team.updateTeam) {
            setId(state.id);
            setCode(state.code);
            setName(state.name);
            setLogoUrlUpdate(state.logo_url);
            setMarkdown({
                text: state.des_text,
                html: state.description,
            });
            setLogoPreview(`${BASE_URL}${state.logo_url}`);
        }
    }, [location, state]);

    const refInputThumbnail = useRef(null);

    function handleEditorChange({ html, text }) {
        setMarkdown({ html: html, text: text });
    }

    const reSetValue = () => {
        setId(0);
        setIsChangeFileUpload(false);
        setCode(0);
        setName("");
        setLogo(null);
        setLogoPreview("");
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
            setIsChangeFileUpload(true);
            setLogoPreview(URL.createObjectURL(file));
            setLogo(file);
        }
    };

    const handleValidate = () => {
        if (!code || !name || !markdown.text || !markdown.html || !logo) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    const handleValidateUpdate = () => {
        if (!code || !name || !markdown.text || !markdown.html) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    //create

    const handleCreateTeam = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }
        let dataBuider = {
            code: code,
            name: name,
            file: logo,
            description: markdown.html,
            des_text: markdown.text,
        };
        try {
            let res = await createTeamService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Create team successfully !",
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

    //update

    const handleUpdate = async () => {
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
            logo_url: logoUrlUpdate,
            description: markdown.html,
            des_text: markdown.text,
            isChangeFile: isChangeFileUpload,
        };
        console.log(dataBuider);
        if (isChangeFileUpload) {
            dataBuider.file = logo;
        }

        try {
            let res = await updateTeamService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "update successfully",
                });
                navigate(RouterDTO.team.allTeam);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "An error occurred. Please try again later !",
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
                                    logoPreview
                                        ? logoPreview
                                        : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                                }
                                alt=""
                            />
                        </div>
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
                            location === RouterDTO.team.updateTeam
                                ? handleUpdate
                                : handleCreateTeam
                        }
                    >
                        {location === RouterDTO.team.updateTeam
                            ? "Edit"
                            : "Create"}
                    </button>
                )}
            </div>
        </div>
    );
}
