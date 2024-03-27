import axios from "../axios";

export const getTicketService = (id) => {
    return axios.get(`/get-ticket?calendarId=${id}`);
};

export const createTicketService = (data) => {
    return axios.post("/create-ticket", data);
};
