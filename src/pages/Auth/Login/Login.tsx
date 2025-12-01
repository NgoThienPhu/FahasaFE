import React from "react";
import styles from "./Login.module.css";

const Login: React.FC = () => {
    return (
        <form className={styles.formLogin}>
            <div className={styles.formGroup}>
                <label htmlFor="username">Tên đăng nhập</label>
                <input id="username" type="text" placeholder="Nhập tên đăng nhập..." />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu</label>
                <input id="password" type="password" placeholder="Nhập mật khẩu..." />
            </div>
            <button type="submit" className={styles.btnLogin}>Đăng nhập</button>
        </form>
    );
}

export default Login;