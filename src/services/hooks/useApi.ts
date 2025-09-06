import { useState, useCallback } from 'react';
import axios from 'axios';
import type { ApiResponse } from '../types/api';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async <T = unknown>(
        apiCall: () => Promise<ApiResponse<T>>
    ): Promise<{ success: boolean; data?: T; error?: string }> => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiCall();

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                setError(response.message || 'API call failed');
                return { success: false, error: response.message };
            }
        } catch (err: unknown) {
            let errorMessage = 'API call failed';

            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        execute,
    };
};
