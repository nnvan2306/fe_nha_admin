import axios from "../axios";

export const CreateSeasonService = (data) => {
    return axios.post("/create-season", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getSeasonService = ({ page, pageSize }) => {
    return axios.get(`/get-season?page=${page}&pageSize=${pageSize}`, {
        withCredentials: true,
    });
};

export const getAllSeasonService = () => {
    return axios.get("/get-season", {
        withCredentials: true,
    });
};

export const deleteSeasonService = (index) => {
    return axios.delete(`/delete-season?index=${index}`);
};

export const updateSeasonService = (data) => {
    return axios.put("/update-season", data);
};
