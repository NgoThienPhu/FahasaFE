import apiClient, { type APIResponse } from "./config";

interface changeEmailParams {
    newEmail: string;
    password: string;
}

const userApi = {

    changeEmail(params: changeEmailParams): Promise<APIResponse> {
        return apiClient.post(`/accounts/me/change-email`, params);
    }

}

export default userApi;