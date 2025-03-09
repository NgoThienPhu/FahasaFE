import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css'

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.banner}>
                <a href='#'><img alt='banner' src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png' width={"220px"} /></a>
            </div>
            <div className={styles.search}>
                <div className={styles.menu}>
                    <FontAwesomeIcon icon={faCaretDown} size='2x' color='#c92127' />
                </div>
                <div className={styles.inputSearch}>
                    <input type='text' placeholder='50 Đề Minh Họa Tốt Nghiệp' />
                    <button>
                        <FontAwesomeIcon icon={faSearch} size='xl' color='white' />
                    </button>
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.notify}>
                    <FontAwesomeIcon icon={faBell} size='xl' color='gray' />
                    <p>Thông báo</p>
                </div>
                <div className={styles.cart}>
                    <FontAwesomeIcon icon={faCartShopping} size='xl' color='gray' />
                    <p>Giỏ hàng</p>
                </div>
                <div className={styles.account}>
                    <FontAwesomeIcon icon={faUser} size='xl' color='gray' />
                    <p>Tài khoản</p>
                </div>
            </div>
        </div>
    )
}

export default Header;