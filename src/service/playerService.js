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

export const searchPlayerService = (q) => {
    return axios.get(`/search-player?q=${q}`);
};

export const getPlayerDetailSeasonService = (hostId, guestId) => {
    return axios.get(`/get-player-season?hostId=${hostId}&guestId=${guestId}`);
};

export const deletePlayerService = (id) => {
    return axios.delete(`/delete-player?ids=${id}`, {
        withCredentials: true,
    });
};

export const updatePlayerService = (data) => {
    return axios.put("/update-player", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
