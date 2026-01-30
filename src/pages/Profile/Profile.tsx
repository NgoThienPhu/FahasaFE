import React, { useState } from "react";
import { FaUser, FaBox, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";
import emailApi from "../../services/apis/emailApi";
import { useNotification } from "../../contexts/NotificationContext";
import ProfileInfo from "./components/ProfileInfo";
import ProfileOrders from "./components/ProfileOrders";
import ProfileCart from "./components/ProfileCart";
import ProfileAddresses from "./components/ProfileAddresses";
import userApi from "../../services/apis/userApi";

type ActiveTab = "info" | "orders" | "cart" | "addresses";
type VerificationType = "email" | "phone" | null;
type EditMode = "email" | "phone" | "basicInfo" | null;
type ChangeStep = "password-input" | "otp-input" | null;

const Profile: React.FC = () => {
    const { user, reload } = useAuth();
    const { addNotification } = useNotification();

    const [activeTab, setActiveTab] = useState<ActiveTab>("info");
    const [verificationModal, setVerificationModal] = useState<VerificationType>(null);
    const [changeStep, setChangeStep] = useState<ChangeStep>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editMode, setEditMode] = useState<EditMode>(null);
    const [editValues, setEditValues] = useState({
        email: user?.email.email || "",
        phone: user?.phoneNumber.phoneNumber || "",
        fullName: user?.fullName || "",
        dateOfBirth: user?.dateOfBirth || "",
        gender: user?.gender || "OTHER",
    });

    const [password, setPassword] = useState("");
    const [pendingEdit, setPendingEdit] = useState<EditMode>(null);

    const handleSendCode = async (type: "email" | "phone") => {
        setIsLoading(true);
        setError("");
        try {
            if (type === "email") {
                await emailApi.sendOTP(user!.email.email);
            } else {
                // Phone OTP sending logic here
                addNotification("error", "Chức năng xác thực OTP qua số điện thoại hiện chưa được hỗ trợ");
                return;
            }
            setVerificationModal(type);
            setChangeStep("otp-input");
            setSuccess(`Mã xác thực đã được gửi tới ${type === "email" ? "email" : "số điện thoại"} của bạn`);
        } catch (err: any) {
            setError(err.response?.data?.message || "Gửi mã xác thực thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!verificationCode.trim()) {
            setError("Vui lòng nhập mã xác thực");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            if (verificationModal === "email") {
                await emailApi.verifyOTP({
                    otp: verificationCode,
                    email: user!.email.email,
                });
                addNotification("success", "Email xác thực thành công!");
                await reload();
            } else {
                // Phone verification logic here
                addNotification("success", "Số điện thoại xác thực thành công!");
                await reload();
            }
            setChangeStep(null);
            setVerificationModal(null);
            setVerificationCode("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Xác thực thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditSave = async () => {
        if (!editMode) return;

        // Xử lý chỉnh sửa thông tin cơ bản
        if (editMode === "basicInfo") {
            setIsLoading(true);
            setError("");
            try {
                await userApi.changeInfo({
                    fullName: editValues.fullName,
                    dateOfBirth: editValues.dateOfBirth,
                    gender: editValues.gender,
                });
                addNotification("success", "Cập nhật thông tin cơ bản thành công!");
                await reload();
                setEditMode(null);
            } catch (err: any) {
                setError(err.response?.data?.message || "Cập nhật thất bại");
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // Nếu đổi email hoặc phone, cần xác nhận mật khẩu trước
        if ((editMode === "email" && editValues.email !== user?.email.email) ||
            (editMode === "phone" && editValues.phone !== user?.phoneNumber.phoneNumber)) {
            setPendingEdit(editMode);
            setVerificationModal(editMode);
            setChangeStep("password-input");
            return;
        }

        // Other edits (email/phone) are handled earlier; if nothing to do, reset edit mode
        setEditMode(null);
    };

    const handlePasswordConfirm = async () => {
        if (!password.trim()) {
            setError("Vui lòng nhập mật khẩu");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            if (pendingEdit === "email") {
                await userApi.changeEmail({ newEmail: editValues.email, password });
                await emailApi.sendOTP(editValues.email);
            } else if (pendingEdit === "phone") {
                // Nếu backend hỗ trợ, update số điện thoại và gửi OTP
                addNotification("error", "Chức năng xác thực OTP qua số điện thoại hiện chưa được hỗ trợ");
                setChangeStep(null);
                setPassword("");
                setIsLoading(false);
                return;
            }
            setChangeStep("otp-input");
            setSuccess(`Mã xác thực đã được gửi tới ${pendingEdit === "email" ? "email" : "số điện thoại"} mới của bạn`);
            setPassword("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Gửi mã xác thực thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAndUpdate = async () => {
        if (!verificationCode.trim()) {
            setError("Vui lòng nhập mã xác thực");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            if (pendingEdit === "email") {
                await emailApi.verifyOTP({
                    otp: verificationCode,
                    email: editValues.email,
                });
            } else if (pendingEdit === "phone") {
                addNotification("error", "Xác thực số điện thoại chưa được hỗ trợ");
                setIsLoading(false);
                return;
            }
            addNotification("success", "Cập nhật thông tin thành công!");
            await reload();
            setChangeStep(null);
            setVerificationModal(null);
            setVerificationCode("");
            setEditMode(null);
            setPendingEdit(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Cập nhật thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (!user) return null;

        switch (activeTab) {
            case "info":
                return (
                    <ProfileInfo
                        user={{
                            id: user.id,
                            username: user.username,
                            fullName: user.fullName,
                            dateOfBirth: user.dateOfBirth,
                            gender: user.gender,
                            email: {
                                email: user.email.email,
                                isVerify: user.email.isVerify,
                            },
                            phoneNumber: {
                                phoneNumber: user.phoneNumber.phoneNumber,
                                isVerify: user.phoneNumber.isVerify,
                            },
                            isActived: user.isActived,
                        }}
                        editMode={editMode}
                        editValues={editValues}
                        isLoading={isLoading}
                        onEditModeChange={setEditMode}
                        onEditValuesChange={setEditValues}
                        onEditSave={handleEditSave}
                        onSendCode={handleSendCode}
                    />
                );
            case "orders":
                return <ProfileOrders />;
            case "cart":
                return <ProfileCart />;
            case "addresses":
                return <ProfileAddresses />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileWrapper}>
                <div className={styles.sidebar}>
                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            {user?.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.userInfo}>
                            <h3 className={styles.userName}>{user?.fullName}</h3>
                            <p className={styles.userEmail}>{user?.email.email}</p>
                        </div>
                    </div>

                    <div className={styles.navMenu}>
                        <button
                            className={`${styles.navItem} ${activeTab === "info" ? styles.active : ""}`}
                            onClick={() => setActiveTab("info")}
                        >
                            <span className={styles.icon}><FaUser /></span>
                            <span className={styles.label}>Thông tin</span>
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            <span className={styles.icon}><FaBox /></span>
                            <span className={styles.label}>Đơn hàng</span>
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === "cart" ? styles.active : ""}`}
                            onClick={() => setActiveTab("cart")}
                        >
                            <span className={styles.icon}><FaShoppingCart /></span>
                            <span className={styles.label}>Giỏ hàng</span>
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === "addresses" ? styles.active : ""}`}
                            onClick={() => setActiveTab("addresses")}
                        >
                            <span className={styles.icon}><FaMapMarkerAlt /></span>
                            <span className={styles.label}>Địa chỉ</span>
                        </button>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    {renderContent()}
                </div>
            </div>

            {verificationModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>
                                {changeStep === "password-input"
                                    ? `Đổi ${pendingEdit === "email" ? "Email" : "Số điện thoại"}`
                                    : `Xác thực ${verificationModal === "email" ? "Email" : "Số điện thoại"}`
                                }
                            </h2>
                            <button
                                className={styles.closeBtn}
                                onClick={async () => {
                                    if (changeStep === "otp-input" && pendingEdit) {
                                        setIsLoading(true);
                                        try {
                                            await reload();
                                            addNotification("warning", `${pendingEdit === "email" ? "Email" : "Số điện thoại"} chưa được xác nhận`);
                                        } catch (err: any) {
                                            console.error("Lỗi trong quá trình lấy thông tin user", err);
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    }
                                    setChangeStep(null);
                                    setVerificationModal(null);
                                    setVerificationCode("");
                                    setPassword("");
                                    setError("");
                                    setSuccess("");
                                    setPendingEdit(null);
                                    setEditMode(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {success && <div className={styles.successMessage}>{success}</div>}
                            {error && <div className={styles.errorMessage}>{error}</div>}

                            {changeStep === "password-input" ? (
                                <>
                                    <p className={styles.modalText}>
                                        Nhập {pendingEdit === "email" ? "email mới" : "số điện thoại mới"} và mật khẩu để tiếp tục
                                    </p>

                                    <div style={{ marginBottom: "15px" }}>
                                        <input
                                            type={pendingEdit === "email" ? "email" : "tel"}
                                            placeholder={pendingEdit === "email" ? "Email mới" : "Số điện thoại mới"}
                                            className={styles.verificationInput}
                                            value={pendingEdit === "email" ? editValues.email : editValues.phone}
                                            onChange={(e) => {
                                                if (pendingEdit === "email") {
                                                    setEditValues({ ...editValues, email: e.target.value });
                                                } else {
                                                    setEditValues({ ...editValues, phone: e.target.value });
                                                }
                                            }}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <input
                                        type="password"
                                        placeholder="Mật khẩu hiện tại"
                                        className={styles.verificationInput}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className={styles.modalText}>
                                        Vui lòng nhập mã xác thực được gửi tới {pendingEdit ? "địa chỉ mới" : verificationModal === "email" ? "email" : "số điện thoại"} của bạn
                                    </p>

                                    {pendingEdit && (
                                        <div className={styles.warningMessage}>
                                            ⚠️ {pendingEdit === "email" ? "Email" : "Số điện thoại"} sẽ không được xác nhận nếu bạn không hoàn thành bước này
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        placeholder="Nhập mã xác thực (6 chữ số)"
                                        className={styles.verificationInput}
                                        value={verificationCode}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
                                        disabled={isLoading}
                                        maxLength={6}
                                    />
                                </>
                            )}
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                className={styles.btnCancel}
                                onClick={async () => {
                                    // Nếu đang ở bước OTP verification và bỏ qua, cần reload user
                                    if (changeStep === "otp-input" && pendingEdit) {
                                        setIsLoading(true);
                                        try {
                                            await reload();
                                            addNotification("warning", `${pendingEdit === "email" ? "Email" : "Số điện thoại"} sẽ không được xác nhận nếu bạn bỏ qua bước này`);
                                        } catch (err: any) {
                                            console.error("Failed to reload user:", err);
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    }
                                    setChangeStep(null);
                                    setVerificationModal(null);
                                    setVerificationCode("");
                                    setPassword("");
                                    setError("");
                                    setSuccess("");
                                    setPendingEdit(null);
                                    setEditMode(null);
                                }}
                                disabled={isLoading}
                            >
                                Hủy
                            </button>
                            <button
                                className={styles.btnSubmit}
                                onClick={changeStep === "password-input" ? handlePasswordConfirm : (pendingEdit ? handleVerifyAndUpdate : handleVerify)}
                                disabled={isLoading || (changeStep === "password-input" ? !password.trim() : !verificationCode.trim())}
                            >
                                {isLoading
                                    ? (changeStep === "password-input" ? "Đang gửi..." : "Đang xác thực...")
                                    : (changeStep === "password-input" ? "Tiếp tục" : "Xác thực")
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
