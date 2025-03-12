import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './modalNotification.module.css'
import { faBell } from '@fortawesome/free-regular-svg-icons';

interface ModalNotificationProps {
    showModalNotification: boolean;
}

const ModelNotification: React.FC<ModalNotificationProps> = ({ showModalNotification }) => {
    return (
        <div className={`${styles.container} ${showModalNotification && styles.isShow}`}>
            <div className={styles.header}>
                <FontAwesomeIcon icon={faBell} color='black' size={"xl"} />
                <p>Thông báo</p>
            </div>
            <div className={styles.body}>
                <img alt='not item' src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/customer/ico_login.svg' width={"80px"} />
                <p className={styles.description}>Vui lòng đăng nhập để xem thông báo</p>
                <button>Đăng Nhập</button>
                <button>Đăng Ký</button>
            </div>
        </div>
    )
}

export default ModelNotification;