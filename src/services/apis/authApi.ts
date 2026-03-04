import apiClient, { type APIResponse, type APISuccessResponse } from "./config";
import type { User } from "../entities/User";

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

interface LoginResponse { accessToken: string; }

interface RegisterResponse extends User {}

interface RefreshTokenResponse extends LoginResponse {}

interface VerifyResetTokenResponse {
    valid: boolean;
}

interface ResetPasswordParams {
    ressetPasswordToken: string;
    newPassword: string;
}

interface VerifyResetPasswordTokenParams {
    ressetPasswordToken: string;
}

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

    getProfile(): Promise<APISuccessResponse<User>> {
        return apiClient.get("/accounts/me");
    },

    verifyResetPasswordToken(resetPasswordToken: VerifyResetPasswordTokenParams): Promise<APISuccessResponse<VerifyResetTokenResponse>> {
        return apiClient.post("/auth/resset-password/verify", resetPasswordToken);
    },

    ressetPassword(params: ResetPasswordParams): Promise<APIResponse> {
        return apiClient.post("/auth/resset-password", params);
    },

};

export default authApi;