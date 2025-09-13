export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    fullName: string;
    email: string;
    otpCode: string;
    phoneNumber: string;
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