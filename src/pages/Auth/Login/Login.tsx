import React from "react";
import styles from "./Login.module.css";
import authApi from "../../../services/apis/authApi";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });
    const [error, setError] = React.useState<string | null>(null);
    const [errors, setErrors] = React.useState<{username?: string, password?: string}>({});
    const [loading, setLoading] = React.useState(false);

    const { login: loginApi } = authApi;
    const { login: loginContext } = useAuth();

    const validateForm = () => {
        const newErrors: {username?: string, password?: string} = {};
        if (!formData.username.trim()) {
            newErrors.username = "Tên đăng nhập là bắt buộc";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu là bắt buộc";
        }
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) setError(null);

        if (errors[e.target.name as keyof typeof errors]) {
            setErrors(prev => ({...prev, [e.target.name]: undefined}));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const responseLogin = await loginApi(formData);
            const accessToken = responseLogin.data.accessToken;

            localStorage.setItem("accessToken", accessToken);
            const responseGetProfile = await authApi.getProfile();
            const userProfile = responseGetProfile;

            loginContext({...userProfile.data});

            navigate("/", { replace: true });
        } catch (err: any) {
            console.error("Đăng nhập thất bại:", err);
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className={styles.formLogin} onSubmit={handleSubmit}>
            {error && (
                <p className={styles.errorText} role="alert" aria-live="assertive">{error}</p>
            )}
            <div className={styles.formGroup}>
                <label htmlFor="username">Tên đăng nhập</label>
                <input onChange={handleChange} id="username" name="username" type="text" placeholder="Nhập tên đăng nhập..." />
                {errors.username && <p className={styles.fieldError}>{errors.username}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu</label>
                <input onChange={handleChange} id="password" name="password" type="password" placeholder="Nhập mật khẩu..." />
                {errors.password && <p className={styles.fieldError}>{errors.password}</p>}
            </div>
            <button disabled={loading} type="submit" className={styles.btnLogin}>
                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
        </form>
    );
}

export default Login;