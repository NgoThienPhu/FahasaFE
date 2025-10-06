import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../services/api/user';
import type { UpdateProfileRequest } from '../../services/types/user';
import axios from 'axios';
import styles from './EditProfileForm.module.css';

interface EditProfileFormProps {
    onCancel: () => void;
    onSuccess: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onCancel, onSuccess }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<UpdateProfileRequest>({
        fullName: '',
        gender: '',
        dateOfBirth: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                gender: user.gender || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName?.trim()) {
            newErrors.fullName = 'Họ và tên không được để trống';
        }

        if (!formData.gender || formData.gender.trim() === '') {
            newErrors.gender = 'Giới tính không được để trống';
        }

        if (!formData.dateOfBirth?.trim()) {
            newErrors.dateOfBirth = 'Ngày sinh không được để trống';
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
            birthDate.setHours(0, 0, 0, 0);
            
            if (birthDate >= today) {
                newErrors.dateOfBirth = 'Ngày sinh phải trước ngày hiện tại';
            }
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
            const response = await userApi.updateProfile(formData);
            
            if (response.success) {
                onSuccess();
            } else {
                // Handle API error
                setErrors({ general: response.message || 'Cập nhật thông tin thất bại' });
            }
        } catch (err: unknown) {
            let errorMessage = 'Cập nhật thông tin thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Chỉnh sửa thông tin tài khoản</h3>
            {errors.general && (
                <div className={styles.errorMessage}>
                    {errors.general}
                </div>
            )}
            <form onSubmit={handleSubmit} className={styles.form}>
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
                        maxLength={100}
                    />
                    {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="gender" className={styles.label}>
                        Giới tính <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`${styles.select} ${errors.gender ? styles.inputError : ''}`}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                    {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dateOfBirth" className={styles.label}>
                        Ngày sinh <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
                    />
                    {errors.dateOfBirth && <span className={styles.errorText}>{errors.dateOfBirth}</span>}
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
                        {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
