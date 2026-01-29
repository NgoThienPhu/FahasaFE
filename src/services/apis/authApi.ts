import apiClient, { type APIResponse, type APISuccessResponse } from "./config";

interface LoginParams {
    username: string;
    password: string;
}

interface RegisterParams {
    fullName: string;
    username: string;
    phoneNumber: string;
    email: string;
    password: string;
}

interface Account {
    id: string;
    username: string;
    email: {
        email: string;
        isVerify: boolean;
    };
    phoneNumber: {
        phoneNumber: string;
        isVerify: boolean;
    }
    isActived: boolean;
    fullName: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponse { accessToken: string; }

interface RegisterResponse extends Account {}

interface RefreshTokenResponse extends LoginResponse {}

const authApi = {

    login(params: LoginParams): Promise<APISuccessResponse<LoginResponse>> {
        return apiClient.post("/auth/login", params, { withCredentials: true });
    },

    logout(): Promise<APISuccessResponse<APIResponse>> {
        return apiClient.post("/auth/logout", null, { withCredentials: true });
    },

    register(params: RegisterParams): Promise<APISuccessResponse<RegisterResponse>> {
        return apiClient.post("/auth/register", params);
    },

    refreshToken(): Promise<APISuccessResponse<RefreshTokenResponse>> {
        return apiClient.post("/auth/refresh", null, { withCredentials: true });
    },

    getProfile(): Promise<APISuccessResponse<Account>> {
        return apiClient.get("/accounts/me");
    },

};

export default authApi;