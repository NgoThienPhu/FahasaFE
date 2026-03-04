import type { BaseEntity } from "./BaseEntity";

export interface User extends BaseEntity {
  username: string;
  fullName: string;
  dateOfBirth: string | null;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: {
    email: string;
    isVerify: boolean;
  }
  phoneNumber: {
    phoneNumber: string;
    isVerify: boolean;
  }
  isActived: boolean;
}