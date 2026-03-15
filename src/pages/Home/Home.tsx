import React from "react";
import styles from "./Home.module.css";
import BookCard from "../../components/book_card/BookCard";
import { NavLink } from "react-router-dom";
import { FiBook, FiBookOpen } from "react-icons/fi";
import type { Book } from "../../services/entities/Book";

const featuredBooks: Book[] = [
    { id: "1", title: "Nhà Giả Kim", author: "Paulo Coelho", description: "Hành trình tìm kiếm giấc mơ và bản thân.", publisher: "", isbn: "", category: { id: "", name: "Văn học", createdAt: "", updatedAt: "" }, publishDate: "", price: { id: "", price: 149000, effectiveFrom: "", effectiveTo: "", createdAt: "", updatedAt: "" }, createdAt: "", updatedAt: "" },
    { id: "2", title: "Lược Sử Thời Gian", author: "Stephen Hawking", description: "Khám phá vũ trụ và những bí ẩn của thời gian.", publisher: "", isbn: "", category: { id: "", name: "Khoa học", createdAt: "", updatedAt: "" }, publishDate: "", price: { id: "", price: 220000, effectiveFrom: "", effectiveTo: "", createdAt: "", updatedAt: "" }, createdAt: "", updatedAt: "" },
    { id: "3", title: "Đắc Nhân Tâm", author: "Dale Carnegie", description: "Những nguyên tắc vàng để thành công trong cuộc sống.", publisher: "", isbn: "", category: { id: "", name: "Kỹ năng", createdAt: "", updatedAt: "" }, publishDate: "", price: { id: "", price: 129000, effectiveFrom: "", effectiveTo: "", createdAt: "", updatedAt: "" }, createdAt: "", updatedAt: "" },
    { id: "4", title: "Sapiens", author: "Yuval Noah Harari", description: "Lịch sử loài người nhìn từ góc độ khác.", publisher: "", isbn: "", category: { id: "", name: "Khoa học", createdAt: "", updatedAt: "" }, publishDate: "", price: { id: "", price: 195000, effectiveFrom: "", effectiveTo: "", createdAt: "", updatedAt: "" }, createdAt: "", updatedAt: "" },
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
                        Sách nổi bật
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
                        {featuredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
