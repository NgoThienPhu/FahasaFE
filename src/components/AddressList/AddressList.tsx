import React from 'react';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPhone, FaUser, FaHome, FaStar } from 'react-icons/fa';
import styles from './AddressList.module.css';
import type { Address } from '../../services/types/user';

interface AddressListProps {
    addresses: Address[];
    loading?: boolean;
    error?: string | null;
    onEdit?: (address: Address) => void;
    onDelete?: (address: Address) => void;
    onSetDefault?: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({
    addresses,
    loading = false,
    error = null,
    onEdit,
    onDelete,
    onSetDefault
}) => {
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Đang tải địa chỉ...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>⚠️</div>
                <p>{error}</p>
            </div>
        );
    }

    if (!addresses || addresses.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>
                    <FaMapMarkerAlt />
                </div>
                <h3>Chưa có địa chỉ giao hàng</h3>
                <p>Thêm địa chỉ để nhận hàng nhanh chóng và thuận tiện</p>
            </div>
        );
    }

    return (
        <div className={styles.addressList}>
            {addresses.map((address, index) => (
                <div 
                    key={address.id || index} 
                    className={`${styles.addressCard} ${address.isDefault ? styles.defaultAddress : ''}`}
                >
                    {address.isDefault && (
                        <div className={styles.defaultBadge}>
                            <FaStar />
                            <span>Mặc định</span>
                        </div>
                    )}
                    
                    <div className={styles.addressHeader}>
                        <div className={styles.addressTitle}>
                            <FaMapMarkerAlt className={styles.addressIcon} />
                            <span>Địa chỉ {index + 1}</span>
                        </div>
                        <div className={styles.addressActions}>
                            {onEdit && (
                                <button 
                                    className={styles.actionButton}
                                    onClick={() => onEdit(address)}
                                    title="Chỉnh sửa địa chỉ"
                                >
                                    <FaEdit />
                                </button>
                            )}
                            {onDelete && (
                                <button 
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => onDelete(address)}
                                    title="Xóa địa chỉ"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.addressContent}>
                        <div className={styles.addressInfo}>
                            <div className={styles.infoRow}>
                                <FaUser className={styles.infoIcon} />
                                <span className={styles.infoLabel}>Người nhận:</span>
                                <span className={styles.infoValue}>{address.fullName}</span>
                            </div>
                            
                            <div className={styles.infoRow}>
                                <FaPhone className={styles.infoIcon} />
                                <span className={styles.infoLabel}>Số điện thoại:</span>
                                <span className={styles.infoValue}>{address.phoneNumber}</span>
                            </div>
                            
                            <div className={styles.infoRow}>
                                <FaHome className={styles.infoIcon} />
                                <span className={styles.infoLabel}>Địa chỉ:</span>
                                <span className={styles.infoValue}>
                                    {address.fullAddress || `${address.addressDetail}, ${address.ward}, ${address.district}, ${address.city}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {!address.isDefault && onSetDefault && (
                        <div className={styles.addressFooter}>
                            <button 
                                className={styles.setDefaultButton}
                                onClick={() => onSetDefault(address)}
                            >
                                Đặt làm mặc định
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AddressList;
