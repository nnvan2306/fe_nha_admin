/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "./ModalUpdate.module.scss";
import { memo, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Swal from "sweetalert2";
import { updateSeasonService } from "../../../../../service/seasonService";

const cx = classNames.bind(styles);
const mdParser = new MarkdownIt(/* Markdown-it options */);

const ModalUpdate = memo(function ModalUpdate({
    infoSeason,
    funcClose,
    funcReLoad,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(infoSeason?.index);
    const [name, setName] = useState(infoSeason?.name);
    const [markdown, setMarkdown] = useState({
        text: infoSeason?.des_text,
        html: infoSeason?.html,
    });

    function handleEditorChange({ html, text }) {
        setMarkdown({ html: html, text: text });
    }

    const handleCloseModal = () => {
        funcClose();
    };

    const handleValidate = () => {
        if (!index || !name || !markdown.html || !markdown.text) {
            Swal.fire({
                icon: "warning",
                title: "Please enter complete information !",
            });
            return false;
        }

        return true;
    };

    const handleUpdateSeason = async () => {
        setIsLoading(true);
        const check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            id: infoSeason?.id,
            index: index,
            name: name,
            description: markdown.html,
            des_text: markdown.text,
        };

        console.log(dataBuider);
        try {
            let res = await updateSeasonService(dataBuider);
            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: "update season successfully",
                });
                handleCloseModal();
                funcReLoad();
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                text: "error occurred. Please try again later !",
            });
        }
        setIsLoading(false);
    };

    return (
        <div className={cx("form-update")}>
            <div className={cx("button-close")} onClick={handleCloseModal}>
                <i className="bi bi-x-circle"></i>
            </div>
            <h4>Update Season</h4>

            <div className={cx("form-input")}>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx("col-12", "col-md-6", "form-col")}>
                            <label htmlFor="">Index</label> <br />
                            <input
                                type="number"
                                value={index}
                                onChange={(e) => setIndex(e.target.value)}
                            />
                        </div>

                        <div className={cx("col-12", "col-md-6", "form-col")}>
                            <label htmlFor="">Name</label> <br />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={cx("form-markdown")}>
                        <MdEditor
                            value={markdown.text}
                            style={{ height: "500px" }}
                            // onImageUpload={handleUploadImageMarkdown}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>

            <div className={cx("button-edit")}>
                {isLoading ? (
                    <button
                        onClick={handleUpdateSeason}
                        disabled
                        className={cx("button-disabled")}
                    >
                        <div
                            className="spinner-border text-light"
                            role="status"
                        ></div>
                    </button>
                ) : (
                    <button onClick={handleUpdateSeason}>edit</button>
                )}
            </div>
        </div>
    );
});

export default ModalUpdate;
