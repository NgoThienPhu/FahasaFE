import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/hooks/useAuth';
import styles from './Login.module.css';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!formData.username.trim()) {
            errors.username = 'Vui lòng nhập tên tài khoản';
        }

        if (!formData.password) {
            errors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const result = await login(formData.username, formData.password);

        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <h1>Đăng nhập</h1>

                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <div className={styles.loginFormGroup}>
                        <label htmlFor="username">Tài khoản</label>
                        <input
                            className={`${styles.loginFormInput} ${validationErrors.username ? styles.error : ''}`}
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder='Tên tài khoản...'
                        />
                        {validationErrors.username && (
                            <span className={styles.fieldError}>{validationErrors.username}</span>
                        )}
                    </div>

                    <div className={styles.loginFormGroup}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            className={`${styles.loginFormInput} ${validationErrors.password ? styles.error : ''}`}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Mật khẩu...'
                        />
                        {validationErrors.password && (
                            <span className={styles.fieldError}>{validationErrors.password}</span>
                        )}
                    </div>

                    <div className={styles.loginFormGroup}>
                        <button
                            className={styles.loginFormSubmit}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </div>

                    <div className={styles.forgotPassword}>
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </div>

                    <div className={styles.register}>
                        <span>Bạn chưa có tài khoản <Link to="/register">Đăng ký</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;