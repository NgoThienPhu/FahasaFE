import apiClient, { type APIResponse } from "./config";

interface VerifyOTPParams {
    otp: string;
    email: string;
}

const emailApi = {

    sendOTP(email: string): Promise<APIResponse> {
        return apiClient.get(`/emails/send-otp?toEmail=${email}`);
    },

    verifyOTP(params: VerifyOTPParams): Promise<APIResponse> {
        return apiClient.post("/emails/verify-otp", params);
    },

}

export default emailApi;