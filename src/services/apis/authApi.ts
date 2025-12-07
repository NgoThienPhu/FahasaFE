import apiClient from "./config";

interface LoginParams {
    username: string;
    password: string;
}

interface RegisterParams {
    name: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const authApi = {
    
    login(params: LoginParams) {
        return apiClient.post("/auth/login", params);
    },

    register(params: RegisterParams) {
        return apiClient.post("/auth/register", params);
    },

    getProfile() {
        return apiClient.get("/accounts/me");
    }

}

export default authApi;