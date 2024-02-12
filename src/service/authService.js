import axios from "../axios";

export const RegisterService = (data) => {
    return axios.post("/register", data);
};

export const handleLoginService = (data) => {
    return axios.post("/login", data, {
        withCredentials: true,
    });
};
