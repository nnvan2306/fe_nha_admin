import axios from "../axios";

export const createPlayerService = (data) => {
    return axios.post("/create-player", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getPlayerService = ({ page, pageSize }) => {
    return axios.get(`/get-player?page=${page}&pageSize=${pageSize}`);
};

export const deletePlayerService = (code) => {
    return axios.delete(`/delete-player?code=${code}`);
};

export const updatePlayerService = (data) => {
    return axios.put("/update-player", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
