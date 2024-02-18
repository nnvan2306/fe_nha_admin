import axios from "../axios";

export const uploadFileService = (data) => {
    return axios.post("/upload", data, {
        withCredentials: true,
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    });
};

export const getImageService = () => {
    return axios.get("/getImage", {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
