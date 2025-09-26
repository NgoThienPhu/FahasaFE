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

            <section className={styles.bestSellers}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Sách bán chạy</h2>
                    <div className={styles.booksGrid}>
                        <div className={styles.bookCard}>
                            <div className={styles.bookCover}>S1</div>
                            <h3 className={styles.bookTitle}>Đắc Nhân Tâm</h3>
                            <p className={styles.bookAuthor}>Dale Carnegie</p>
                            <div className={styles.bookMeta}>
                                <span className={styles.bookPrice}>95.000₫</span>
                                <span className={styles.bookRating}>★ 4.8</span>
                            </div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                            </button>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookCover}>S2</div>
                            <h3 className={styles.bookTitle}>Nhà Giả Kim</h3>
                            <p className={styles.bookAuthor}>Paulo Coelho</p>
                            <div className={styles.bookMeta}>
                                <span className={styles.bookPrice}>89.000₫</span>
                                <span className={styles.bookRating}>★ 4.7</span>
                            </div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                            </button>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookCover}>S3</div>
                            <h3 className={styles.bookTitle}>Tuổi Trẻ Đáng Giá Bao Nhiêu</h3>
                            <p className={styles.bookAuthor}>Rosie Nguyễn</p>
                            <div className={styles.bookMeta}>
                                <span className={styles.bookPrice}>75.000₫</span>
                                <span className={styles.bookRating}>★ 4.6</span>
                            </div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                            </button>
                        </div>
                        <div className={styles.bookCard}>
                            <div className={styles.bookCover}>S4</div>
                            <h3 className={styles.bookTitle}>Atomic Habits</h3>
                            <p className={styles.bookAuthor}>James Clear</p>
                            <div className={styles.bookMeta}>
                                <span className={styles.bookPrice}>120.000₫</span>
                                <span className={styles.bookRating}>★ 4.9</span>
                            </div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.history}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Lịch sử hình thành</h2>
                    <div className={styles.timeline}>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineYear}>1976</h3>
                                <p className={styles.timelineText}>
                                    Tiền thân của Fahasa được thành lập, đặt nền móng cho hệ thống phân phối sách
                                    và văn hóa phẩm tại Việt Nam.
                                </p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineYear}>2005</h3>
                                <p className={styles.timelineText}>
                                    Mở rộng hệ thống nhà sách hiện đại trên toàn quốc, đa dạng hóa danh mục sản phẩm
                                    từ sách, văn phòng phẩm đến đồ chơi giáo dục.
                                </p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineYear}>2014</h3>
                                <p className={styles.timelineText}>
                                    Ra mắt nền tảng thương mại điện tử, mang trải nghiệm mua sắm sách trực tuyến tiện lợi
                                    đến với hàng triệu khách hàng.
                                </p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <div className={styles.timelineDot}></div>
                            <div className={styles.timelineContent}>
                                <h3 className={styles.timelineYear}>Hiện nay</h3>
                                <p className={styles.timelineText}>
                                    Tiếp tục đổi mới, nâng cao chất lượng dịch vụ và không ngừng phát triển hệ sinh thái
                                    văn hóa đọc tại Việt Nam.
                                </p>
                            </div>
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
