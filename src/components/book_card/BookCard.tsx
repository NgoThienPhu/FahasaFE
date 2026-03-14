import React from "react";
import styles from "./BookCard.module.css";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import LazyImage from "../lazy_image/LazyImage";
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
    const summary = book.summary ?? "";
    const priceValue = typeof (book as any).price === "number" ? (book as any).price : (book.price?.price ?? 0);
    const categoryName = book.category?.name ?? "";
    const id = book.id != null ? String(book.id) : "";
    const imageUrl = book.primaryImage?.url;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: gọi action thêm vào giỏ
    };

    return (
        <NavLink to={`/products/${id}`} className={styles.bookCard}>
            <div className={styles.bookCover} aria-hidden>
                {imageUrl ? (
                    <LazyImage
                        src={imageUrl}
                        alt=""
                        className={styles.coverImg}
                        placeholder={<span>{coverPlaceholder(title)}</span>}
                    />
                ) : (
                    <span>{coverPlaceholder(title)}</span>
                )}
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
                <p className={styles.bookDesc}>{summary}</p>
                <button
                    type="button"
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    title="Thêm vào giỏ hàng"
                >
                    <FiShoppingCart size={18} />
                    Thêm vào giỏ
                </button>
            </div>
        </NavLink>
    );
};

export default BookCard;
