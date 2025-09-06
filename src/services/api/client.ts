import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                }
            }
        }

        if (error.response?.status === 403) {
            console.error('🚫 Access denied');
        }

        if (error.response?.status >= 500) {
            console.error('🔥 Server error:', error.response.data);
        }

        if (import.meta.env.DEV) {
            console.error('❌ API Error:', error.response?.status, error.response?.data);
        }
        return Promise.reject(error);
    }
);

export const api = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
        apiClient.get(url, config),

    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
        apiClient.post(url, data, config),

    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
        apiClient.put(url, data, config),

    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
        apiClient.patch(url, data, config),

    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
        apiClient.delete(url, config),
};

export default apiClient;