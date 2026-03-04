import type { BaseEntity } from "../entities/BaseEntity";

export interface Address extends BaseEntity {
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault?: boolean;
}