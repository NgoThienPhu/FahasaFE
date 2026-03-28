import React from "react";
import styles from "./BookCard.module.css";
import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import LazyImage from "../lazy_image/LazyImage";
import { BookPlaceholderIcon } from "../icons/BookPlaceholderIcon";
import type { Book } from "../../services/entities/Book";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + "₫";
}

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { addItem } = useCart();
    const { addNotification } = useNotification();

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
        const productId = book.id != null ? String(book.id) : "";
        addItem(productId, 1);
        addNotification("success", "Đã thêm vào giỏ hàng");
    };

    return (
        <NavLink to={`/products/${id}`} className={styles.bookCard}>
            <div className={styles.bookCover} aria-hidden>
                {imageUrl ? (
                    <LazyImage
                        src={imageUrl}
                        alt=""
                        className={styles.coverImg}
                        placeholder={
                            <span className={styles.coverPlaceholderIcon}>
                                <BookPlaceholderIcon size={26} />
                            </span>
                        }
                    />
                ) : (
                    <span className={styles.coverPlaceholderIcon}>
                        <BookPlaceholderIcon size={26} />
                    </span>
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
                    title="Thêm giỏ"
                >
                    <FiShoppingCart size={18} />
                    Thêm giỏ
                </button>
            </div>
        </NavLink>
    );
};

export default BookCard;
