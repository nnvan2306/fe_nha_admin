import axios from "../axios";

export const createTeamService = (data) => {
    return axios.post("/create-team", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
