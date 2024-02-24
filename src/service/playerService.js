import axios from "../axios";

export const createPlayerService = (data) => {
    return axios.post("/create-player", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
