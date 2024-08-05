import classNames from "classnames/bind";
import styles from "./CreateSeason.module.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { CreateSeasonService } from "../../../../service/seasonService";
import { handleApi } from "../../../../service/handleApi";

const cx = classNames.bind(styles);
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function CreateSeason() {
    const [name, setName] = useState("");
    const [markdown, setMarkdown] = useState({
        text: "",
        html: "",
    });

    function handleEditorChange({ html, text }) {
        setMarkdown({ html: html, text: text });
    }

    const handleValidate = () => {
        if (!name || !markdown.text || !markdown.html) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }
        return true;
    };

    const reSetValue = () => {
        setName("");
        setMarkdown({
            text: "",
            html: "",
        });
    };

    const handleCreateSeason = async () => {
        let check = handleValidate();
        if (!check) {
            return;
        }
        let dataBuider = {
            name: name,
            description: markdown.html,
            des_text: markdown.text,
        };
        try {
            let res = await handleApi(CreateSeasonService, dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Create season successfully !",
                });
                reSetValue();
            }
        } catch (err) {
            console.log(err);
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
                        className={cx("markdown")}
                        value={markdown.text}
                        style={{ height: "500px" }}
                        // onImageUpload={handleUploadImageMarkdown}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>

            <div className={cx("button-Create")}>
                <button onClick={handleCreateSeason}>Create</button>
            </div>
        </div>
    );
}
