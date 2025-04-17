import styles from './modalAccount.module.css'

interface ModalAccountProps {
    showModalAccount: boolean;
    showForm: React.Dispatch<React.SetStateAction<{
        isShow: boolean;
        typeForm: "Login" | "Register";
    }>>
}

const ModalAccount: React.FC<ModalAccountProps> = ({ showModalAccount, showForm }) => {

    function handleButtonLogin() {
        showForm({
            isShow: true,
            typeForm: "Login"
        })
    }

    function handleButtonRegister() {
        showForm({
            isShow: true,
            typeForm: "Register"
        })
    }

    return (
        <div className={`${styles.container} ${showModalAccount && styles.isShow}`}>
            <button onClick={handleButtonLogin}>Đăng Nhập</button>
            <button onClick={handleButtonRegister}>Đăng Kí</button>
        </div>
    )
}

export default ModalAccount;