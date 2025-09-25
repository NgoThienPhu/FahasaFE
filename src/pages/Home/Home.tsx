import React from 'react'
import styles from './Home.module.css'
import { FaBook, FaShoppingCart, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa'

const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Khám phá thế giới sách với <span className={styles.highlight}>Fahasa</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Hơn 100,000 đầu sách từ trong nước và quốc tế, văn phòng phẩm chất lượng cao
                            và đồ chơi giáo dục cho mọi lứa tuổi.
                        </p>
                        <div className={styles.heroActions}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                <FaShoppingCart className={styles.btnIcon} />
                                Mua sắm ngay
                            </button>
                            <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                <FaBook className={styles.btnIcon} />
                                Khám phá sách
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.heroBooks}>
                            <div className={`${styles.book} ${styles.book1}`}></div>
                            <div className={`${styles.book} ${styles.book2}`}></div>
                            <div className={`${styles.book} ${styles.book3}`}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Tại sao chọn Fahasa?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaTruck />
                            </div>
                            <h3 className={styles.featureTitle}>Giao hàng nhanh</h3>
                            <p className={styles.featureDescription}>
                                Giao hàng trong 24h tại TP.HCM và Hà Nội, 2-3 ngày tại các tỉnh thành khác
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaShieldAlt />
                            </div>
                            <h3 className={styles.featureTitle}>Sản phẩm chính hãng</h3>
                            <p className={styles.featureDescription}>
                                100% sách và sản phẩm chính hãng, cam kết chất lượng và nguồn gốc rõ ràng
                            </p>
                        </div>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaHeadset />
                            </div>
                            <h3 className={styles.featureTitle}>Hỗ trợ 24/7</h3>
                            <p className={styles.featureDescription}>
                                Đội ngũ chăm sóc khách hàng chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.categories}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Danh mục sản phẩm</h2>
                    <div className={styles.categoriesGrid}>
                        <div className={styles.categoryCard}>
                            <div className={styles.categoryImage}>
                                <FaBook />
                            </div>
                            <h3 className={styles.categoryTitle}>Sách Trong Nước</h3>
                            <p className={styles.categoryDescription}>Sách văn học, kinh tế, kỹ năng sống</p>
                        </div>
                        <div className={styles.categoryCard}>
                            <div className={styles.categoryImage}>
                                <FaBook />
                            </div>
                            <h3 className={styles.categoryTitle}>Sách Ngoại Văn</h3>
                            <p className={styles.categoryDescription}>Sách tiếng Anh, tiếng Nhật, tiếng Hàn</p>
                        </div>
                        <div className={styles.categoryCard}>
                            <div className={styles.categoryImage}>
                                <FaBook />
                            </div>
                            <h3 className={styles.categoryTitle}>Văn Phòng Phẩm</h3>
                            <p className={styles.categoryDescription}>Bút, vở, dụng cụ học tập</p>
                        </div>
                        <div className={styles.categoryCard}>
                            <div className={styles.categoryImage}>
                                <FaBook />
                            </div>
                            <h3 className={styles.categoryTitle}>Đồ Chơi Giáo Dục</h3>
                            <p className={styles.categoryDescription}>Đồ chơi phát triển trí tuệ</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <div className={styles.newsletterContent}>
                        <h2 className={styles.newsletterTitle}>Đăng ký nhận tin</h2>
                        <p className={styles.newsletterDescription}>
                            Nhận thông tin về sách mới, khuyến mãi đặc biệt và ưu đãi độc quyền
                        </p>
                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className={styles.newsletterInput}
                            />
                            <button className={`${styles.btn} ${styles.btnPrimary}`}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
