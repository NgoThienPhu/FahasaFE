import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css'
import { useState } from 'react';
import ModalMenu from './modal_menu/ModalMenu';
import ModelNotification from './modal_notification/ModalNotification';
import ModalAccount from './modal_account/ModalAccount';
import Overlay from '../../../conponents/Overlay';
import FormLoginRegister from '../../../conponents/form_login_register/FormLoginRegister';

interface HeaderProps {
    setIsOverlayBody: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsOverlayBody }) => {

    const [showModalMenu, setShowModalMenu] = useState(false);
    const [showModalNotification, setShowNotification] = useState(false);
    const [showModalAccount, setShowModalAccount] = useState(false);
    const [isShowFormModal, setIsShowFormModal] = useState<{ isShow: boolean, typeForm: "Login" | "Register" }>({
        isShow: false,
        typeForm: "Register"
    });

    function handleOnClickOverlayForm() {
        setIsShowFormModal({
            ...isShowFormModal,
            isShow: false
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.banner}>
                    <a href='#'><img alt='banner' src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png' width={"220px"} /></a>
                </div>
                <div className={styles.search}>
                    <div className={styles.menu}
                        onMouseMove={() => {
                            setShowModalMenu(true);
                            setIsOverlayBody(true);
                        }}
                        onMouseLeave={() => {
                            setShowModalMenu(false);
                            setIsOverlayBody(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faCaretDown} size='2x' color='#c92127' />
                        <ModalMenu
                            showModalMenu={showModalMenu}
                        />
                    </div>
                    <div className={styles.inputSearch}>
                        <input type='text' placeholder='50 Đề Minh Họa Tốt Nghiệp' />
                        <button>
                            <FontAwesomeIcon icon={faSearch} size='xl' color='white' />
                        </button>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.notify}
                        onMouseMove={() => setShowNotification(true)}
                        onMouseLeave={() => setShowNotification(false)}
                    >
                        <FontAwesomeIcon icon={faBell} size='xl' color='gray' />
                        <p>Thông báo</p>
                        <ModelNotification
                            showModalNotification={showModalNotification}
                            showForm={setIsShowFormModal}
                        />
                    </div>
                    <div className={styles.cart}>
                        <FontAwesomeIcon icon={faCartShopping} size='xl' color='gray' />
                        <p>Giỏ hàng</p>
                    </div>
                    <div className={styles.account}
                        onMouseMove={() => setShowModalAccount(true)}
                        onMouseLeave={() => setShowModalAccount(false)}
                    >
                        <FontAwesomeIcon icon={faUser} size='xl' color='gray' />
                        <p>Tài khoản</p>
                        <ModalAccount
                            showModalAccount={showModalAccount}
                            showForm={setIsShowFormModal}
                        />
                    </div>
                </div>
            </div>
            {
                isShowFormModal.isShow &&
                <Overlay
                    handleOnClick={handleOnClickOverlayForm}
                >
                    <FormLoginRegister
                        isShowForm={isShowFormModal}
                        typeForm={isShowFormModal.typeForm}
                        showForm={setIsShowFormModal}
                    />
                </Overlay>
            }
        </div>
    )
}

export default Header;