import axios from "../axios";

export const handleCreateStandService = (listStand) => {
    console.log(listStand);
    return axios.post("/create-stand", listStand);
};

export const handleGetStandService = (stadiumId) => {
    return axios.get(`/get-stand?stadiumId=${stadiumId}`);
};

export const handleDeleteStandService = (stands) => {
    return axios.delete(`/delete-stand`, { data: stands });
};

export const handleUpdateStandService = (stand) => {
    return axios.put("/update-stand", stand);
};
