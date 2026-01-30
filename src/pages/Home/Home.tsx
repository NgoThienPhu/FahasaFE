import React from "react";
import styles from "./Home.module.css";
import BookCard from "../../components/book_card/BookCard";
import { NavLink } from "react-router-dom";
import { FiBook, FiBookOpen } from "react-icons/fi";

const books = [
    { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", desc: "Hành trình tìm kiếm giấc mơ và bản thân.", price: "149.000₫", rating: 4.6 },
    { id: 2, title: "Lược Sử Thời Gian", author: "Stephen Hawking", desc: "Khám phá vũ trụ và những bí ẩn của thời gian.", price: "220.000₫", rating: 4.7 },
    { id: 3, title: "Đắc Nhân Tâm", author: "Dale Carnegie", desc: "Những nguyên tắc vàng để thành công trong cuộc sống.", price: "129.000₫", rating: 4.5 },
    { id: 4, title: "Sapiens", author: "Yuval Noah Harari", desc: "Lịch sử loài người nhìn từ góc độ khác.", price: "195.000₫", rating: 4.8 },
];

const Home: React.FC = () => {
    return (
        <div className={styles.homeContainer}>
            <section className={styles.homeHero}>
                <h1 id="home-title" className={styles.heroTitle}>
                    <strong>Fahasa</strong> — Khám phá bộ sưu tập sách
                </h1>
                <p className={styles.heroSubtitle}>
                    Từ tiểu thuyết, khoa học đến sách phát triển bản thân.
                </p>
                <div className={styles.heroActions}>
                    <a className={styles.btnPrimary} href="#featured">
                        <FiBookOpen size={16} />
                        Khám phá sách
                    </a>
                    <NavLink className={styles.btnSecondary} to="/products">
                        <FiBook size={16} />
                        Tất cả sản phẩm
                    </NavLink>
                </div>
            </section>

            <div id="featured" className={styles.homeContent}>
                <div className={styles.featuredSection}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge} aria-hidden>
                            <FiBook size={16} />
                        </span>
                        <h2 className={styles.sectionTitle}>Sách nổi bật</h2>
                    </div>
                    <div className={styles.bookGrid}>
                    {books.map((b) => (
                        <BookCard
                            key={b.id}
                            id={b.id}
                            title={b.title}
                            author={b.author}
                            desc={b.desc}
                            price={b.price}
                            rating={b.rating}
                        />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
