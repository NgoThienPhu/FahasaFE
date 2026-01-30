import apiClient, { type APISuccessResponse } from "./config";

export interface Address {
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault?: boolean;
}

interface createAddressParams extends Address {}



const addressApi = {

    getAddresses(): Promise<APISuccessResponse<APISuccessResponse<Address[]>>> {
        return apiClient.get(`/accounts/me/addresses`);
    },

    addAddress(params: createAddressParams): Promise<APISuccessResponse<Address>> {
        return apiClient.post(`/accounts/me/addresses`, params);
    },

}

export default addressApi;