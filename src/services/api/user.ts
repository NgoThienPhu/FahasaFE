import type { ApiResponse } from '../types/api';
import type { UpdateProfileRequest, UserProfile, ChangeEmailRequest, CreateAddressRequest, Address } from '../types/user';
import { api } from '../config/config';

export const userApi = {
    updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> => {
        const response = await api.put('/accounts/me', data);
        return response.data as ApiResponse<UserProfile>;
    },

    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await api.get('/accounts/me');
        return response.data as ApiResponse<UserProfile>;
    },

    changeEmail: async (data: ChangeEmailRequest): Promise<ApiResponse<void>> => {
        const response = await api.post('/accounts/me/change-email', data);
        return response.data as ApiResponse<void>;
    },

    addAddress: async (data: CreateAddressRequest): Promise<ApiResponse<Address>> => {
        const response = await api.post('/accounts/me/addresses', data);
        return response.data as ApiResponse<Address>;
    },

    getAddresses: async (): Promise<ApiResponse<Address[]>> => {
        const response = await api.get('/accounts/me/addresses');
        return response.data as ApiResponse<Address[]>;
    },

    getAddressById: async (addressId: string): Promise<ApiResponse<Address>> => {
        const response = await api.get(`/accounts/me/addresses/${addressId}`);
        return response.data as ApiResponse<Address>;
    },

    updateAddress: async (addressId: string, data: CreateAddressRequest): Promise<ApiResponse<Address>> => {
        const response = await api.put(`/accounts/me/addresses/${addressId}`, data);
        return response.data as ApiResponse<Address>;
    },

    deleteAddress: async (addressId: string): Promise<ApiResponse<void>> => {
        const response = await api.delete(`/accounts/me/addresses/${addressId}`);
        return response.data as ApiResponse<void>;
    },

    setDefaultAddress: async (addressId: string): Promise<ApiResponse<Address>> => {
        const response = await api.patch(`/accounts/me/addresses/${addressId}/set-default`);
        return response.data as ApiResponse<Address>;
    },
};
