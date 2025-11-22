import React from "react";
import "./Auth.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Auth: React.FC = () => {
    const [tab, setTab] = React.useState<"login" | "register">("login");
    return (
        <div className="authContainer">
            <div className="tabs">
                <button
                    className={`tab ${tab === "login" ? "active" : ""}`}
                    onClick={() => setTab("login")}
                >
                    Đăng nhập
                </button>
                <button
                    className={`tab ${tab === "register" ? "active" : ""}`}
                    onClick={() => setTab("register")}
                >
                    Đăng ký
                </button>
            </div>
            <div className="formContainer">
                {tab === "login" ? <Login /> : <Register />}
            </div>
        </div>
    );
}

export default Auth;