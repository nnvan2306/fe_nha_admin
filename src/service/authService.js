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
    return axios.patch("/update-name-user", data);
};

export const handleUpdateAvatarService = (data) => {
    return axios.patch("/update-avatar-user", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const handleRemoveAvatarService = (data) => {
    return axios.patch("/remove-avatar", data);
};
