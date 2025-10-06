import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { useAuth } from '../../context/AuthContext'
import EditProfileForm from '../../components/EditProfileForm'
import EmailVerification from '../../components/EmailVerification'
import AddAddressForm from '../../components/AddAddressForm'
import { EditAddressForm } from '../../components/EditAddressForm'
import { AddressList } from '../../components/AddressList'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { userApi } from '../../services/api/user'
import type { Address } from '../../services/types/user'

const Profile: React.FC = () => {
    const { user, logout, refreshProfile } = useAuth();
    const [activeTab, setActiveTab] = useState<'account' | 'cart' | 'orders' | 'addresses'>('account');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [addresses, setAddresses] = useState<Address[] | null>(null);
    const [addressesLoading, setAddressesLoading] = useState(false);
    const [addressesError, setAddressesError] = useState<string | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditSuccess = async () => {
        setIsEditing(false);
        await refreshProfile(); // Refresh user data after successful update
    };

    const handleAddAddressClick = () => {
        setIsAddingAddress(true);
    };

    const handleCancelAddAddress = () => {
        setIsAddingAddress(false);
    };

    const handleAddAddressSuccess = async () => {
        setIsAddingAddress(false);
        await loadAddresses();
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
    };

    const handleCancelEditAddress = () => {
        setEditingAddress(null);
    };

    const handleEditAddressSuccess = async () => {
        setEditingAddress(null);
        await loadAddresses();
    };

    const handleDeleteAddress = async (address: Address) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            try {
                const response = await userApi.deleteAddress(address.id);
                if (response.success) {
                    await loadAddresses();
                } else {
                    alert(response.message || 'Có lỗi xảy ra khi xóa địa chỉ');
                }
            } catch (error) {
                console.error('Error deleting address:', error);
                alert('Có lỗi xảy ra khi xóa địa chỉ');
            }
        }
    };

    const handleSetDefaultAddress = async (address: Address) => {
        try {
            const response = await userApi.setDefaultAddress(address.id);
            if (response.success) {
                await loadAddresses();
            } else {
                alert(response.message || 'Có lỗi xảy ra khi đặt địa chỉ mặc định');
            }
        } catch (error) {
            console.error('Error setting default address:', error);
            alert('Có lỗi xảy ra khi đặt địa chỉ mặc định');
        }
    };

    const loadAddresses = async () => {
        try {
            setAddressesLoading(true);
            setAddressesError(null);
            const res = await userApi.getAddresses();
            if (res.success) {
                setAddresses(res.data || []);
            } else {
                setAddresses([]);
                setAddressesError(res.message || 'Không thể tải địa chỉ');
            }
        } catch (e) {
            setAddressesError('Không thể tải địa chỉ');
            setAddresses([]);
        } finally {
            setAddressesLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'addresses' && !isAddingAddress && !editingAddress) {
            loadAddresses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, isAddingAddress, editingAddress]);

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
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>Thông tin tài khoản</h2>
                                    {!isEditing && (
                                        <button 
                                            className={styles.editIconButton}
                                            onClick={handleEditClick}
                                            title="Chỉnh sửa thông tin"
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </div>
                                
                                {isEditing ? (
                                    <EditProfileForm 
                                        onCancel={handleCancelEdit}
                                        onSuccess={handleEditSuccess}
                                    />
                                ) : (
                                    <>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Họ và tên</span>
                                            <span className={styles.value}>{user.fullName || 'Chưa xác định'}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Tài khoản</span>
                                            <span className={styles.value}>{user.username}</span>
                                        </div>
                                        <EmailVerification 
                                            user={user} 
                                            onSuccess={handleEditSuccess}
                                        />
                                        <div className={styles.row}>
                                            <span className={styles.label}>Số điện thoại</span>
                                            <span className={styles.valueGroup}>
                                                <span className={styles.value}>{user.phoneNumber?.phoneNumber || 'Chưa xác định'}</span>
                                                {!user.phoneNumber?.isVerify && user.phoneNumber?.phoneNumber && (
                                                    <button className={styles.verifyPhoneButton}>
                                                        Xác thực
                                                    </button>
                                                )}
                                            </span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Giới tính</span>
                                            <span className={styles.value}>{user.gender == "MALE" && "Nam" || user.gender == "FEMALE" && "Nữ" || 'Chưa xác định'}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Ngày sinh</span>
                                            <span className={styles.value}>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Chưa xác định'}</span>
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
                                    </>
                                )}
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
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>Địa chỉ giao hàng</h2>
                                    {!isAddingAddress && (
                                        <button 
                                            className={styles.addAddressButton}
                                            onClick={handleAddAddressClick}
                                            title="Thêm địa chỉ mới"
                                        >
                                            <FaPlus />
                                        </button>
                                    )}
                                </div>
                                
                                {isAddingAddress ? (
                                    <AddAddressForm 
                                        onCancel={handleCancelAddAddress}
                                        onSuccess={handleAddAddressSuccess}
                                    />
                                ) : editingAddress ? (
                                    <EditAddressForm 
                                        address={editingAddress}
                                        onCancel={handleCancelEditAddress}
                                        onSuccess={handleEditAddressSuccess}
                                    />
                                ) : (
                                    <AddressList 
                                        addresses={addresses || []}
                                        loading={addressesLoading}
                                        error={addressesError}
                                        onEdit={handleEditAddress}
                                        onDelete={handleDeleteAddress}
                                        onSetDefault={handleSetDefaultAddress}
                                    />
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


