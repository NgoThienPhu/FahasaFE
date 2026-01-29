import React from "react";
import styles from "./ProfileCart.module.css";

const ProfileCart: React.FC = () => {
    return (
        <div className={styles.tabContent}>
            <div className={styles.emptyState}>
                <h2>Giỏ hàng</h2>
                <p>Giỏ hàng của bạn đang trống</p>
            </div>
        </div>
    );
};

export default ProfileCart;
