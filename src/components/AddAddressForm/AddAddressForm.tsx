import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import styles from './AddAddressForm.module.css';

interface AddAddressFormProps {
    onCancel: () => void;
    onSuccess: () => void;
}

interface AddressFormData {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onCancel, onSuccess }) => {
    const [formData, setFormData] = useState<AddressFormData>({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        isDefault: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ tên không được để trống';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
            newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ không được để trống';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'Tỉnh/Thành phố không được để trống';
        }

        if (!formData.district.trim()) {
            newErrors.district = 'Quận/Huyện không được để trống';
        }

        if (!formData.ward.trim()) {
            newErrors.ward = 'Phường/Xã không được để trống';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            // TODO: Implement API call to add address
            console.log('Adding address:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onSuccess();
        } catch (err) {
            setErrors({ general: 'Thêm địa chỉ thất bại' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Thêm địa chỉ mới</h3>
                <button 
                    className={styles.closeButton}
                    onClick={onCancel}
                    type="button"
                >
                    <FaTimes />
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {errors.general && (
                    <div className={styles.errorMessage}>{errors.general}</div>
                )}

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>
                            Họ và tên <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                            placeholder="Nhập họ và tên"
                        />
                        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>
                            Số điện thoại <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''}`}
                            placeholder="Nhập số điện thoại"
                        />
                        {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.label}>
                        Địa chỉ chi tiết <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                        placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, tòa nhà...)"
                        rows={3}
                    />
                    {errors.address && <span className={styles.errorText}>{errors.address}</span>}
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="city" className={styles.label}>
                            Tỉnh/Thành phố <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                            placeholder="Nhập tỉnh/thành phố"
                        />
                        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="district" className={styles.label}>
                            Quận/Huyện <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.district ? styles.inputError : ''}`}
                            placeholder="Nhập quận/huyện"
                        />
                        {errors.district && <span className={styles.errorText}>{errors.district}</span>}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="ward" className={styles.label}>
                        Phường/Xã <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="ward"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.ward ? styles.inputError : ''}`}
                        placeholder="Nhập phường/xã"
                    />
                    {errors.ward && <span className={styles.errorText}>{errors.ward}</span>}
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleInputChange}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>Đặt làm địa chỉ mặc định</span>
                    </label>
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={styles.cancelButton}
                        disabled={loading}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Đang thêm...' : 'Thêm địa chỉ'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAddressForm;
