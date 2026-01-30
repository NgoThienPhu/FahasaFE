import type { User } from "./authApi";
import apiClient, { type APIResponse, type APISuccessResponse } from "./config";

interface changeEmailParams {
    newEmail: string;
    password: string;
}

interface UpdateBasicInfoParams {
    fullName: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE" | "OTHER";
}

export interface CreateAddressRequestDTO {
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault?: boolean;
}

const userApi = {

    changeEmail(params: changeEmailParams): Promise<APIResponse> {
        return apiClient.post(`/accounts/me/change-email`, params);
    },

    changeInfo(params: UpdateBasicInfoParams): Promise<APISuccessResponse<User>> {
        return apiClient.put(`/accounts/me`, params);
    },

    createAddress(params: CreateAddressRequestDTO): Promise<APISuccessResponse<any>> {
        return apiClient.post(`/accounts/me/addresses`, params);
    },

    getAddresses(): Promise<APISuccessResponse<any[]>> {
        return apiClient.get(`/accounts/me/addresses`);
    }

}

export default userApi;