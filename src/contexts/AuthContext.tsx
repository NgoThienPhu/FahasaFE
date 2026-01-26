import React, { useEffect } from "react";
import authApi from "../services/apis/authApi";

interface User {
  id: string;
  username: string;
  fullName: string;
  email: {
    email: string;
    isVerified: boolean;
  }
  phoneNumber: {
    phoneNumber: string;
    isVerified: boolean;
  }
  isActived: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
          const response = await authApi.getProfile();
          setUser({ ...response.data });
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const value: AuthContextType = {
    user,
    isAuth: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("Để sử dụng useAuth phải nằm bên trong AuthProvider");
  return context;
};