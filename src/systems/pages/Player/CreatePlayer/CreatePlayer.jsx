import classNames from "classnames/bind";
import styles from "./CreatePlayer.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useRef, useState } from "react";
import { createTeamService } from "../../../../service/teamService";
import handleValidateImage from "../../../../helps/handleValidate";
import Swal from "sweetalert2";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const cx = classNames.bind(styles);
export default function CreatePlayer() {
    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [markdown, setMarkdown] = useState({
        text: "",
        html: "",
    });

    const refInputThumbnail = useRef(null);

    function handleEditorChange({ html, text }) {
        setMarkdown({ html: html, text: text });
    }

    const reSetValue = () => {
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
            console.log("ref");
            input.click();
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (handleValidateImage(file)) {
            setLogoPreview(URL.createObjectURL(file));
            setLogo(file);
        }
    };

    const handleValidate = () => {
        if (!code || !name || !markdown.text || !markdown.html) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    const handleCreateTeam = async () => {
        let check = handleValidate();
        if (!check) {
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
                <div className={cx("col-12", "col-md-6")}>
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
                <button onClick={handleCreateTeam}>Create</button>
            </div>
        </div>
    );
}
