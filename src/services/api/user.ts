import type { ApiResponse } from '../types/api';
import type { UpdateProfileRequest, UserProfile } from '../types/auth';
import { api } from './client';

export const userApi = {
    updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> => {
        const response = await api.put<ApiResponse<UserProfile>>('/accounts/me', data);
        return response.data;
    },

    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await api.get<ApiResponse<UserProfile>>('/accounts/me');
        return response.data;
    },
};
