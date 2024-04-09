import axios from "../axios";

export const getTicketService = (id) => {
    return axios.get(`/get-ticket?calendarId=${id}`);
};

export const createTicketService = (data) => {
    return axios.post("/create-ticket", data, { withCredentials: true });
};

export const deleteTicketService = (tickets) => {
    return axios.delete(
        `/delete-ticket`,
        { data: tickets },
        { withCredentials: true }
    );
};

export const deleteAllTicketService = (calendarId) => {
    return axios.delete(`/delete-all-ticket?calendarId=${calendarId}`, {
        withCredentials: true,
    });
};

export const handleUpdateTicketService = (data) => {
    return axios.put("/update-ticket", data, { withCredentials: true });
};
