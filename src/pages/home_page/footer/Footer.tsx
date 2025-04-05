import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.css';
import { faFacebook, faInstagram, faSquarePinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import FooterLinks from './footer_link/FooterLinks';
import FooterLink from './footer_link/FooterLink';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLeft}>
                    <div className={styles.logoApp}>
                        <img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png' alt='logo-banner' />
                    </div>
                    <p className={styles.address}>
                        <span>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</span>
                        <br />
                        <span>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</span>
                        <br />
                        <span>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</span>
                    </p>
                    <p className={styles.description}>
                        <span>Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.</span>
                        <br />
                        <span>KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng</span>
                        <br />
                        <span>cũng như tất cả Hệ Thống Fahasa trên toàn quốc.</span>
                    </p>
                    <div className={styles.logoMOIT}>
                        <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png' alt="logo-MOIT" />
                    </div>
                    <div className={styles.socialNetWork}>
                        <FontAwesomeIcon icon={faFacebook} size='2x' color='gray' />
                        <FontAwesomeIcon icon={faInstagram} size='2x' color='gray' />
                        <FontAwesomeIcon icon={faYoutube} size='2x' color='gray' />
                        <FontAwesomeIcon icon={faTwitter} size='2x' color='gray' />
                        <FontAwesomeIcon icon={faSquarePinterest} size='2x' color='gray' />
                    </div>
                    <div className={styles.downloadApp}>
                        <div className={styles.app}>
                            <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png' alt='google-play-img' />
                        </div>
                        <div className={styles.app}>
                            <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png' alt='app-store-img' />
                        </div>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.footerLinks}>
                        <FooterLinks lable='DỊCH VỤ'>
                            <FooterLink text='Điều khoản sử dụng' />
                            <FooterLink text='Chính sách bảo mật thông tin cá nhân' />
                            <FooterLink text='Chính sách bảo mật thanh toán' />
                            <FooterLink text='Giới thiệu Fahasa' />
                            <FooterLink text='Hệ thống trung tâm - nhà sách' />
                        </FooterLinks>
                        <FooterLinks lable='HỖ TRỢ'>
                            <FooterLink text='Chính sách đổi - trả - hoàn tiền' />
                            <FooterLink text='Chính sách bảo hành - bồi hoàn' />
                            <FooterLink text='Chính sách vận chuyển' />
                            <FooterLink text='Chính sách khách sỉ' />
                        </FooterLinks>
                        <FooterLinks lable='TÀI KHOẢN CỦA TÔI'>
                            <FooterLink text='Đăng nhập/Tạo mới tài khoản' />
                            <FooterLink text='Thay đổi địa chỉ khách hàng' />
                            <FooterLink text='Chi tiết tài khoản' />
                            <FooterLink text='Lịch sử mua hàng' />
                        </FooterLinks>
                    </div>
                    <p className={styles.contact}>LIÊN HỆ</p>
                    <div className={styles.information}>
                        <div className={styles.address}>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} size='1x' /> 60-62 Lê Lợi, Q.1, TP. HCM
                            </p>
                        </div>
                        <div className={styles.email}>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} size='1x' /> cskh@fahasa.com.vn
                            </p>
                        </div>
                        <div className={styles.phone}>
                            <p>
                                <FontAwesomeIcon icon={faPhone} size='1x' /> 0347191932
                            </p>
                        </div>
                    </div>
                    <div className={styles.brands}>
                        <div className={styles.brand}>
                            <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo_lex.jpg' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png' alt='brand-image' />
                        </div>
                        <div className={styles.brand}>
                            <img src='https://cdn1.fahasa.com/media//wysiwyg/Logo-NCC/logo_zalopay_2.png' alt='brand-image' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <p>Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.</p>
            </div>
        </div>
    )
}

export default Footer;