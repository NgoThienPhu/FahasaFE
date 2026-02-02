import React from "react";
import styles from "./Auth.module.css";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";

const Auth: React.FC = () => {
    const [tab, setTab] = React.useState<"login" | "register">("login");
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
