import axios from "../axios";

export const createTeamService = (data) => {
    return axios.post("/create-team", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getTeamservice = ({ page, pageSize }) => {
    return axios.get(`/get-team?page=${page}&pageSize=${pageSize}`);
};

export const deletTeameService = (code) => {
    return axios.delete(`/delete-team?code=${code}`);
};

export const updateTeamService = (data) => {
    return axios.put("/update-team", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
