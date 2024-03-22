import axios from "../axios";

export const handleGetScored = (matchId) => {
    return axios.get(`/get-scored?matchId=${matchId}`);
};

export const handleCreateScoredService = (data) => {
    return axios.post("/create-scored", data);
};
