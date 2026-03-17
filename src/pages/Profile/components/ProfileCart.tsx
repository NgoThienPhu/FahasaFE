import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import styles from "./ProfileCart.module.css";
import { useCart } from "../../../contexts/CartContext";
import bookApi from "../../../services/apis/bookApi";
import type { Book } from "../../../services/entities/Book";
import LazyImage from "../../../components/lazy_image/LazyImage";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + " ₫";
}

const ProfileCart: React.FC = () => {
    const { items, addItem, removeItem } = useCart();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const productIdsKey = React.useMemo(
        () => items.map((it) => it.productId).sort().join(","),
        [items]
    );

    useEffect(() => {
        if (!items.length) {
            setBooks([]);
            setLoading(false);
            return;
        }
        const ids = items.map((it) => it.productId);
        setLoading(true);
        bookApi
            .getBookByIds(ids)
            .then((res) => {
                const list = Array.isArray(res?.data) ? res.data : [];
                setBooks(list);
            })
            .catch(() => setBooks([]))
            .finally(() => setLoading(false));
    }, [productIdsKey]);

    const bookMap = React.useMemo(() => {
        const map: Record<string, Book> = {};
        books.forEach((b) => {
            const id = String((b as any).id ?? "");
            if (id) map[id] = b;
        });
        return map;
    }, [books]);

    const getPrice = (book: Book) =>
        typeof (book as any).price === "number" ? (book as any).price : book.price?.price ?? 0;

    const totalPrice = React.useMemo(() => {
        return items.reduce((sum, it) => {
            const book = bookMap[it.productId];
            if (!book) return sum;
            const price = getPrice(book);
            return sum + price * it.quantity;
        }, 0);
    }, [items, bookMap]);

    if (items.length === 0) {
        return (
            <div className={styles.tabContent}>
                <div className={styles.emptyState}>
                    <h2>Giỏ hàng</h2>
                    <p>Giỏ hàng của bạn đang trống</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.tabContent}>
                <p className={styles.loading}>Đang tải giỏ hàng...</p>
            </div>
        );
    }

    return (
        <div className={styles.tabContent}>
            <div className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>Giỏ hàng</h2>
                <div className={styles.cartHeaderRight}>
                    <div className={styles.cartTotal}>
                        <span className={styles.cartTotalLabel}>Tổng tiền:</span>
                        <span className={styles.cartTotalValue}>{formatPrice(totalPrice)}</span>
                    </div>
                    <NavLink to="/checkout" className={styles.btnCheckout}>
                        Thanh toán
                    </NavLink>
                </div>
            </div>
            <ul className={styles.cartList}>
                {items.map((item) => {
                    const id = item.productId;
                    const quantity = item.quantity;
                    const book = bookMap[id];
                    if (!book) {
                        return (
                            <li key={id} className={styles.cartRow}>
                                <span className={styles.cartThumb}>
                                    <span className={styles.thumbPlaceholder}>📖</span>
                                </span>
                                <div className={styles.cartInfo}>
                                    <span className={styles.cartBookTitle}>Sản phẩm không tìm thấy (ID: {id})</span>
                                </div>
                                <div className={styles.cartQtyWrap}>
                                    <button
                                        type="button"
                                        className={styles.btnQty}
                                        onClick={() => quantity <= 1 ? removeItem(id) : addItem(id, -1)}
                                        aria-label="Giảm số lượng"
                                    >
                                        <FiMinus size={14} />
                                    </button>
                                    <span className={styles.cartQtyValue}>{quantity}</span>
                                    <button
                                        type="button"
                                        className={styles.btnQty}
                                        onClick={() => addItem(id, 1)}
                                        aria-label="Tăng số lượng"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className={styles.cartSubtotal}>—</div>
                                <button
                                    type="button"
                                    className={styles.btnRemove}
                                    onClick={() => removeItem(id)}
                                    title="Xóa khỏi giỏ"
                                    aria-label="Xóa khỏi giỏ"
                                >
                                    <FiTrash2 size={18} />
                                </button>
                            </li>
                        );
                    }
                    const price = getPrice(book);
                    const imageUrl = book.primaryImage?.url;
                    return (
                        <li key={id} className={styles.cartRow}>
                            <NavLink to={`/products/${id}`} className={styles.cartThumb}>
                                {imageUrl ? (
                                    <LazyImage
                                        src={imageUrl}
                                        alt=""
                                        className={styles.thumbImg}
                                        placeholder={<span className={styles.thumbPlaceholder}>📖</span>}
                                    />
                                ) : (
                                    <span className={styles.thumbPlaceholder}>📖</span>
                                )}
                            </NavLink>
                            <div className={styles.cartInfo}>
                                <NavLink to={`/products/${id}`} className={styles.cartBookTitle}>
                                    {book.title}
                                </NavLink>
                                {book.author ? <p className={styles.cartAuthor}>{book.author}</p> : null}
                                <p className={styles.cartPrice}>{formatPrice(price)}</p>
                            </div>
                            <div className={styles.cartQtyWrap}>
                                <button
                                    type="button"
                                    className={styles.btnQty}
                                    onClick={() => quantity <= 1 ? removeItem(id) : addItem(id, -1)}
                                    aria-label="Giảm số lượng"
                                >
                                    <FiMinus size={14} />
                                </button>
                                <span className={styles.cartQtyValue}>{quantity}</span>
                                <button
                                    type="button"
                                    className={styles.btnQty}
                                    onClick={() => addItem(id, 1)}
                                    aria-label="Tăng số lượng"
                                >
                                    <FiPlus size={14} />
                                </button>
                            </div>
                            <div className={styles.cartSubtotal}>{formatPrice(price * quantity)}</div>
                            <button
                                type="button"
                                className={styles.btnRemove}
                                onClick={() => removeItem(id)}
                                title="Xóa khỏi giỏ"
                                aria-label="Xóa khỏi giỏ"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProfileCart;
