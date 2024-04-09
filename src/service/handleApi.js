import { handleLogoutService, refreshTokenService } from "./authService";

export async function handleApi(api, data = null) {
    try {
        return await api(data);
    } catch (error) {
        if (error.response.status === 401) {
            try {
                await refreshTokenService();
                return await api(data);
            } catch (err) {
                console.log("err refresh token");
                await handleLogoutService();
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(error);
        }
    }
}
