import axios from "../axios";

export const createCalendarService = (data) => {
    return axios.post("/create-calendar", data, { withCredentials: true });
};

export const getCalendarService = (hostId, guestId) => {
    return axios.get(`/get-calender?hostId=${hostId}&guestId=${guestId}`);
};

export const deleteCalendarService = (id) => {
    return axios.delete(`/delete-calendar?id=${id}`, { withCredentials: true });
};

export const updateCalendarService = (data) => {
    return axios.put("/update-calendar", data, { withCredentials: true });
};
