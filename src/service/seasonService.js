import axios from "../axios";

export const CreateSeasonService = (data) => {
    return axios.post("/create-season", data);
};

export const getAllSeasonService = ({ page, pageSize }) => {
    return axios.get(`/get-season?page=${page}&pageSize=${pageSize}`);
};

export const deleteSeasonService = (index) => {
    return axios.delete(`/delete-season?index=${index}`);
};

export const updateSeasonService = (data) => {
    return axios.put("/update-season", data);
};
