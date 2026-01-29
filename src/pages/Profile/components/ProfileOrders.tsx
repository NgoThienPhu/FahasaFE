import React from "react";
import styles from "./ProfileOrders.module.css";

const ProfileOrders: React.FC = () => {
    return (
        <div className={styles.tabContent}>
            <div className={styles.emptyState}>
                <h2>Đơn hàng của bạn</h2>
                <p>Bạn chưa có đơn hàng nào</p>
            </div>
        </div>
    );
};

export default ProfileOrders;
