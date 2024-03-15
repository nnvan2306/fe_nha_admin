import { refreshTokenService } from "./authService";

export async function handleApi(api, data = null) {
    try {
        return await api(data);
    } catch (error) {
        if (error.response.status === 401) {
            await refreshTokenService();

            return await api(data);
        } else {
            console.log("err");
            return Promise.reject(error);
        }
    }
}
