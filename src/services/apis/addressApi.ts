import apiClient, { type APIResponse, type APISuccessResponse } from "./config";

export interface Address {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault?: boolean;
}

interface CreateAddressParams extends Omit<Address, "id"> {}

export interface UpdateAddressParams extends Omit<Address, "id"> {}

const addressApi = {

    getAddresses(): Promise<APISuccessResponse<APISuccessResponse<Address[]>>> {
        return apiClient.get(`/accounts/me/addresses`);
    },

    addAddress(params: CreateAddressParams): Promise<APISuccessResponse<Address>> {
        return apiClient.post(`/accounts/me/addresses`, params);
    },

    updateAddress(addressId: string, params: UpdateAddressParams): Promise<APISuccessResponse<Address>> {
        return apiClient.put(`/accounts/me/addresses/${addressId}`, params);
    },

    deleteAddress(addressId: string): Promise<APIResponse> {
        return apiClient.delete(`/accounts/me/addresses/${addressId}`);
    }

}

export default addressApi;