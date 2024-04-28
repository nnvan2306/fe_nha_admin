import axios from "../axios";

export const RegisterService = (data) => {
    return axios.post("/register", data);
};

export const handleLoginService = (data) => {
    return axios.post("/login", data, {
        withCredentials: true,
    });
};

export const refreshTokenService = () => {
    return axios.get("/refresh-token", {
        withCredentials: true,
    });
};

export const handleLogoutService = () => {
    return axios.post("/logout", {
        withCredentials: true,
    });
};

export const handleCheckRoleService = () => {
    return axios.post("/check-role-admin", {
        withCredentials: true,
    });
};

export const handleUpdateUserService = (data) => {
    return axios.put("/update-user", data);
};

export const handleUpdateAvatarService = (data) => {
    return axios.put("/update-avatar-user", data);
};
