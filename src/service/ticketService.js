import axios from "../axios";

export const getTicketService = (id) => {
    return axios.get(`/get-ticket?calendarId=${id}`);
};

export const createTicketService = (data) => {
    return axios.post("/create-ticket", data);
};

export const deleteTicketService = (id) => {
    return axios.delete(`/delete-ticket?id=${id}`);
};

export const bookingTicketService = (data) => {
    return axios.patch("/update-ticket", data);
};
