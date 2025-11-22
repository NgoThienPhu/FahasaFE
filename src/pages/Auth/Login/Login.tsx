import React from "react";
import "./Login.css";

const Login: React.FC = () => {
    return (
        <form className="formLogin">
            <div className="formGroup">
                <label htmlFor="username">Tên đăng nhập</label>
                <input id="username" type="text" placeholder="Nhập tên đăng nhập..." />
            </div>
            <div className="formGroup">
                <label htmlFor="password">Mật khẩu</label>
                <input id="password" type="password" placeholder="Nhập mật khẩu..." />
            </div>
            <button type="submit" className="btnLogin">Đăng nhập</button>
        </form>
    );
}

export default Login;