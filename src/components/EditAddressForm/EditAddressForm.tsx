import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import styles from './EditAddressForm.module.css';
import { userApi } from '../../services/api/user';
import type { Address, CreateAddressRequest } from '../../services/types/user';

interface EditAddressFormProps {
    address: Address;
    onCancel: () => void;
    onSuccess: () => void;
}

interface AddressFormData {
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({ address, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState<AddressFormData>({
        fullName: address.fullName || '',
        phoneNumber: address.phoneNumber || '',
        addressDetail: address.addressDetail || '',
        city: address.city || '',
        district: address.district || '',
        ward: address.ward || '',
        isDefault: address.isDefault || false,
    });

    const [errors, setErrors] = useState<Partial<AddressFormData>>({});
    const [loading, setLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<AddressFormData> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
        }

        if (!formData.addressDetail.trim()) {
            newErrors.addressDetail = 'Địa chỉ chi tiết là bắt buộc';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'Thành phố là bắt buộc';
        }

        if (!formData.district.trim()) {
            newErrors.district = 'Quận/Huyện là bắt buộc';
        }

        if (!formData.ward.trim()) {
            newErrors.ward = 'Phường/Xã là bắt buộc';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const payload: CreateAddressRequest = {
                fullName: formData.fullName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                addressDetail: formData.addressDetail.trim(),
                city: formData.city.trim(),
                district: formData.district.trim(),
                ward: formData.ward.trim(),
                isDefault: formData.isDefault,
            };

            const response = await userApi.updateAddress(address.id, payload);
            
            if (response.success) {
                onSuccess();
            } else {
                setErrors({ fullName: response.message || 'Có lỗi xảy ra khi cập nhật địa chỉ' });
            }
        } catch (error) {
            console.error('Error updating address:', error);
            setErrors({ fullName: 'Có lỗi xảy ra khi cập nhật địa chỉ' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof AddressFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className={styles.editAddressForm}>
            <div className={styles.formHeader}>
                <h3>Chỉnh sửa địa chỉ</h3>
                <button 
                    className={styles.cancelButton}
                    onClick={onCancel}
                    type="button"
                >
                    <FaTimes />
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="fullName" className={styles.label}>
                            Họ và tên <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                            placeholder="Nhập họ và tên người nhận"
                        />
                        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>
                            Số điện thoại <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''}`}
                            placeholder="Nhập số điện thoại"
                        />
                        {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="addressDetail" className={styles.label}>
                        Địa chỉ chi tiết <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        id="addressDetail"
                        name="addressDetail"
                        value={formData.addressDetail}
                        onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                        className={`${styles.textarea} ${errors.addressDetail ? styles.inputError : ''}`}
                        placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, tòa nhà...)"
                        rows={3}
                    />
                    {errors.addressDetail && <span className={styles.errorText}>{errors.addressDetail}</span>}
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="city" className={styles.label}>
                            Thành phố <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                            placeholder="Nhập thành phố"
                        />
                        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="district" className={styles.label}>
                            Quận/Huyện <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                            className={`${styles.input} ${errors.district ? styles.inputError : ''}`}
                            placeholder="Nhập quận/huyện"
                        />
                        {errors.district && <span className={styles.errorText}>{errors.district}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="ward" className={styles.label}>
                            Phường/Xã <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="ward"
                            name="ward"
                            value={formData.ward}
                            onChange={(e) => handleInputChange('ward', e.target.value)}
                            className={`${styles.input} ${errors.ward ? styles.inputError : ''}`}
                            placeholder="Nhập phường/xã"
                        />
                        {errors.ward && <span className={styles.errorText}>{errors.ward}</span>}
                    </div>
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={formData.isDefault}
                            onChange={(e) => handleInputChange('isDefault', e.target.checked)}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>Đặt làm địa chỉ mặc định</span>
                    </label>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={styles.cancelFormButton}
                        disabled={loading}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className={styles.spinner}></div>
                                Đang cập nhật...
                            </>
                        ) : (
                            <>
                                <FaSave />
                                Cập nhật địa chỉ
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAddressForm;
