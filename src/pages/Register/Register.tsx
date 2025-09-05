import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Register.module.css';

const Register: React.FC = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState('');
    const [countdown, setCountdown] = useState(0);

    const handleSendOtp = () => {
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
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register form submitted');
    };

    return (
        <div className={styles.register}>
            <div className={styles.registerContainer}>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <h1>Đăng ký</h1>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="username">Tài khoản</label>
                        <input
                            className={styles.registerFormInput}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Tên tài khoản..."
                            required
                        />
                    </div>

                    <div className={`${styles.registerFormGroup} ${styles.emailGroup}`}>
                        <label htmlFor="email">Email</label>
                        <div className={styles.emailOtpContainer}>
                            <input
                                className={`${styles.registerFormInput} ${styles.emailInput}`}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email..."
                                required
                            />
                            <button
                                type="button"
                                className={`${styles.otpButton} ${otpSent ? styles.otpSent : ''}`}
                                onClick={handleSendOtp}
                                disabled={countdown > 0}
                            >
                                {countdown > 0 ? `${countdown}s` : 'Gửi OTP'}
                            </button>
                        </div>
                    </div>

                    <div className={`${styles.registerFormGroup} ${styles.otpGroup}`}>
                        <label htmlFor="otp">Mã OTP</label>
                        <input
                            className={styles.registerFormInput}
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="Nhập mã OTP..."
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            maxLength={6}
                            required
                        />
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input
                            className={styles.registerFormInput}
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Số điện thoại..."
                            pattern="[0-9]{10,11}"
                            required
                        />
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            className={styles.registerFormInput}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mật khẩu..."
                            minLength={6}
                            required
                        />
                    </div>

                    <div className={styles.registerFormGroup}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            className={styles.registerFormInput}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu..."
                            minLength={6}
                            required
                        />
                    </div>

                    <div className={styles.registerFormGroup}>
                        <button className={styles.registerFormSubmit} type="submit">
                            Đăng ký
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