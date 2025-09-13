import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../services/hooks/useAuth';
import styles from './Register.module.css';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register, sendOtp, loading } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        otpCode: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            errors.fullName = 'Họ và tên là bắt buộc';
        } else if (formData.fullName.length < 2) {
            errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
        }

        if (!formData.username.trim()) {
            errors.username = 'Tên tài khoản là bắt buộc';
        } else if (formData.username.length < 3) {
            errors.username = 'Tên tài khoản phải có ít nhất 3 ký tự';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại phải có 10-11 chữ số';
        }

        if (!formData.password) {
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (!otpSent) {
            errors.otp = 'Vui lòng gửi và nhập mã OTP';
        } else if (!formData.otpCode.trim()) {
            errors.otp = 'Mã OTP là bắt buộc';
        } else if (formData.otpCode.length !== 6) {
            errors.otp = 'Mã OTP phải có 6 chữ số';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSendOtp = async () => {
        if (!formData.email.trim()) {
            setFormErrors(prev => ({ ...prev, email: 'Vui lòng nhập email trước khi gửi OTP' }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setFormErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
            return;
        }

        try {
            const result = await sendOtp(formData.email);
            if (result.success) {
                setOtpSent(true);
                setCountdown(60);
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                setFormErrors(prev => ({ ...prev, email: result.error || 'Không thể gửi OTP' }));
            }
        } catch {
            setFormErrors(prev => ({ ...prev, email: 'Lỗi khi gửi OTP' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await register(formData);

            if (result.success) {
                navigate('/login', {
                    state: {
                        message: 'Đăng ký thành công! Vui lòng đăng nhập.'
                    }
                });
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    general: result.error || 'Đăng ký thất bại'
                }));
            }
        } catch {
            setFormErrors(prev => ({
                ...prev,
                general: 'Có lỗi xảy ra, vui lòng thử lại'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.register}>
            <div className={styles.registerContainer}>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>

                    {formErrors.general && (
                        <div className={styles.errorMessage}>
                            {formErrors.general}
                        </div>
                    )}

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="fullName">Họ và tên</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.fullName ? styles.error : ''}`}
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Họ và tên..."
                        />
                        {formErrors.fullName && (
                            <span className={styles.fieldError}>{formErrors.fullName}</span>
                        )}
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="username">Tài khoản</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.username ? styles.error : ''}`}
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Tên tài khoản..."
                        />
                        {formErrors.username && (
                            <span className={styles.fieldError}>{formErrors.username}</span>
                        )}
                    </div>

                    <div className={`${styles.registerFormGroup} ${styles.emailGroup}`}>
                        <label htmlFor="email">Email</label>
                        <div className={styles.emailOtpContainer}>
                            <input
                                className={`${styles.registerFormInput} ${styles.emailInput} ${formErrors.email ? styles.error : ''}`}
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email..."
                            />
                            <button
                                type="button"
                                className={`${styles.otpButton} ${otpSent ? styles.otpSent : ''}`}
                                onClick={handleSendOtp}
                                disabled={countdown > 0 || loading}
                            >
                                {loading ? 'Đang gửi...' : countdown > 0 ? `${countdown}s` : 'Gửi OTP'}
                            </button>
                        </div>
                        {formErrors.email && (
                            <span className={styles.fieldError}>{formErrors.email}</span>
                        )}
                    </div>

                    <div className={`${styles.registerFormGroup} ${styles.otpGroup}`}>
                        <label htmlFor="otp">Mã OTP</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.otp ? styles.error : ''}`}
                            type="text"
                            id="otp"
                            name="otpCode"
                            value={formData.otpCode}
                            onChange={handleInputChange}
                            placeholder="Nhập mã OTP..."
                            maxLength={6}
                        />
                        {formErrors.otp && (
                            <span className={styles.fieldError}>{formErrors.otp}</span>
                        )}
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.phoneNumber ? styles.error : ''}`}
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Số điện thoại..."
                        />
                        {formErrors.phoneNumber && (
                            <span className={styles.fieldError}>{formErrors.phoneNumber}</span>
                        )}
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.password ? styles.error : ''}`}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Mật khẩu..."
                            minLength={6}
                        />
                        {formErrors.password && (
                            <span className={styles.fieldError}>{formErrors.password}</span>
                        )}
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            className={`${styles.registerFormInput} ${formErrors.confirmPassword ? styles.error : ''}`}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Xác nhận mật khẩu..."
                            minLength={6}
                        />
                        {formErrors.confirmPassword && (
                            <span className={styles.fieldError}>{formErrors.confirmPassword}</span>
                        )}
                    </div>

                    <div className={styles.registerFormGroup}>
                        <button
                            className={styles.registerFormSubmit}
                            type="submit"
                            disabled={isSubmitting || loading}
                        >
                            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>
                    </div>

                    <div className={styles.loginLink}>
                        <span>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;