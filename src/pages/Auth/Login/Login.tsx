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
    const [loading, setLoading] = React.useState(false);

    const { login: loginApi } = authApi;
    const { login: loginContext } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (error) setError(null);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const responseLogin = await loginApi(formData);
            const accessToken = responseLogin.data.data.accessToken;

            localStorage.setItem("accessToken", accessToken);
            const responseGetProfile = await authApi.getProfile();
            const userProfile = responseGetProfile.data.data;

            loginContext({...userProfile});

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
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu</label>
                <input onChange={handleChange} id="password" name="password" type="password" placeholder="Nhập mật khẩu..." />
            </div>
            <button disabled={loading} type="submit" className={styles.btnLogin}>
                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
        </form>
    );
}

export default Login;