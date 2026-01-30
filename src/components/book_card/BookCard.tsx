import React from "react";
import styles from "./BookCard.module.css";
import { NavLink } from "react-router-dom";
import { FiEye, FiShoppingCart } from "react-icons/fi";

interface Book {
    id: number;
    title: string;
    author: string,
    desc: string,
    price: string,
    rating: number
}

const BookCard: React.FC<Book> = (props) => {
    return (
        <div className={styles.bookCard}>
            <div className={styles.bookCover} aria-hidden>
                <span>{props.title.split(" ")[0].slice(0, 2).toUpperCase()}</span>
            </div>
            <div className={styles.bookBody}>
                <div className={styles.bookMeta}>
                    <h3 className={styles.bookTitle}>{props.title}</h3>
                    <span className={styles.bookPrice}>{props.price}</span>
                </div>
                <p className={styles.bookAuthor}>{props.author} · <span className={styles.bookRating}>{props.rating}★</span></p>
                <p className={styles.bookDesc}>{props.desc}</p>
                <div className={styles.cardActions}>
                    <NavLink
                        className={`${styles.btn} ${styles.btnText}`}
                        to={`/products/${props.id}`}
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
    )
}

export default BookCard;
