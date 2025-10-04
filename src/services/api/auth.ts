import type { ApiResponse } from '../types/api';
import type { AuthResponse, LoginRequest, OtpRequest, RegisterRequest } from '../types/auth';
import { api } from './client';

export const authApi = {
    login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data, { withCredentials: true });
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>('/auth/register', data);
        return response.data;
    },

    sendOtp: async (data: OtpRequest): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>(`/auth/send-otp?toEmail=${data.email}`);
        return response.data;
    },

    verifyOtp: async (data: { email: string; otp: string }): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>('/emails/verify-otp', data);
        return response.data;
    },

    refreshToken: async (): Promise<ApiResponse<{ newAccessToken: string }>> => {
        const response = await api.post<ApiResponse<{ newAccessToken: string }>>('/auth/refresh');
        return response.data;
    },

    logout: async (): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>('/auth/logout');
        return response.data;
    },
};
