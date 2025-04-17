import { useEffect, useState } from 'react';
import styles from './formLoginRegister.module.css';
import Tab from './Tab';

interface FormLoginProps {
    typeForm: "Login" | "Register";
    isShowForm: {
        isShow: boolean;
        typeForm: "Login" | "Register";
    }
    showForm: React.Dispatch<React.SetStateAction<{
        isShow: boolean;
        typeForm: "Login" | "Register";
    }>>
}

const FormLogin: React.FC<FormLoginProps> = (props) => {

    const [tabNumber, setTabNumber] = useState<"Login" | "Register">("Register");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, [])

    useEffect(() => {
        if (props.typeForm === "Login") setTabNumber("Login");
        else setTabNumber("Register");
    }, [props.typeForm])

    function handleCancelButton() {
        setIsVisible(false);
        setTimeout(() => {
            props.showForm({ ...props.isShowForm, isShow: false })
        }, 500)
    }

    function handleOnclickForm(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
    }

    return (
        <div
            onClick={handleOnclickForm}
            className={`${styles.container} ${isVisible ? styles.fromVisible : styles.fromHidden}`}
        >
            <div className={styles.header}>
                <Tab
                    tabName='Đăng nhập'
                    isActive={tabNumber === "Login"}
                    handleOnClick={setTabNumber}
                />
                <Tab
                    tabName='Đăng kí'
                    isActive={tabNumber === "Register"}
                    handleOnClick={setTabNumber}
                />
            </div>
            {
                tabNumber === "Register" ?
                    <div className={styles.body}>
                        <div className={styles.inputGroup}>
                            <p>Số điện thoại</p>
                            <input placeholder='Nhập số điện thoại' />
                        </div>
                        <div className={styles.inputGroup}>
                            <p>Mã xác nhận OTP</p>
                            <input placeholder='6 Ký tự' />
                        </div>
                        <div className={styles.inputGroup}>
                            <p>Mật khẩu</p>
                            <input placeholder='Nhập mật khẩu' />
                        </div>
                    </div>
                    :
                    <div className={styles.body}>
                        <div className={styles.inputGroup}>
                            <p>Số điện thoại/Email</p>
                            <input placeholder='Nhập số điện thoại hoặc email' />
                        </div>
                        <div className={styles.inputGroup}>
                            <p>Mật khẩu</p>
                            <input placeholder='Nhập mật khẩu' />
                        </div>
                    </div>
            }
            <div className={styles.buttonGroup}>
                <button className={styles.register}>{tabNumber === "Login" ? "Đăng nhập" : "Đăng kí"}</button>
                <button
                    className={styles.cancel}
                    onClick={handleCancelButton}
                >
                    Bỏ Qua
                </button>
            </div>
            <div className={styles.description}>
                <p>Bằng việc đăng ký, bạn đã đồng ý với Fahasa.com về</p>
                <p><span className={styles.hideLine}>Điều khoản dịch vụ</span>  &  <span className={styles.hideLine}>Chính sách bảo mật</span></p>
            </div>
        </div>
    )
}

export default FormLogin;