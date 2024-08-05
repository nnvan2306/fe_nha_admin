import axios from "axios";
import { BASE_URL_PRODUCT } from "./utils/constants";

const instance = axios.create({
    baseURL: BASE_URL_PRODUCT,
    withCredentials: true,
});

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code
    const { data } = response;
    return data;
});

export default instance;
