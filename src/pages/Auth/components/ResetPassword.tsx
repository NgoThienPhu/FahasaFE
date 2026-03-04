import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import authApi from "../../../services/apis/authApi";
import Loading from "../../../components/Loading/Loading";
import { useNotification } from "../../../contexts/NotificationContext";
import type { APIResponseError } from "../../../services/apis/config";

type Status = "checking" | "invalid" | "ready" | "success";

const MIN_PASSWORD_LENGTH = 8;
const STRONG_PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const ressetPasswordToken = searchParams.get("ressetPasswordToken") || "";

    const [status, setStatus] = useState<Status>("checking");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { addNotification } = useNotification();

    // Chuyển trạng thái đổi mật khẩu thành công
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Dùng ref để nhớ lần đặt lại password thành công, tránh useEffect chạy lại đổi trạng thái thành invalid
    const didResetSuccess = useRef(false);

    // Kiểm tra token khi vừa vào trang (chỉ chạy khi chưa đặt lại thành công)
    useEffect(() => {
        if (didResetSuccess.current) return;
        if (!ressetPasswordToken) {
            setStatus("invalid");
            setError("Liên kết không hợp lệ hoặc đã hết hạn.");
            return;
        }

        authApi
            .verifyResetPasswordToken({ ressetPasswordToken })
            .then((res) => {
                setStatus(res.data.valid ? "ready" : "invalid");
                if (!res.data.valid) {
                    setError("Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ.");
                }
            })
            .catch((e: APIResponseError) => {
                setStatus("invalid");
                setError("Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ.");
                addNotification(
                    "error",
                    e?.message ||
                    "Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ."
                );
            });
    }, [ressetPasswordToken, addNotification]);

    // Validate mật khẩu
    const validate = useCallback((): string | null => {
        if (!password.trim() || !confirmPassword.trim()) {
            return "Vui lòng nhập đầy đủ mật khẩu mới và xác nhận.";
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return "Mật khẩu phải có ít nhất 8 ký tự";
        }
        if (!STRONG_PASSWORD_REGEX.test(password)) {
            return "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
        }
        if (password !== confirmPassword) {
            return "Mật khẩu xác nhận không khớp";
        }
        return null;
    }, [password, confirmPassword]);

    // Hiển thị lỗi và cập nhật trạng thái invalid
    const handleInvalidToken = useCallback(
        (msg?: string) => {
            setStatus("invalid");
            setError(
                msg ||
                "Phiên yêu cầu không hợp lệ hoặc đã hết hạn. Vui lòng thử lại từ liên kết mới nhất."
            );
            addNotification(
                "error",
                "Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email."
            );
        },
        [addNotification]
    );

    // Xử lý gửi form đặt lại mật khẩu
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await authApi.ressetPassword({ ressetPasswordToken, newPassword: password });
            setStatus("success");
            setShowSuccessAlert(true);
            didResetSuccess.current = true; // đánh dấu đã đổi pass thành công
            addNotification(
                "success",
                "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại."
            );
        } catch (err: any) {
            const apiError = err as APIResponseError;
            if (apiError.status === 401) {
                try {
                    const { data } = await authApi.verifyResetPasswordToken({ ressetPasswordToken });
                    if (!data.valid) {
                        handleInvalidToken();
                        return;
                    }
                    setError("Yêu cầu đặt lại mật khẩu không thành công. Vui lòng thử lại sau.");
                    addNotification(
                        "error",
                        apiError.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại sau."
                    );
                } catch {
                    handleInvalidToken();
                }
            } else {
                setError(
                    apiError.message ||
                    "Yêu cầu đặt lại mật khẩu đã hết hạn hoặc không hợp lệ."
                );
                addNotification(
                    "error",
                    apiError.message ||
                    "Đặt lại mật khẩu thất bại. Vui lòng thử lại sau."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Hiển thị các trạng thái giao diện
    if (status === "checking") {
        return <Loading notify="Đang kiểm tra liên kết..." />;
    }

    if (status === "success") {
        return (
            <div className={styles.resetContainer}>
                <div className={styles.card}>
                    {showSuccessAlert && (
                        <div className={styles.successAlert}>
                            <strong>Đổi mật khẩu thành công!</strong>
                            <span> Bạn có thể đăng nhập bằng mật khẩu mới.</span>
                        </div>
                    )}
                    <h1 className={styles.title}>Đặt lại mật khẩu thành công</h1>
                    <p className={styles.subtitle}>
                        Vì lý do bảo mật, nếu bạn không phải là người thực hiện yêu cầu này,
                        hãy liên hệ với chúng tôi hoặc đổi mật khẩu một lần nữa.
                    </p>
                    <div className={styles.actionsRow}>
                        <NavLink to="/auth" className={styles.btnPrimary}>
                            Quay lại đăng nhập
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "invalid") {
        // Ngăn sau khi thành công mà lại hiển thị giao diện invalid nếu trạng thái trong ref
        if (didResetSuccess.current) return null;
        return (
            <div className={styles.resetContainer}>
                <div className={`${styles.card} ${styles.cardError}`}>
                    <h1 className={styles.title}>Liên kết đã hết hạn hoặc không hợp lệ</h1>
                    <p className={styles.subtitle}>
                        Có thể bạn đã sử dụng lại một liên kết cũ hoặc liên kết đã được dùng trước đó.
                        Để tiếp tục, hãy yêu cầu gửi lại email đặt lại mật khẩu từ trang đăng nhập.
                    </p>
                    {error && <p className={styles.errorText}>{error}</p>}
                    <div className={styles.actionsRow}>
                        <NavLink to="/auth" className={styles.btnPrimary}>
                            Quay lại trang đăng nhập
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    // Giao diện mặc định: nhập mật khẩu mới
    return (
        <div className={styles.resetContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>Đặt lại mật khẩu</h1>
                <p className={styles.subtitle}>
                    Nhập mật khẩu mới cho tài khoản của bạn. Vui lòng không chia sẻ liên kết này cho bất kỳ ai.
                </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && <p className={styles.errorText}>{error}</p>}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Mật khẩu mới</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới..."
                            disabled={submitting}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu mới..."
                            disabled={submitting}
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.btnPrimary}
                        disabled={submitting}
                    >
                        {submitting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
