import React, { useState } from 'react';
import { authApi } from '../../services/api/auth';
import type { UserProfile } from '../../services/types/auth';
import axios from 'axios';
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

    return (
        <div className={styles.emailVerification}>
            <div className={styles.emailRow}>
                <span className={styles.label}>Email</span>
                <div className={styles.emailContent}>
                    <span className={styles.value}>{user.email?.email || '—'}</span>
                    {!user.email?.isVerify && (
                        <>
                            <span className={`${styles.badge} ${styles.badgeWarning}`}>
                                Chưa xác thực
                            </span>
                            {!isVerifying && (
                                <button 
                                    className={styles.verifyButton}
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang gửi...' : 'Xác thực email'}
                                </button>
                            )}
                        </>
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
        </div>
    );
};

export default EmailVerification;
