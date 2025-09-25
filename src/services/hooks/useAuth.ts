import { useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import type { RegisterRequest, UserProfile } from '../types/auth';
import axios from 'axios';

export const useAuth = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await authApi.getProfile();
                    if (response.success) {
                        setUser(response.data);
                    }
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('accessToken');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.login({ username, password });

            if (response.success) {
                localStorage.setItem('accessToken', response.data.accessToken);
                return { success: true };
            } else {
                setError(response.message || 'Đăng nhập thất bại');
                return { success: false, error: response.message };
            }
        } catch (err: unknown) {
            let errorMessage = 'Đăng nhập thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: RegisterRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.register(userData);

            if (response.success) {
                return { success: true };
            } else {
                setError(response.message || 'Đăng kí thất bại');
                return { success: false, error: response.message };
            }
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

    const logout = async () => {
        try {
            setLoading(true);
            await authApi.logout();
        } catch (err) {
            console.error('Lỗi đăng xuất:', err);
        } finally {
            localStorage.removeItem('accessToken');
            setUser(null);
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

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        sendOtp,
        isAuthenticated: !!user,
    };
};
