export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    otpCode: string;
}

export interface OtpRequest {
    email: string;
}

export interface AuthResponse {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    isVerified: boolean;
}