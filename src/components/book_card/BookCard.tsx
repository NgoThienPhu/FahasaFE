import React from "react";
import styles from "./BookCard.module.css";
import { NavLink } from "react-router-dom";
import { FiEye, FiShoppingCart } from "react-icons/fi";
import type { Book } from "../../services/entities/Book";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + "₫";
}

function coverPlaceholder(title: string): string {
    const first = (title ?? "").trim().split(/\s+/)[0] ?? "";
    return first.slice(0, 2).toUpperCase() || "—";
}

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    if (!book) return null;
    const title = book.title ?? "";
    const author = book.author ?? "";
    const description = book.description ?? "";
    const priceValue = typeof (book as any).price === "number" ? (book as any).price : (book.price?.price ?? 0);
    const categoryName = book.category?.name ?? "";
    const id = book.id != null ? String(book.id) : "";

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookCover} aria-hidden>
                <span>{coverPlaceholder(title)}</span>
            </div>
            <div className={styles.bookBody}>
                <div className={styles.bookMeta}>
                    <h3 className={styles.bookTitle}>{title}</h3>
                    <span className={styles.bookPrice}>{formatPrice(priceValue)}</span>
                </div>
                <p className={styles.bookAuthor}>
                    {author}
                    {categoryName ? ` · ${categoryName}` : ""}
                </p>
                <p className={styles.bookDesc}>{description}</p>
                <div className={styles.cardActions}>
                    <NavLink
                        className={`${styles.btn} ${styles.btnText}`}
                        to={`/products/${id}`}
                    >
                        <FiEye size={16} />
                        Xem chi tiết
                    </NavLink>
                    <button
                        type="button"
                        className={`${styles.btn} ${styles.outline} ${styles.btnIcon}`}
                        title="Thêm vào giỏ"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
