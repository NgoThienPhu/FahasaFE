import React from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./ProfileInfo.module.css";

interface User {
    id: string;
    username: string;
    fullName: string;
    email: {
        email: string;
        isVerify: boolean;
    };
    phoneNumber: {
        phoneNumber: string;
        isVerify: boolean;
    };
    isActived: boolean;
}

interface ProfileInfoProps {
    user: User;
    editMode: "email" | "phone" | null;
    editValues: {
        email: string;
        phone: string;
    };
    isLoading: boolean;
    onEditModeChange: (mode: "email" | "phone" | null) => void;
    onEditValuesChange: (values: any) => void;
    onEditSave: () => Promise<void>;
    onSendCode: (type: "email" | "phone") => Promise<void>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    user,
    editMode,
    editValues,
    isLoading,
    onEditModeChange,
    onEditValuesChange,
    onEditSave,
    onSendCode,
}) => {
    

    return (
        <div className={styles.tabContent}>
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Thông tin cơ bản</h2>
                </div>

                <div className={styles.infoGroup}>
                    <label className={styles.label}>ID tài khoản</label>
                    <p className={styles.value}>{user.id}</p>
                </div>

                <div className={styles.infoGroup}>
                    <span className={styles.label}>Tên đầy đủ</span>
                    <p className={styles.value}>{user.fullName}</p>
                </div>

                <div className={styles.infoGroup}>
                    <label className={styles.label}>Tên tài khoản</label>
                    <p className={styles.value}>{user.username}</p>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Email</h2>
                </div>
                <div className={styles.infoGroup}>
                    <label className={styles.label}>Địa chỉ email</label>
                    {editMode === "email" ? (
                        <div className={styles.editGroup}>
                            <input
                                type="email"
                                className={styles.editInput}
                                value={editValues.email}
                                onChange={(e) => onEditValuesChange({ ...editValues, email: e.target.value })}
                                disabled={isLoading}
                            />
                            <div className={styles.editActions}>
                                <button className={styles.btnSave} onClick={onEditSave} disabled={isLoading}>
                                    Lưu
                                </button>
                                <button
                                    className={styles.btnCancel}
                                    onClick={() => {
                                        onEditModeChange(null);
                                        onEditValuesChange({ ...editValues, email: user.email.email });
                                    }}
                                    disabled={isLoading}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.verificationGroup}>
                            <div className={styles.editableValue}>
                                <div className={styles.valueWithBadge}>
                                    <p className={styles.value}>{user.email.email}</p>
                                    <span className={`${styles.badge} ${user.email.isVerify ? styles.verified : styles.unverified}`}>
                                        {user.email.isVerify ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                    </span>
                                </div>
                                <button className={styles.editIconBtn} onClick={() => onEditModeChange("email")}>
                                    <FaEdit />
                                </button>
                            </div>
                            {!user.email.isVerify && (
                                <button className={styles.verifyBtn} onClick={() => onSendCode("email")} disabled={isLoading}>
                                    Xác thực ngay
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Số điện thoại</h2>
                </div>
                <div className={styles.infoGroup}>
                    <label className={styles.label}>Số điện thoại</label>
                    {editMode === "phone" ? (
                        <div className={styles.editGroup}>
                            <input
                                type="tel"
                                className={styles.editInput}
                                value={editValues.phone}
                                onChange={(e) => onEditValuesChange({ ...editValues, phone: e.target.value })}
                                disabled={isLoading}
                            />
                            <div className={styles.editActions}>
                                <button className={styles.btnSave} onClick={onEditSave} disabled={isLoading}>
                                    Lưu
                                </button>
                                <button
                                    className={styles.btnCancel}
                                    onClick={() => {
                                        onEditModeChange(null);
                                        onEditValuesChange({ ...editValues, phone: user.phoneNumber.phoneNumber });
                                    }}
                                    disabled={isLoading}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.verificationGroup}>
                            <div className={styles.editableValue}>
                                <div className={styles.valueWithBadge}>
                                    <p className={styles.value}>{user.phoneNumber.phoneNumber}</p>
                                    <span className={`${styles.badge} ${user.phoneNumber.isVerify ? styles.verified : styles.unverified}`}>
                                        {user.phoneNumber.isVerify ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                    </span>
                                </div>
                                <button className={styles.editIconBtn} onClick={() => onEditModeChange("phone")}>
                                    <FaEdit />
                                </button>
                            </div>
                            {!user.phoneNumber.isVerify && (
                                <button className={styles.verifyBtn} onClick={() => onSendCode("phone")} disabled={isLoading}>
                                    Xác thực ngay
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
