import type { ApiResponse } from '../types/api';
import type { AuthResponse, LoginRequest, OtpRequest, RegisterRequest } from '../types/auth';
import { api } from '../config/config';

export const authApi = {
    login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
        const response = await api.post('/auth/login', data, { withCredentials: true });
        return response.data as ApiResponse<AuthResponse>;
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<void>> => {
        const response = await api.post('/auth/register', data);
        return response.data as ApiResponse<void>;
    },

    sendOtp: async (data: OtpRequest): Promise<ApiResponse<void>> => {
        const response = await api.post(`/auth/send-otp?toEmail=${data.email}`);
        return response.data as ApiResponse<void>;
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<ApiResponse<void>> => {
        const response = await api.post('/emails/verify-otp', data);
        return response.data as ApiResponse<void>;
    },

    refreshToken: async (): Promise<ApiResponse<{ newAccessToken: string }>> => {
        const response = await api.post('/auth/refresh');
        return response.data as ApiResponse<{ newAccessToken: string }>;
    },

    logout: async (): Promise<ApiResponse<void>> => {
        const response = await api.post('/auth/logout');
        return response.data as ApiResponse<void>;
    },
};
