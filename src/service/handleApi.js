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
                console.log(err);
                await handleLogoutService();
            }
        } else {
            console.log("err");
            return Promise.reject(error);
        }
    }
}
