import { useState } from 'react';
import { authApi } from '../api/auth';
import type { RegisterRequest } from '../types/auth';
import axios from 'axios';

export const useRegistration = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (userData: RegisterRequest) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authApi.register(userData);
            if (response.success) {
                return { success: true };
            }
            setError(response.message || 'Đăng kí thất bại');
            return { success: false, error: response.message };
        } catch (err: unknown) {
            let errorMessage = 'Đăng kí thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const sendOtp = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await authApi.sendOtp({ email });
            return { success: response.success, message: response.message };
        } catch (err: unknown) {
            let errorMessage = 'Lỗi gửi mã OTP';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { register, sendOtp, loading, error };
}


