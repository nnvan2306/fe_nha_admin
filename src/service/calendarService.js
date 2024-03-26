import axios from "../axios";

export const createCalendarService = (data) => {
    return axios.post("/create-calendar", data);
};

export const getCalendarService = (hostId, guestId) => {
    return axios.get(`/get-calendar?hostId=${hostId}&guestId=${guestId}`);
};
