import React from "react";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiEdit2,
    FiCheck,
    FiAlertCircle,
    FiHash,
    FiCalendar,
    FiShield,
    FiUsers,
} from "react-icons/fi";
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
    onEditValuesChange: (values: {
        email: string;
        phone: string;
        fullName: string;
        dateOfBirth: string;
        gender: "MALE" | "FEMALE" | "OTHER";
    }) => void;
    onEditSave: () => Promise<void>;
    onSendCode: (type: "email" | "phone") => Promise<void>;
}

function getInitials(fullName: string, username: string): string {
    const parts = (fullName || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (parts.length === 1 && parts[0].length >= 2) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    const u = (username || "U").slice(0, 2);
    return u.toUpperCase();
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
        if (fieldName === "email") {
            const v = (editValues.email || "").trim();
            if (!v) return "Vui lòng nhập email mới";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(v)) return "Email không hợp lệ";
        }
        return null;
    };

    const isFormValid = () => !getFieldError("fullName") && !getFieldError("dateOfBirth");

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
        if (getFieldError("email")) return;
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

    const genderLabel =
        user.gender === "MALE" ? "Nam" : user.gender === "FEMALE" ? "Nữ" : "Khác";

    return (
        <div className={styles.tabContent}>
            <header className={styles.profileHero}>
                <div className={styles.heroGlow} aria-hidden />
                <div className={styles.heroInner}>
                    <div className={styles.avatar} aria-hidden>
                        {getInitials(user.fullName, user.username)}
                    </div>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroName}>{user.fullName || user.username}</h1>
                        <p className={styles.heroUsername}>@{user.username}</p>
                        <div className={styles.heroMeta}>
                            <span
                                className={`${styles.statusPill} ${user.isActived ? styles.statusOn : styles.statusOff}`}
                            >
                                <FiShield size={13} aria-hidden />
                                {user.isActived ? "Tài khoản hoạt động" : "Tài khoản chưa kích hoạt"}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.section}>
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionHeaderIcon}>
                                <FiUser />
                            </span>
                            Thông tin cơ bản
                        </h2>
                        {editMode !== "basicInfo" && (
                            <button
                                type="button"
                                className={styles.editButton}
                                onClick={() => onEditModeChange("basicInfo")}
                            >
                                <FiEdit2 size={16} aria-hidden />
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                    <div className={styles.sectionBody}>
                        {editMode === "basicInfo" ? (
                            <div className={styles.basicInfoGrid}>
                                <div className={styles.infoGroup}>
                                    <label className={styles.label} htmlFor="pi-fullName">
                                        Họ và tên
                                    </label>
                                    <input
                                        id="pi-fullName"
                                        type="text"
                                        className={`${styles.editInput} ${getFieldError("fullName") ? styles.inputError : ""}`}
                                        value={editValues.fullName}
                                        onChange={(e) =>
                                            onEditValuesChange({ ...editValues, fullName: e.target.value })
                                        }
                                        disabled={isLoading}
                                        placeholder="Nhập họ và tên"
                                    />
                                    {getFieldError("fullName") && (
                                        <span className={styles.fieldError}>{getFieldError("fullName")}</span>
                                    )}
                                </div>

                                <div className={styles.infoGroup}>
                                    <label className={styles.label}>Tên đăng nhập</label>
                                    <div className={styles.readonlyBox}>{user.username}</div>
                                </div>

                                <div className={styles.infoGroup}>
                                    <label className={styles.label} htmlFor="pi-dob">
                                        Ngày sinh
                                    </label>
                                    <input
                                        id="pi-dob"
                                        type="date"
                                        className={`${styles.editInput} ${getFieldError("dateOfBirth") ? styles.inputError : ""}`}
                                        value={editValues.dateOfBirth}
                                        onChange={(e) =>
                                            onEditValuesChange({ ...editValues, dateOfBirth: e.target.value })
                                        }
                                        disabled={isLoading}
                                    />
                                    {getFieldError("dateOfBirth") && (
                                        <span className={styles.fieldError}>{getFieldError("dateOfBirth")}</span>
                                    )}
                                </div>

                                <div className={styles.infoGroup}>
                                    <label className={styles.label} htmlFor="pi-gender">
                                        Giới tính
                                    </label>
                                    <select
                                        id="pi-gender"
                                        className={styles.editInput}
                                        value={editValues.gender}
                                        onChange={(e) =>
                                            onEditValuesChange({
                                                ...editValues,
                                                gender: e.target.value as "MALE" | "FEMALE" | "OTHER",
                                            })
                                        }
                                        disabled={isLoading}
                                    >
                                        <option value="MALE">Nam</option>
                                        <option value="FEMALE">Nữ</option>
                                        <option value="OTHER">Khác</option>
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.displayGrid}>
                                <div className={styles.displayItem}>
                                    <span className={styles.displayIcon} aria-hidden>
                                        <FiUser size={18} />
                                    </span>
                                    <div>
                                        <div className={styles.label}>Họ và tên</div>
                                        <p className={styles.valueStrong}>{user.fullName}</p>
                                    </div>
                                </div>
                                <div className={styles.displayItem}>
                                    <span className={styles.displayIcon} aria-hidden>
                                        <FiHash size={18} />
                                    </span>
                                    <div>
                                        <div className={styles.label}>Tên đăng nhập</div>
                                        <p className={styles.valueStrong}>{user.username}</p>
                                    </div>
                                </div>
                                <div className={styles.displayItem}>
                                    <span className={styles.displayIcon} aria-hidden>
                                        <FiCalendar size={18} />
                                    </span>
                                    <div>
                                        <div className={styles.label}>Ngày sinh</div>
                                        <p className={styles.valueStrong}>
                                            {user.dateOfBirth
                                                ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
                                                : "Chưa cập nhật"}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.displayItem}>
                                    <span className={styles.displayIcon} aria-hidden>
                                        <FiUsers size={18} />
                                    </span>
                                    <div>
                                        <div className={styles.label}>Giới tính</div>
                                        <p className={styles.valueStrong}>{genderLabel}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {editMode === "basicInfo" && (
                            <div className={styles.editActions}>
                                <button
                                    type="button"
                                    className={styles.btnSave}
                                    onClick={handleSaveBasicInfo}
                                    disabled={isLoading || !isFormValid()}
                                >
                                    {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                                </button>
                                <button
                                    type="button"
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

                        <div className={styles.idStrip}>
                            <FiHash size={14} className={styles.idStripIcon} aria-hidden />
                            <span className={styles.idStripLabel}>Mã tài khoản</span>
                            <code className={styles.idCode}>{user.id}</code>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contactRow}>
                <div className={styles.section}>
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionHeaderIcon}>
                                    <FiMail />
                                </span>
                                Email
                            </h2>
                        </div>
                        <div className={styles.sectionBody}>
                            <div className={styles.infoGroup}>
                                <label className={styles.label} htmlFor="pi-email">
                                    Địa chỉ email
                                </label>
                                {editMode === "email" ? (
                                    <div className={styles.editGroup}>
                                        <input
                                            id="pi-email"
                                            type="email"
                                            className={`${styles.editInput} ${getFieldError("email") ? styles.inputError : ""}`}
                                            value={editValues.email}
                                            onChange={(e) =>
                                                onEditValuesChange({ ...editValues, email: e.target.value })
                                            }
                                            disabled={isLoading}
                                            placeholder="Nhập email mới"
                                            autoComplete="email"
                                        />
                                        {getFieldError("email") && (
                                            <span className={styles.fieldError}>{getFieldError("email")}</span>
                                        )}
                                        <div className={styles.editActions}>
                                            <button
                                                type="button"
                                                className={styles.btnSave}
                                                onClick={handleSaveEmail}
                                                disabled={isLoading || !!getFieldError("email")}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
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
                                        <div className={styles.contactBlock}>
                                            <p className={styles.contactValue}>{user.email.email}</p>
                                            <span
                                                className={`${styles.badge} ${user.email.isVerify ? styles.verified : styles.unverified}`}
                                            >
                                                {user.email.isVerify ? (
                                                    <>
                                                        <FiCheck size={12} aria-hidden /> Đã xác nhận
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiAlertCircle size={12} aria-hidden /> Chưa xác nhận
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                        <div className={styles.contactActions}>
                                            {!user.email.isVerify && (
                                                <button
                                                    type="button"
                                                    className={styles.verifyBtn}
                                                    onClick={() => onSendCode("email")}
                                                    disabled={isLoading}
                                                >
                                                    Xác thực ngay
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className={styles.editIconBtn}
                                                onClick={() => onEditModeChange("email")}
                                                title="Chỉnh sửa email"
                                                aria-label="Chỉnh sửa email"
                                            >
                                                <FiEdit2 size={18} aria-hidden />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionHeaderIcon}>
                                    <FiPhone />
                                </span>
                                Số điện thoại
                            </h2>
                        </div>
                        <div className={styles.sectionBody}>
                            <div className={styles.infoGroup}>
                                <label className={styles.label} htmlFor="pi-phone">
                                    Số điện thoại
                                </label>
                                {editMode === "phone" ? (
                                    <div className={styles.editGroup}>
                                        <input
                                            id="pi-phone"
                                            type="tel"
                                            className={styles.editInput}
                                            value={editValues.phone}
                                            onChange={(e) =>
                                                onEditValuesChange({ ...editValues, phone: e.target.value })
                                            }
                                            disabled={isLoading}
                                            autoComplete="tel"
                                        />
                                        <div className={styles.editActions}>
                                            <button
                                                type="button"
                                                className={styles.btnSave}
                                                onClick={handleSavePhone}
                                                disabled={isLoading}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.btnCancel}
                                                onClick={() => {
                                                    onEditModeChange(null);
                                                    onEditValuesChange({
                                                        ...editValues,
                                                        phone: user.phoneNumber.phoneNumber,
                                                    });
                                                }}
                                                disabled={isLoading}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.verificationGroup}>
                                        <div className={styles.contactBlock}>
                                            <p className={styles.contactValue}>{user.phoneNumber.phoneNumber}</p>
                                            <span
                                                className={`${styles.badge} ${user.phoneNumber.isVerify ? styles.verified : styles.unverified}`}
                                            >
                                                {user.phoneNumber.isVerify ? (
                                                    <>
                                                        <FiCheck size={12} aria-hidden /> Đã xác nhận
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiAlertCircle size={12} aria-hidden /> Chưa xác nhận
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                        <div className={styles.contactActions}>
                                            {!user.phoneNumber.isVerify && (
                                                <button
                                                    type="button"
                                                    className={styles.verifyBtn}
                                                    onClick={() => onSendCode("phone")}
                                                    disabled={isLoading}
                                                >
                                                    Xác thực ngay
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className={styles.editIconBtn}
                                                onClick={() => onEditModeChange("phone")}
                                                title="Chỉnh sửa số điện thoại"
                                                aria-label="Chỉnh sửa số điện thoại"
                                            >
                                                <FiEdit2 size={18} aria-hidden />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
