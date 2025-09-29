import React from 'react'
import styles from './Profile.module.css'
import { useAuth } from '../../context/AuthContext'

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <h1>Hồ sơ cá nhân</h1>
                <div className={styles.card}>
                    <div className={styles.row}>
                        <span className={styles.label}>Họ và tên</span>
                        <span className={styles.value}>{'—'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Tài khoản</span>
                        <span className={styles.value}>{user.username}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{(user as any).email?.email || user.email || '—'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Xác thực email</span>
                        <span className={styles.value}>{(user as any).email?.isVerify ? 'Đã xác thực' : 'Chưa xác thực'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Số điện thoại</span>
                        <span className={styles.value}>{(user as any).phoneNumber?.phoneNumber || user.phoneNumber || '—'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Xác thực SĐT</span>
                        <span className={styles.value}>{(user as any).phoneNumber?.isVerify ? 'Đã xác thực' : 'Chưa xác thực'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Trạng thái</span>
                        <span className={styles.value}>{(user as any).isActived ? 'Đang hoạt động' : 'Không hoạt động'}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Ngày kích hoạt</span>
                        <span className={styles.value}>{(user as any).activedAt ? new Date((user as any).activedAt).toLocaleString() : '—'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile


