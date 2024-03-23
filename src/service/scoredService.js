import axios from "../axios";

export const handleGetScoredService = (matchId) => {
    return axios.get(`/get-scored?matchId=${matchId}`);
};

export const handleCreateScoredService = (data) => {
    return axios.post("/create-scored", data);
};

export const handleDeleteScoredService = (id) => {
    return axios.delete(`/delete-scored?id=${id}`);
};
