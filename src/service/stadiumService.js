import axios from "../axios";

export const createStadiumService = (data) => {
    return axios.post("/create-stadium", data);
};

export const getStadiumService = () => {
    return axios.get("/get-stadium");
};

export const deleteStadiumService = (id) => {
    return axios.delete(`/delete-stadium?id=${id}`);
};

export const updateStadiumService = (data) => {
    return axios.put("/update-stadium", data);
};
