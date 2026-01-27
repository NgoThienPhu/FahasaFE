import React, { useState } from "react";
import { FaUser, FaBox, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";
import emailApi from "../../services/apis/emailApi";
import { useNotification } from "../../contexts/NotificationContext";

type ActiveTab = "info" | "orders" | "cart";
type VerificationType = "email" | "phone" | null;

const Profile: React.FC = () => {
    const { user, reload: reloadUser } = useAuth();
    const { addNotification } = useNotification();

    const [activeTab, setActiveTab] = useState<ActiveTab>("info");
    const [verificationModal, setVerificationModal] = useState<VerificationType>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
                reloadUser();
            } else {
                // Phone verification logic here
                setSuccess("Số điện thoại xác thực thành công!");
            }
            setVerificationModal(null);
            setVerificationCode("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Xác thực thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.section}>
                            <h2>Thông tin cơ bản</h2>

                            <div className={styles.infoGroup}>
                                <label className={styles.label}>ID tài khoản</label>
                                <p className={styles.value}>{user!.id}</p>
                            </div>

                            <div className={styles.infoGroup}>
                                <label className={styles.label}>Tên đầy đủ</label>
                                <p className={styles.value}>{user!.fullName}</p>
                            </div>

                            <div className={styles.infoGroup}>
                                <label className={styles.label}>Tên tài khoản</label>
                                <p className={styles.value}>{user!.username}</p>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Email</h2>
                            <div className={styles.infoGroup}>
                                <label className={styles.label}>Địa chỉ email</label>
                                <div className={styles.verificationGroup}>
                                    <div className={styles.valueWithBadge}>
                                        <p className={styles.value}>{user!.email.email}</p>
                                        <span className={`${styles.badge} ${user!.email.isVerify ? styles.verified : styles.unverified}`}>
                                            {user!.email.isVerify ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                        </span>
                                    </div>
                                    {!user!.email.isVerify && (
                                        <button
                                            className={styles.verifyBtn}
                                            onClick={() => handleSendCode("email")}
                                            disabled={isLoading}
                                        >
                                            Xác thực ngay
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Số điện thoại</h2>
                            <div className={styles.infoGroup}>
                                <label className={styles.label}>Số điện thoại</label>
                                <div className={styles.verificationGroup}>
                                    <div className={styles.valueWithBadge}>
                                        <p className={styles.value}>{user!.phoneNumber.phoneNumber}</p>
                                        <span className={`${styles.badge} ${user!.phoneNumber.isVerify ? styles.verified : styles.unverified}`}>
                                            {user!.phoneNumber.isVerify ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                        </span>
                                    </div>
                                    {!user!.phoneNumber.isVerify && (
                                        <button
                                            className={styles.verifyBtn}
                                            onClick={() => handleSendCode("phone")}
                                            disabled={isLoading}
                                        >
                                            Xác thực ngay
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "orders":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.emptyState}>
                            <h2>Đơn hàng của bạn</h2>
                            <p>Bạn chưa có đơn hàng nào</p>
                        </div>
                    </div>
                );
            case "cart":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.emptyState}>
                            <h2>Giỏ hàng</h2>
                            <p>Giỏ hàng của bạn đang trống</p>
                        </div>
                    </div>
                );
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
                            <h2>Xác thực {verificationModal === "email" ? "Email" : "Số điện thoại"}</h2>
                            <button
                                className={styles.closeBtn}
                                onClick={() => {
                                    setVerificationModal(null);
                                    setVerificationCode("");
                                    setError("");
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {success && <div className={styles.successMessage}>{success}</div>}
                            {error && <div className={styles.errorMessage}>{error}</div>}

                            <p className={styles.modalText}>
                                Vui lòng nhập mã xác thực được gửi tới {verificationModal === "email" ? "email" : "số điện thoại"} của bạn
                            </p>

                            <input
                                type="text"
                                placeholder="Nhập mã xác thực (6 chữ số)"
                                className={styles.verificationInput}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                disabled={isLoading}
                                maxLength={6}
                            />
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                className={styles.btnCancel}
                                onClick={() => {
                                    setVerificationModal(null);
                                    setVerificationCode("");
                                    setError("");
                                    setSuccess("");
                                }}
                                disabled={isLoading}
                            >
                                Hủy
                            </button>
                            <button
                                className={styles.btnSubmit}
                                onClick={handleVerify}
                                disabled={isLoading || !verificationCode.trim()}
                            >
                                {isLoading ? "Đang xác thực..." : "Xác thực"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
