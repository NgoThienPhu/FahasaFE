import styles from './modalAccount.module.css'

interface ModalAccountProps {
    showModalAccount: boolean;
}

const ModalAccount: React.FC<ModalAccountProps> = ({ showModalAccount }) => {
    return (
        <div className={`${styles.container} ${showModalAccount && styles.isShow}`}>
            <button>Đăng Nhập</button>
            <button>Đăng Kí</button>
        </div>
    )
}

export default ModalAccount;