import classNames from "classnames/bind";
import styles from "./CreateStadium.module.scss";
import { RouterDTO } from "../../../../utils/routes.dto";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
    createStadiumService,
    updateStadiumService,
} from "../../../../service/stadiumService";
import { useLocation, useNavigate } from "react-router-dom";
import handleValidateImage from "../../../../helps/handleValidate";
import { BASE_URL } from "../../../../utils/constants";
import { handleApi } from "../../../../service/handleApi";
const cx = classNames.bind(styles);

export default function CreateStadium() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [locationStadium, setLocationStadium] = useState("");
    const [id, setId] = useState(0);
    const [stadiumImage, setStadiumImage] = useState(null);
    const [stadiumImagePreview, setStadiumImagePreview] = useState("");
    const [isChangeFileUpdate, setIsChangeFileUpdate] = useState(false);
    const [imageRevalueUrl, setImageReValueUrl] = useState("");

    const location = useLocation().pathname;
    const { state } = useLocation();
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (location === RouterDTO.stadium.update) {
            setName(state.name);
            setId(state.id);
            setLocationStadium(state.location);
            setStadiumImagePreview(`${BASE_URL}${state.stadiumImage_url}`);
            setImageReValueUrl(state.stadiumImage_url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const handleChooseFile = () => {
        const input = ref.current;
        if (input) {
            input.click();
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (handleValidateImage(file)) {
            setStadiumImagePreview(URL.createObjectURL(file));
            setStadiumImage(file);
            setIsChangeFileUpdate(true);
        }
    };

    const handleValidate = () => {
        if (!name || !locationStadium) {
            Swal.fire({
                icon: "warning",
                title: "please enter infomation !",
            });
            return false;
        }

        if (location === RouterDTO.stadium.update) {
            if (isChangeFileUpdate) {
                if (!stadiumImage) {
                    Swal.fire({
                        icon: "warning",
                        title: "please enter infomation !",
                    });
                    return false;
                }
            }
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
            name: name,
            location: locationStadium,
            file: stadiumImage,
        };

        try {
            let res = await handleApi(createStadiumService, dataBuider);

            if (res.errorCode === 0) {
                Swal.fire({
                    icon: "success",
                    title: res?.message,
                });
                setName(0);
                setLocationStadium("");
                setStadiumImage(null);
                setStadiumImagePreview("");
                ref.current.value = null;
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error service please try again !",
            });
        }

        setIsLoading(false);
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        let check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            id: id,
            name: name,
            location: locationStadium,
            isChangeFile: isChangeFileUpdate,
        };

        if (isChangeFileUpdate) {
            dataBuider.stadiumImage_url = imageRevalueUrl;
            dataBuider.file = stadiumImage;
        }

        try {
            let res = await handleApi(updateStadiumService, dataBuider);
            if (res.errorCode === 0) {
                setIsLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "update successfully ",
                });
                setStadiumImage(null);
                ref.current.value = null;
                navigate(RouterDTO.stadium.allStadium);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "error from server please try again !",
            });
        }
    };

    return (
        <div className={cx("form-create", "container")}>
            <div className={cx("row")}>
                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-upload-image")}>
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            hidden
                            ref={ref}
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
                                    stadiumImagePreview
                                        ? stadiumImagePreview
                                        : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className={cx("col-12", "col-md-6")}>
                    <div className={cx("form-input")}>
                        <label htmlFor="name">Name</label> <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={cx("form-input")}>
                        <label htmlFor="location">Location</label> <br />
                        <input
                            type="text"
                            id="location"
                            value={locationStadium}
                            onChange={(e) => setLocationStadium(e.target.value)}
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
                                    location === RouterDTO.stadium.update
                                        ? handleUpdate
                                        : handleCreate
                                }
                            >
                                {location === RouterDTO.stadium.update
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
