import React from 'react'
import {
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaTwitter,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from 'react-icons/fa'
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Company Info */}
                    <div className="footer-section">
                        <h3 className="footer-title">Về Fahasa</h3>
                        <div className="company-info">
                            <div className="logo-footer">
                                <span className="logo-text">Fahasa</span>
                                <span className="logo-dot">.com</span>
                            </div>
                            <p className="company-description">
                                Nhà sách trực tuyến hàng đầu Việt Nam, cung cấp sách, văn phòng phẩm và đồ chơi giáo dục chất lượng cao.
                            </p>
                        </div>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-section">
                        <h3 className="footer-title">Hỗ Trợ Khách Hàng</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Hướng dẫn mua hàng</a></li>
                            <li><a href="#" className="footer-link">Chính sách đổi trả</a></li>
                            <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
                            <li><a href="#" className="footer-link">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="footer-link">FAQs</a></li>
                            <li><a href="#" className="footer-link">Liên hệ hỗ trợ</a></li>
                        </ul>
                    </div>

                    {/* Product Categories */}
                    <div className="footer-section">
                        <h3 className="footer-title">Danh Mục Sản Phẩm</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Sách Trong Nước</a></li>
                            <li><a href="#" className="footer-link">Sách Ngoại Văn</a></li>
                            <li><a href="#" className="footer-link">Văn Phòng Phẩm</a></li>
                            <li><a href="#" className="footer-link">Đồ Chơi Giáo Dục</a></li>
                            <li><a href="#" className="footer-link">Sách Giáo Khoa</a></li>
                            <li><a href="#" className="footer-link">Sách Tham Khảo</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3 className="footer-title">Thông Tin Liên Hệ</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <span>1900 636 647</span>
                            </div>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <span>hotro@fahasa.com</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>387-389 Hai Bà Trưng, Q.3, TP.HCM</span>
                            </div>
                        </div>
                        <div className="business-hours">
                            <p><strong>Giờ làm việc:</strong></p>
                            <p>Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                            <p>Thứ 7: 8:00 - 12:00</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>&copy; 2024 Fahasa.com. Tất cả quyền được bảo lưu.</p>
                        </div>
                        <div className="footer-bottom-links">
                            <a href="#" className="bottom-link">Chính sách bảo mật</a>
                            <a href="#" className="bottom-link">Điều khoản sử dụng</a>
                            <a href="#" className="bottom-link">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
