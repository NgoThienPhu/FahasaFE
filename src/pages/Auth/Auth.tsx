import React from "react";
import { Navigate } from "react-router-dom";
import styles from "./Auth.module.css";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";
import { useAuth } from "../../contexts/AuthContext";

const Auth: React.FC = () => {
    const { isAuth } = useAuth();
    const [tab, setTab] = React.useState<"login" | "register">("login");

    if (isAuth) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className={styles.authContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
                    onClick={() => setTab("login")}
                >
                    Đăng nhập
                </button>
                <button
                    className={`${styles.tab} ${tab === "register" ? styles.active : ""}`}
                    onClick={() => setTab("register")}
                >
                    Đăng ký
                </button>
            </div>
            <div className={styles.formContainer}>
                {tab === "login" ? <AuthLogin /> : <AuthRegister />}
            </div>
        </div>
    );
};

export default Auth;
