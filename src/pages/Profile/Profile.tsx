import React, { useState } from 'react'
import styles from './Profile.module.css'
import { useAuth } from '../../context/AuthContext'

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'account' | 'cart' | 'orders' | 'addresses'>('account');

    if (!user) {
        return null;
    }

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.avatar}>{(user.fullName || user.username).charAt(0).toUpperCase()}</div>
                            <div className={styles.userMeta}>
                                <div className={styles.userName}>{user.fullName || user.username}</div>
                                <div className={styles.userEmail}>{(user as any).email?.email || user.email || ''}</div>
                            </div>
                        </div>
                        <nav className={styles.menu}>
                            <button
                                className={`${styles.menuItem} ${activeTab === 'account' ? styles.active : ''}`}
                                onClick={() => setActiveTab('account')}
                            >
                                Thông tin tài khoản
                            </button>
                            <button
                                className={`${styles.menuItem} ${activeTab === 'cart' ? styles.active : ''}`}
                                onClick={() => setActiveTab('cart')}
                            >
                                Giỏ hàng
                            </button>
                            <button
                                className={`${styles.menuItem} ${activeTab === 'addresses' ? styles.active : ''}`}
                                onClick={() => setActiveTab('addresses')}
                            >
                                Địa chỉ giao hàng
                            </button>
                            <button
                                className={`${styles.menuItem} ${activeTab === 'orders' ? styles.active : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                Lịch sử đơn hàng
                            </button>
                        </nav>
                        <div className={styles.sidebarFooter}>
                            <button className={styles.logoutBtn} onClick={logout}>Đăng xuất</button>
                        </div>
                    </aside>

                    <main className={styles.content}>
                        {activeTab === 'account' && (
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>Thông tin tài khoản</h2>
                                <div className={styles.row}>
                                    <span className={styles.label}>Họ và tên</span>
                                    <span className={styles.value}>{user.fullName || '—'}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Tài khoản</span>
                                    <span className={styles.value}>{user.username}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.valueGroup}>
                                        <span className={styles.value}>{user.email?.email || '—'}</span>
                                        <span className={`${styles.badge} ${user.email?.isVerify ? styles.badgeSuccess : styles.badgeWarning}`}>
                                            {user.email?.isVerify ? 'Đã xác thực' : 'Chưa xác thực'}
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Số điện thoại</span>
                                    <span className={styles.valueGroup}>
                                        <span className={styles.value}>{user.phoneNumber?.phoneNumber || '—'}</span>
                                        <span className={`${styles.badge} ${user.phoneNumber?.isVerify ? styles.badgeSuccess : styles.badgeWarning}`}>
                                            {user.phoneNumber?.isVerify ? 'Đã xác thực' : 'Chưa xác thực'}
                                        </span>
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Giới tính</span>
                                    <span className={styles.value}>{user.gender || '—'}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Ngày sinh</span>
                                    <span className={styles.value}>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '—'}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Trạng thái</span>
                                    <span className={`${styles.badge} ${user.isActived ? styles.badgeSuccess : styles.badgeWarning}`}>
                                        {user.isActived ? 'Đang hoạt động' : 'Không hoạt động'}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>ID người dùng</span>
                                    <span className={styles.value}>{user.id}</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'cart' && (
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>Giỏ hàng</h2>
                                <div className={styles.empty}>Chưa có sản phẩm trong giỏ.</div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>Địa chỉ giao hàng</h2>
                                {Array.isArray((user as any).addresses) && (user as any).addresses.length > 0 ? (
                                    <div>
                                        {(user as any).addresses.map((addr: any, idx: number) => (
                                            <div className={styles.row} key={addr.id || idx}>
                                                <span className={styles.label}>Địa chỉ {idx + 1}</span>
                                                <span className={styles.value}>{addr.fullAddress || addr.address || '—'}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.empty}>Bạn chưa có địa chỉ giao hàng.</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>Lịch sử đơn hàng</h2>
                                <div className={styles.empty}>Bạn chưa có đơn hàng nào.</div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Profile


