import axios from "../axios";

export const handleCreateStandService = (listStand) => {
    return axios.post("/create-stand", listStand, { withCredentials: true });
};

export const handleGetStandService = (stadiumId) => {
    return axios.get(`/get-stand?stadiumId=${stadiumId}`);
};

export const handleDeleteStandService = (stands) => {
    return axios.delete(
        `/delete-stand`,
        { data: stands },
        { withCredentials: true }
    );
};

export const handleUpdateStandService = (stand) => {
    return axios.put("/update-stand", stand, { withCredentials: true });
};
