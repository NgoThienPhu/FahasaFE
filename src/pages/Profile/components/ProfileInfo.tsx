import React from "react";
import { FiUser, FiMail, FiPhone, FiEdit2, FiCheck, FiAlertCircle } from "react-icons/fi";
import styles from "./ProfileInfo.module.css";

interface User {
    id: string;
    username: string;
    fullName: string;
    dateOfBirth: string | null;
    gender: "MALE" | "FEMALE" | "OTHER";
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
    editMode: "email" | "phone" | "basicInfo" | null;
    editValues: {
        email: string;
        phone: string;
        fullName: string;
        dateOfBirth: string;
        gender: "MALE" | "FEMALE" | "OTHER";
    };
    isLoading: boolean;
    onEditModeChange: (mode: "email" | "phone" | "basicInfo" | null) => void;
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
    const getFieldError = (fieldName: string): string | null => {
        if (fieldName === "fullName") {
            if (!editValues.fullName || !editValues.fullName.trim()) {
                return "Họ và tên không được để trống";
            }
        }
        if (fieldName === "dateOfBirth") {
            if (!editValues.dateOfBirth || !editValues.dateOfBirth.trim()) {
                return "Ngày sinh không được để trống";
            }
            const dob = new Date(editValues.dateOfBirth);
            const today = new Date();
            dob.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            if (dob >= today) {
                return "Ngày sinh phải trước ngày hiện tại";
            }
        }
        return null;
    };

    const isFormValid = () => {
        return (
            !getFieldError("fullName") &&
            !getFieldError("dateOfBirth")
        );
    };

    const hasBasicInfoChanged = () => {
        const origFullName = (user.fullName || "").trim();
        const currFullName = (editValues.fullName || "").trim();
        const origDob = user.dateOfBirth || "";
        const currDob = editValues.dateOfBirth || "";
        const origGender = user.gender;
        const currGender = editValues.gender;
        return currFullName !== origFullName || currDob !== origDob || currGender !== origGender;
    };

    const handleSaveBasicInfo = async () => {
        if (!hasBasicInfoChanged()) {
            onEditModeChange(null);
            onEditValuesChange({
                ...editValues,
                fullName: user.fullName,
                dateOfBirth: user.dateOfBirth || "",
                gender: user.gender,
            });
            return;
        }
        await onEditSave();
    };

    const handleSaveEmail = async () => {
        const orig = (user.email.email || "").trim();
        const curr = (editValues.email || "").trim();
        if (orig === curr) {
            onEditModeChange(null);
            onEditValuesChange({ ...editValues, email: user.email.email });
            return;
        }
        await onEditSave();
    };

    const handleSavePhone = async () => {
        const orig = (user.phoneNumber.phoneNumber || "").trim();
        const curr = (editValues.phone || "").trim();
        if (orig === curr) {
            onEditModeChange(null);
            onEditValuesChange({ ...editValues, phone: user.phoneNumber.phoneNumber });
            return;
        }
        await onEditSave();
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.section}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            <span className={styles.sectionHeaderIcon}><FiUser /></span>
                            Thông tin cơ bản
                        </h2>
                        {editMode !== "basicInfo" && (
                            <button className={styles.editButton} onClick={() => onEditModeChange("basicInfo")}>
                                <FiEdit2 size={16} /> Chỉnh sửa
                            </button>
                        )}
                    </div>
                    <div className={styles.sectionBody}>
                {editMode === "basicInfo" ? (
                    <div className={styles.basicInfoGrid}>
                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Tên đầy đủ</label>
                            <input
                                type="text"
                                className={`${styles.editInput} ${getFieldError("fullName") ? styles.inputError : ""}`}
                                value={editValues.fullName}
                                onChange={(e) => onEditValuesChange({ ...editValues, fullName: e.target.value })}
                                disabled={isLoading}
                                placeholder="Nhập họ và tên"
                            />
                            {getFieldError("fullName") && (
                                <span className={styles.fieldError}>{getFieldError("fullName")}</span>
                            )}
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Tên tài khoản</label>
                            <p className={styles.value}>{user.username}</p>
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Ngày sinh</label>
                            <input
                                type="date"
                                className={`${styles.editInput} ${getFieldError("dateOfBirth") ? styles.inputError : ""}`}
                                value={editValues.dateOfBirth}
                                onChange={(e) => onEditValuesChange({ ...editValues, dateOfBirth: e.target.value })}
                                disabled={isLoading}
                            />
                            {getFieldError("dateOfBirth") && (
                                <span className={styles.fieldError}>{getFieldError("dateOfBirth")}</span>
                            )}
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Giới tính</label>
                            <select
                                className={styles.editInput}
                                value={editValues.gender}
                                onChange={(e) => onEditValuesChange({ ...editValues, gender: e.target.value as "MALE" | "FEMALE" | "OTHER" })}
                                disabled={isLoading}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className={styles.basicInfoGrid}>
                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Tên đầy đủ</label>
                            <p className={styles.value}>{user.fullName}</p>
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Tên tài khoản</label>
                            <p className={styles.value}>{user.username}</p>
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Ngày sinh</label>
                            <p className={styles.value}>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN') : "Chưa cập nhật"}</p>
                        </div>

                        <div className={styles.infoGroup}>
                            <label className={styles.label}>Giới tính</label>
                            <p className={styles.value}>
                                {user.gender === "MALE" ? "Nam" : user.gender === "FEMALE" ? "Nữ" : "Khác"}
                            </p>
                        </div>
                    </div>
                )}

                {editMode === "basicInfo" && (
                    <div className={styles.editActions}>
                        <button
                            className={styles.btnSave}
                            onClick={handleSaveBasicInfo}
                            disabled={isLoading || !isFormValid()}
                        >
                            {isLoading ? "Đang lưu..." : "Lưu"}
                        </button>
                        <button
                            className={styles.btnCancel}
                            onClick={() => {
                                onEditModeChange(null);
                                onEditValuesChange({
                                    ...editValues,
                                    fullName: user.fullName,
                                    dateOfBirth: user.dateOfBirth || "",
                                    gender: user.gender,
                                });
                            }}
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                    </div>
                )}

                <div className={`${styles.infoGroup} ${styles.idGroup}`}>
                    <label className={styles.label}>ID tài khoản</label>
                    <p className={styles.value}>{user.id}</p>
                </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            <span className={styles.sectionHeaderIcon}><FiMail /></span>
                            Email
                        </h2>
                    </div>
                    <div className={styles.sectionBody}>
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
                                <button className={styles.btnSave} onClick={handleSaveEmail} disabled={isLoading}>
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
                                        {user.email.isVerify ? <><FiCheck size={12} /> Xác nhận</> : <><FiAlertCircle size={12} /> Chưa xác nhận</>}
                                    </span>
                                </div>
                                <button className={styles.editIconBtn} onClick={() => onEditModeChange("email")} title="Chỉnh sửa">
                                    <FiEdit2 size={18} />
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
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2>
                            <span className={styles.sectionHeaderIcon}><FiPhone /></span>
                            Số điện thoại
                        </h2>
                    </div>
                    <div className={styles.sectionBody}>
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
                                <button className={styles.btnSave} onClick={handleSavePhone} disabled={isLoading}>
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
                                        {user.phoneNumber.isVerify ? <><FiCheck size={12} /> Xác nhận</> : <><FiAlertCircle size={12} /> Chưa xác nhận</>}
                                    </span>
                                </div>
                                <button className={styles.editIconBtn} onClick={() => onEditModeChange("phone")} title="Chỉnh sửa">
                                    <FiEdit2 size={18} />
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
            </div>
        </div>
    );
};

export default ProfileInfo;
