import React, { useEffect } from "react";
import authApi from "../services/apis/authApi";

interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    isVeryfied: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuth: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if(accessToken) {
      async function loadUserProfile() {
         const myUser = await authApi.getProfile();
         setUser(myUser.data.data);
      }
      loadUserProfile();
    }
    
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