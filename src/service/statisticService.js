import axios from "../axios";

export const getStatisticService = (id) => {
    return axios.get(`/get-statistic-player?id=${id}`);
};

export const createStatisticService = (data) => {
    return axios.post("/create-statistic", data);
};

export const updateStatisticService = (data) => {
    return axios.put("/update-statistic", data);
};
