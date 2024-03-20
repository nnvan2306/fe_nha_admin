import axios from "../axios";

export const handleGetScored = (matchId) => {
    return axios.get(`/get-scored?matchId=${matchId}`);
};
