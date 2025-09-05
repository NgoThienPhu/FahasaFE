import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login: React.FC = () => {
    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <form className={styles.loginForm}>
                    <h1>Đăng nhập</h1>
                    <div className={styles.loginFormGroup}>
                        <label htmlFor="username">Tài khoản</label>
                        <input className={styles.loginFormInput} type="text" id="username" name="username" placeholder='Tên tài khoản...' />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input className={styles.loginFormInput} type="password" id="password" name="password" placeholder='Mật khẩu...' />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <button className={styles.loginFormSubmit} type="submit">Đăng nhập</button>
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