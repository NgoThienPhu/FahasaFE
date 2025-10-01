import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void, reject: (error?: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

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
        console.error('Yêu cầu thất bại:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config || {};

        if (originalRequest.url && originalRequest.url.includes("/auth/login")) {
            return Promise.reject(error);
        }

        if (originalRequest.url && originalRequest.url.includes("/auth/refresh")) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: unknown) => {
                            if (typeof token === "string" && originalRequest.headers) {
                                originalRequest.headers["Authorization"] = "Bearer " + token;
                            }
                            resolve(apiClient(originalRequest));
                        },
                        reject: (err) => reject(err),
                    });
                });
            }

            isRefreshing = true;
            
            try {

                const res = await axios.post(`${API_BASE_URL}/auth/refresh`, null, { withCredentials: true });
                const newAccessToken = res.data.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);
                apiClient.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;

                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
                }

                return apiClient(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        if (error.response?.status === 403) {
            console.error('Yêu cầu bị từ chối');
        }

        if (error.response?.status >= 500) {
            console.error('Lỗi hệ thống:', error.response.data);
        }

        if (import.meta.env.DEV) {
            console.error('Lỗi API:', error.response?.status, error.response?.data);
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