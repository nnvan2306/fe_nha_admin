import axios from "../axios";

// export const getMatchService = () => {
//     return axios.get("/get-match", {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     });
// };

export const createMatchService = (data) => {
    return axios.post("/create-match", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getMatchService = ({ page, pageSize, q = 0 }) => {
    return axios.get(`/get-match?page=${page}&pageSize=${pageSize}&q=${q}`);
};

export const deleteMatchService = (id) => {
    return axios.delete(`/delete-match?id=${id}`);
};

export const updateMatchService = (data) => {
    return axios.put("/update-match", data);
};
