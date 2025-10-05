import React, { useState } from 'react';
import { authApi } from '../../services/api/auth';
import { userApi } from '../../services/api/user';
import type { UserProfile } from '../../services/types/user';
import axios from 'axios';
import { FaExchangeAlt } from 'react-icons/fa';
import styles from './EmailVerification.module.css';

interface EmailVerificationProps {
    user: UserProfile;
    onSuccess: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ user, onSuccess }) => {
    const [otpCode, setOtpCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [changeEmailOtp, setChangeEmailOtp] = useState('');
    const [password, setPassword] = useState('');

    const handleSendOtp = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            
            const response = await authApi.sendOtp({ email: user.email?.email || '' });
            if (response.success) {
                setSuccess('Mã OTP đã được gửi đến email của bạn');
                setIsVerifying(true);
            } else {
                setError(response.message || 'Gửi OTP thất bại');
            }
        } catch (err: unknown) {
            let errorMessage = 'Gửi OTP thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otpCode.trim()) {
            setError('Vui lòng nhập mã OTP');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const response = await authApi.verifyOtp({ 
                email: user.email?.email || '', 
                otp: otpCode 
            });
            if (response.success) {
                setSuccess('Email đã được xác thực thành công');
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            } else {
                setError(response.message || 'Xác thực OTP thất bại');
            }
        } catch (err: unknown) {
            let errorMessage = 'Xác thực OTP thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        await handleSendOtp();
    };

    const handleCancel = () => {
        setIsVerifying(false);
        setOtpCode('');
        setError('');
        setSuccess('');
    };

    const handleChangeEmailClick = () => {
        setIsChangingEmail(true);
        setNewEmail('');
        setChangeEmailOtp('');
        setError('');
        setSuccess('');
    };

    const handleSendChangeEmailOtp = async () => {
        if (!newEmail.trim()) {
            setError('Vui lòng nhập email mới');
            return;
        }

        // Kiểm tra email trùng với email hiện tại
        if (newEmail.trim().toLowerCase() === user.email?.email?.toLowerCase()) {
            setError('Email mới không được trùng với email hiện tại');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setSuccess('');
            
            const response = await authApi.sendOtp({ email: newEmail });
            if (response.success) {
                setSuccess('Mã OTP đã được gửi đến email mới của bạn');
            } else {
                setError(response.message || 'Gửi OTP thất bại');
            }
        } catch (err: unknown) {
            let errorMessage = 'Gửi OTP thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmChangeEmail = async () => {
        if (!newEmail.trim() || !changeEmailOtp.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const response = await userApi.changeEmail({ 
                newEmail: newEmail, 
                otp: changeEmailOtp,
                password: password
            });
            if (response.success) {
                setSuccess('Email đã được thay đổi thành công');
                setTimeout(() => {
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setChangeEmailOtp('');
                    setPassword('');
                    onSuccess();
                }, 1500);
            } else {
                setError(response.message || 'Thay đổi email thất bại');
            }
        } catch (err: unknown) {
            let errorMessage = 'Thay đổi email thất bại';
            if (axios.isAxiosError(err)) {
                errorMessage = (err.response?.data as { message?: string })?.message || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelChangeEmail = () => {
        setIsChangingEmail(false);
        setNewEmail('');
        setChangeEmailOtp('');
        setPassword('');
        setError('');
        setSuccess('');
    };

    return (
        <div className={styles.emailVerification}>
            <div className={styles.emailRow}>
                <span className={styles.label}>Email</span>
                <div className={styles.emailContent}>
                    <span className={styles.value}>{user.email?.email || '—'}</span>
                    {!user.email?.isVerify && !isVerifying && !isChangingEmail && (
                        <button 
                            className={styles.verifyButton}
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Xác thực email'}
                        </button>
                    )}
                    {!isChangingEmail && (
                        <button 
                            className={styles.changeEmailIconButton}
                            onClick={handleChangeEmailClick}
                            disabled={loading}
                            title="Đổi email"
                        >
                            <FaExchangeAlt />
                        </button>
                    )}
                </div>
            </div>

            {!user.email?.isVerify && isVerifying && (
                <div className={styles.verificationForm}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {success && <div className={styles.successMessage}>{success}</div>}
                    
                    <div className={styles.otpForm}>
                        <label htmlFor="otpCode" className={styles.inputLabel}>
                            Nhập mã OTP đã gửi đến email của bạn
                        </label>
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                id="otpCode"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className={styles.otpInput}
                                placeholder="Nhập mã OTP"
                                maxLength={6}
                            />
                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={loading || !otpCode.trim()}
                                className={styles.submitButton}
                            >
                                {loading ? 'Đang xác thực...' : 'Xác thực'}
                            </button>
                        </div>
                        <div className={styles.otpActions}>
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading}
                                className={styles.resendButton}
                            >
                                Gửi lại OTP
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={styles.cancelButton}
                                disabled={loading}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isChangingEmail && (
                <div className={styles.changeEmailForm}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {success && <div className={styles.successMessage}>{success}</div>}
                    
                    <div className={styles.emailInputGroup}>
                        <label htmlFor="newEmail" className={styles.inputLabel}>
                            Email mới
                        </label>
                        <input
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className={styles.emailInput}
                            placeholder="Nhập email mới"
                        />
                        <button
                            type="button"
                            onClick={handleSendChangeEmailOtp}
                            disabled={loading || !newEmail.trim()}
                            className={styles.sendOtpButton}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi OTP'}
                        </button>
                    </div>

                    {success && success.includes('OTP đã được gửi') && (
                        <div className={styles.otpForm}>
                            <label htmlFor="changeEmailOtp" className={styles.inputLabel}>
                                Nhập mã OTP đã gửi đến email mới
                            </label>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    id="changeEmailOtp"
                                    value={changeEmailOtp}
                                    onChange={(e) => setChangeEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className={styles.otpInput}
                                    placeholder="Nhập mã OTP"
                                    maxLength={6}
                                />
                            </div>
                            
                            <div className={styles.passwordGroup}>
                                <label htmlFor="password" className={styles.inputLabel}>
                                    Xác nhận mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.passwordInput}
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                            </div>
                            
                            <div className={styles.submitGroup}>
                                <button
                                    type="button"
                                    onClick={handleConfirmChangeEmail}
                                    disabled={loading || !changeEmailOtp.trim() || !password.trim()}
                                    className={styles.submitButton}
                                >
                                    {loading ? 'Đang xác thực...' : 'Xác nhận đổi email'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            onClick={handleCancelChangeEmail}
                            className={styles.cancelButton}
                            disabled={loading}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailVerification;
