import axios from "../axios";

export const createRatingService = (data) => {
    return axios.post("/create-rating", data);
};

export const getRatingService = (id) => {
    return axios.get(`/get-rating?seasonId=${id}`);
};

export const deleteRatingService = (id) => {
    return axios.delete(`/delete-rating?id=${id}`);
};
