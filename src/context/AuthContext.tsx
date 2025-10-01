import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api/auth';
import type { UserProfile } from '../services/types/auth';
import axios from 'axios';

type AuthContextValue = {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await authApi.getProfile();
                    if (response.success) {
                        setUser(response.data);
                    }
                }
            } catch (err) {
                console.error('Auth check failed:', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const refreshProfile = async () => {
        try {
            const response = await authApi.getProfile();
            if (response.success) {
                setUser(response.data);
            }
        } catch (err) {
            console.error('Refresh profile failed:', err);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.login({ username, password });

            if (response.success) {
                localStorage.setItem('accessToken', response.data.accessToken);
                await refreshProfile();
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

    const value: AuthContextValue = useMemo(() => ({
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        refreshProfile,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};


