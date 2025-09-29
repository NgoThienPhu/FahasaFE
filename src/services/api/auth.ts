import type { ApiResponse } from '../types/api';
import type { AuthResponse, LoginRequest, OtpRequest, RegisterRequest, UserProfile } from '../types/auth';
import { api } from './client';

export const authApi = {
    login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data, { withCredentials: true });
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
        return response.data;
    },

    sendOtp: async (data: OtpRequest): Promise<ApiResponse<{ message: string }>> => {
        const response = await api.post<ApiResponse<{ message: string }>>(`/auth/send-otp?toEmail=${data.email}`);
        return response.data;
    },

    verifyOtp: async (data: { email: string; otpCode: string }): Promise<ApiResponse<{ verified: boolean }>> => {
        const response = await api.post<ApiResponse<{ verified: boolean }>>('/auth/verify-otp', data);
        return response.data;
    },

    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await api.get<ApiResponse<UserProfile>>('/accounts/me');
        return response.data;
    },

    refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
        const response = await api.post<ApiResponse<{ token: string }>>('/auth/refresh');
        return response.data;
    },

    logout: async (): Promise<ApiResponse<{ message: string }>> => {
        const response = await api.post<ApiResponse<{ message: string }>>('/auth/logout');
        return response.data;
    },
};
