import axios from "../axios";

export const handleCreateStandService = (listStand) => {
    return axios.post("/create-stand", listStand);
};
