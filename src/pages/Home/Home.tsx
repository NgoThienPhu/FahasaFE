import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import BookCard from "../../components/book_card/BookCard";
import bookApi from "../../services/apis/bookApi";
import { NavLink } from "react-router-dom";
import { FiBook, FiBookOpen } from "react-icons/fi";
import type { Book } from "../../services/entities/Book";

const FEATURED_SIZE = 4;

const Home: React.FC = () => {
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        bookApi
            .getBooks({
                page: 0,
                size: FEATURED_SIZE,
                sortBy: "title",
                orderBy: "asc",
            })
            .then((res) => {
                const list = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
                setFeaturedBooks((list as Book[]) || []);
            })
            .catch(() => setFeaturedBooks([]))
            .finally(() => setLoading(false));
    }, []);

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
                        {loading ? (
                            <p className={styles.featuredLoading}>Đang tải...</p>
                        ) : (
                            featuredBooks.map((book) => (
                                <BookCard key={String(book.id)} book={book} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
