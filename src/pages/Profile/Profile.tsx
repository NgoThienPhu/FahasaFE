import React, { useState } from "react";
import { FaUser, FaBox, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";

type ActiveTab = "info" | "orders" | "cart";

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<ActiveTab>("info");

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
                                <div className={styles.valueWithBadge}>
                                    <p className={styles.value}>{user!.email.email}</p>
                                    <span className={`${styles.badge} ${user!.email.isVerified ? styles.verified : styles.unverified}`}>
                                        {user!.email.isVerified ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2>Số điện thoại</h2>
                            <div className={styles.infoGroup}>
                                <label className={styles.label}>Số điện thoại</label>
                                <div className={styles.valueWithBadge}>
                                    <p className={styles.value}>{user!.phoneNumber.phoneNumber}</p>
                                    <span className={`${styles.badge} ${user!.phoneNumber.isVerified ? styles.verified : styles.unverified}`}>
                                        {user!.phoneNumber.isVerified ? "✓ Xác nhận" : "⚠ Chưa xác nhận"}
                                    </span>
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
        </div>
    );
};

export default Profile;
