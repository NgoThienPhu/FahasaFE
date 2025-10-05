export interface UpdateProfileRequest {
    fullName?: string;
    gender?: string;
    dateOfBirth?: string;
}

export interface ChangeEmailRequest {
    newEmail: string;
    otp: string;
    password: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: {
        id: string;
        email: string;
        isVerify: boolean;
    };
    phoneNumber: {
        id: string;
        phoneNumber: string;
        isVerify: boolean;
    };
    fullName: string;
    gender: string;
    dateOfBirth: string;
    isActived: boolean;
    isDeleted: boolean;
}

export interface Address {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

export interface CreateAddressRequest {
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}
