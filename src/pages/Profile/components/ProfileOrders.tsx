import React from "react";
import { NavLink } from "react-router-dom";
import { FiArrowRight, FiPackage } from "react-icons/fi";
import styles from "./ProfileOrders.module.css";

const ProfileOrders: React.FC = () => {
    return (
        <div className={styles.tabContent}>
            <div className={styles.emptyWrap}>
                <div className={styles.emptyCard}>
                    <div className={styles.emptyGlow} aria-hidden />
                    <div className={styles.emptyIcon} aria-hidden>
                        <FiPackage size={30} strokeWidth={1.6} />
                    </div>
                    <p className={styles.emptyText}>Bạn chưa có đơn hàng nào</p>
                    <p className={styles.emptySubtext}>
                        Mua sắm ngay để tạo đơn đầu tiên và theo dõi trạng thái giao hàng tại đây.
                    </p>
                    <NavLink to="/products" className={styles.emptyCta}>
                        Mua sắm ngay
                        <FiArrowRight size={16} aria-hidden />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProfileOrders;
