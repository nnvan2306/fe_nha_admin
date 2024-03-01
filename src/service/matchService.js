import axios from "../axios";

export const getMatchService = () => {
    return axios.get("/get-match", {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
