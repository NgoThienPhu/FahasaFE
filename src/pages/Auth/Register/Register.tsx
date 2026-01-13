import React, { useState } from "react";
import styles from "./Register.module.css";
import authApi from "../../../services/apis/authApi";
import type { APIResponseError } from "../../../services/apis/config";

const Register: React.FC = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { register } = authApi;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError(null);
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Họ và tên là bắt buộc";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
        }

        if (!formData.username.trim()) {
            newErrors.username = "Tên tài khoản là bắt buộc";
        } else if (formData.username.length < 3) {
            newErrors.username = "Tên tài khoản phải có ít nhất 3 ký tự";
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = "Tên tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Số điện thoại là bắt buộc";
        } else if (!/^(0|\+84)[3-9][0-9]{8}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
            newErrors.phoneNumber = "Số điện thoại không hợp lệ (VD: 0987654321)";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu là bắt buộc";
        } else if (formData.password.length < 8) {
            newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
            newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            await register(formData);
        } catch (err: any) {
            const response = err as APIResponseError;
            if(response.errors) setErrors(response.errors);
            setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
            console.error("Đăng ký thất bại:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.formRegister} onSubmit={handleSubmit}>
            {error && (
                <p className={styles.errorText} role="alert" aria-live="assertive">{error}</p>
            )}
            <div className={styles.formGroup}>
                <label htmlFor="fullName">Họ và tên</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên..."
                />
                {errors.fullName && <p className={styles.fieldError}>{errors.fullName}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="username">Tên tài khoản</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập tên tài khoản..."
                />
                {errors.username && <p className={styles.fieldError}>{errors.username}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Số điện thoại</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại..."
                />
                {errors.phoneNumber && <p className={styles.fieldError}>{errors.phoneNumber}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email..."
                />
                {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu..."
                />
                {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Xác nhận mật khẩu..."
                />
                {errors.confirmPassword && <p className={styles.fieldError}>{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className={styles.btnRegister}>
                {loading ? "Đang đăng ký..." : "Đăng Ký"}
            </button>
        </form>
    );
};

export default Register;