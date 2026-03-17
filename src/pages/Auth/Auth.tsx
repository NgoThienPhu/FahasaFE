import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";
import { useAuth } from "../../contexts/AuthContext";

const Auth: React.FC = () => {
    const { isAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const tabFromUrl = React.useMemo(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get("tab");
        return tab === "register" ? "register" : "login";
    }, [location.search]);

    const [tab, setTab] = React.useState<"login" | "register">(tabFromUrl);

    React.useEffect(() => {
        setTab(tabFromUrl);
    }, [tabFromUrl]);

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    const changeTab = (next: "login" | "register") => {
        setTab(next);
        const params = new URLSearchParams(location.search);
        params.set("tab", next);
        navigate({ pathname: "/auth", search: params.toString() }, { replace: true });
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
                    onClick={() => changeTab("login")}
                >
                    Đăng nhập
                </button>
                <button
                    className={`${styles.tab} ${tab === "register" ? styles.active : ""}`}
                    onClick={() => changeTab("register")}
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
