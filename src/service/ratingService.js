import axios from "../axios";

export const createRatingService = (data) => {
    return axios.post("/create-rating", data, { withCredentials: true });
};

export const getRatingService = (id) => {
    return axios.get(`/get-rating?seasonId=${id}`);
};

export const deleteRatingService = (id) => {
    return axios.delete(`/delete-rating?id=${id}`, { withCredentials: true });
};

export const updateRatingService = (data) => {
    return axios.put("/update-rating", data, { withCredentials: true });
};
