import React, { useState } from "react";
import styles from "./Register.module.css";

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Đăng ký:", { name, email, password, confirmPassword });
    };

    return (
        <form className={styles.formRegister} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Họ và tên</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="username">Tên tài khoản</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên tài khoản..."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại..."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu..."
                />
            </div>
            <button type="submit" className={styles.btnRegister}>Đăng ký</button>
        </form>
    );
};

export default Register;