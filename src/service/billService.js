import axios from "../axios";

export const handleDeleteBilllService = (uuid) => {
    return axios.delete(`/delete-bill?uuid=${uuid}`);
};

export const handleGetBillService = ({ page, pageSize }) => {
    return axios.get(`/get-bill?page=${page}&pageSize=${pageSize}`);
};

export const handleUpdateActiveBillService = (data) => {
    return axios.patch(`/update-active-bill`, data, {
        withCredentials: true,
    });
};
