import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowRight, FiPackage } from "react-icons/fi";
import styles from "./ProfileCart.module.css";
import { useCart } from "../../../contexts/CartContext";
import bookApi from "../../../services/apis/bookApi";
import type { Book } from "../../../services/entities/Book";
import LazyImage from "../../../components/lazy_image/LazyImage";
import { LuBookMarked } from "react-icons/lu";
import { clearBuyNowFromStorage } from "../../payment/Payment";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + " ₫";
}

const ProfileCart: React.FC = () => {
    const { items, addItem, removeItem, totalCount } = useCart();
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
            const id = String((b as { id?: string }).id ?? "");
            if (id) map[id] = b;
        });
        return map;
    }, [books]);

    const getPrice = (book: Book) =>
        typeof (book as { price?: number }).price === "number"
            ? (book as { price: number }).price
            : book.price?.price ?? 0;

    const totalPrice = React.useMemo(() => {
        return items.reduce((sum, it) => {
            const book = bookMap[it.productId];
            if (!book) return sum;
            const price = getPrice(book);
            return sum + price * it.quantity;
        }, 0);
    }, [items, bookMap]);

    const lineCount = items.length;

    if (items.length === 0) {
        return (
            <div className={styles.tabContent}>
                <div className={styles.emptyWrap}>
                    <div className={styles.emptyCard}>
                        <div className={styles.emptyGlow} aria-hidden />
                        <div className={styles.emptyIcon} aria-hidden>
                            <FiShoppingCart size={30} strokeWidth={1.5} />
                        </div>
                        <h2 className={styles.emptyTitle}>Giỏ hàng đang trống</h2>
                        <p className={styles.emptyDesc}>
                            Hãy chọn vài cuốn sách — ưu đãi và giao nhanh đang chờ bạn ở cửa hàng.
                        </p>
                        <div className={styles.emptyActions}>
                            <NavLink to="/products" className={styles.emptyCtaPrimary}>
                                Khám phá sách
                                <FiArrowRight size={16} aria-hidden />
                            </NavLink>
                            <NavLink to="/products" className={styles.emptyCtaSecondary}>
                                Xem khuyến mãi
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.tabContent}>
                <div className={styles.skeletonPage}>
                    <div className={styles.skeletonHeader}>
                        <span className={styles.skeletonLine} style={{ width: "140px", height: "22px" }} />
                        <span className={styles.skeletonLine} style={{ width: "200px", height: "40px", borderRadius: "12px" }} />
                    </div>
                    <div className={styles.skeletonGrid}>
                        <div className={styles.skeletonList}>
                            {[1, 2, 3].map((k) => (
                                <div key={k} className={styles.skeletonRow}>
                                    <span className={styles.skeletonThumb} />
                                    <div className={styles.skeletonCol}>
                                        <span className={styles.skeletonLine} style={{ width: "70%" }} />
                                        <span className={styles.skeletonLine} style={{ width: "40%" }} />
                                        <span className={styles.skeletonLine} style={{ width: "100px" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.skeletonAside}>
                            <span className={styles.skeletonLine} style={{ width: "60%", height: "18px" }} />
                            <span className={styles.skeletonLine} style={{ width: "100%", height: "48px", borderRadius: "12px" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tabContent}>
            <div className={styles.cartPage}>
                <header className={styles.cartTopBar}>
                    <div className={styles.cartTopLeft}>
                        <span className={styles.cartBadge} aria-hidden>
                            <FiPackage size={18} strokeWidth={2} />
                        </span>
                        <div>
                            <h2 className={styles.cartTitle}>Giỏ hàng</h2>
                            <p className={styles.cartSubtitle}>
                                {lineCount} loại sản phẩm · {totalCount} cuốn
                            </p>
                        </div>
                    </div>
                </header>

                <div className={styles.cartLayout}>
                    <section className={styles.cartItemsSection} aria-label="Danh sách sản phẩm">
                        <ul className={styles.cartList}>
                            {items.map((item) => {
                                const id = item.productId;
                                const quantity = item.quantity;
                                const book = bookMap[id];
                                if (!book) {
                                    return (
                                        <li key={id} className={styles.cartRow}>
                                            <div className={styles.rowInner}>
                                                <span className={styles.cartThumb}>
                                                    <span className={styles.thumbPlaceholder}>
                                                        <LuBookMarked size={24} strokeWidth={1.65} aria-hidden />
                                                    </span>
                                                </span>
                                                <div className={styles.cartInfo}>
                                                    <span className={styles.cartBookTitle}>
                                                        Không tìm thấy sản phẩm (ID: {id})
                                                    </span>
                                                    <span className={styles.rowMetaMuted}>Vui lòng xóa hoặc thử lại sau</span>
                                                </div>
                                                <div className={styles.rowControls}>
                                                    <div className={styles.cartQtyWrap}>
                                                        <button
                                                            type="button"
                                                            className={styles.btnQty}
                                                            onClick={() =>
                                                                quantity <= 1 ? removeItem(id) : addItem(id, -1)
                                                            }
                                                            aria-label="Giảm số lượng"
                                                        >
                                                            <FiMinus size={15} />
                                                        </button>
                                                        <span className={styles.cartQtyValue}>{quantity}</span>
                                                        <button
                                                            type="button"
                                                            className={styles.btnQty}
                                                            onClick={() => addItem(id, 1)}
                                                            aria-label="Tăng số lượng"
                                                        >
                                                            <FiPlus size={15} />
                                                        </button>
                                                    </div>
                                                    <div className={styles.cartSubtotal}>
                                                        <span className={styles.subLabel}>Thành tiền</span>
                                                        <span className={styles.subValue}>—</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className={styles.btnRemove}
                                                        onClick={() => removeItem(id)}
                                                        title="Xóa khỏi giỏ"
                                                        aria-label="Xóa khỏi giỏ"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                                const price = getPrice(book);
                                const imageUrl = book.primaryImage?.url;
                                return (
                                    <li key={id} className={styles.cartRow}>
                                        <div className={styles.rowInner}>
                                            <NavLink to={`/products/${id}`} className={styles.cartThumb}>
                                                {imageUrl ? (
                                                    <LazyImage
                                                        src={imageUrl}
                                                        alt=""
                                                        className={styles.thumbImg}
                                                        placeholder={
                                                            <span className={styles.thumbPlaceholder}>
                                                                <LuBookMarked size={24} strokeWidth={1.65} aria-hidden />
                                                            </span>
                                                        }
                                                    />
                                                ) : (
                                                    <span className={styles.thumbPlaceholder}>
                                                        <LuBookMarked size={24} strokeWidth={1.65} aria-hidden />
                                                    </span>
                                                )}
                                            </NavLink>
                                            <div className={styles.cartInfo}>
                                                <NavLink to={`/products/${id}`} className={styles.cartBookTitle}>
                                                    {book.title}
                                                </NavLink>
                                                {book.author ? (
                                                    <p className={styles.cartAuthor}>{book.author}</p>
                                                ) : null}
                                                <div className={styles.priceLine}>
                                                    <span className={styles.unitLabel}>Đơn giá</span>
                                                    <span className={styles.cartPrice}>{formatPrice(price)}</span>
                                                </div>
                                            </div>
                                            <div className={styles.rowControls}>
                                                <div className={styles.cartQtyWrap}>
                                                    <button
                                                        type="button"
                                                        className={styles.btnQty}
                                                        onClick={() =>
                                                            quantity <= 1 ? removeItem(id) : addItem(id, -1)
                                                        }
                                                        aria-label="Giảm số lượng"
                                                    >
                                                        <FiMinus size={15} />
                                                    </button>
                                                    <span className={styles.cartQtyValue}>{quantity}</span>
                                                    <button
                                                        type="button"
                                                        className={styles.btnQty}
                                                        onClick={() => addItem(id, 1)}
                                                        aria-label="Tăng số lượng"
                                                    >
                                                        <FiPlus size={15} />
                                                    </button>
                                                </div>
                                                <div className={styles.cartSubtotal}>
                                                    <span className={styles.subLabel}>Thành tiền</span>
                                                    <span className={styles.subValue}>{formatPrice(price * quantity)}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className={styles.btnRemove}
                                                    onClick={() => removeItem(id)}
                                                    title="Xóa khỏi giỏ"
                                                    aria-label="Xóa khỏi giỏ"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    <aside className={styles.cartSummary} aria-label="Tóm tắt đơn hàng">
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Thanh toán</h3>
                            <dl className={styles.summaryDl}>
                                <div className={styles.summaryRow}>
                                    <dt>Tạm tính ({totalCount} cuốn)</dt>
                                    <dd>{formatPrice(totalPrice)}</dd>
                                </div>
                                <div className={styles.summaryRowMuted}>
                                    <dt>Phí vận chuyển</dt>
                                    <dd>Tính khi thanh toán</dd>
                                </div>
                            </dl>
                            <div className={styles.summaryDivider} />
                            <div className={styles.summaryTotalRow}>
                                <span className={styles.summaryTotalLabel}>Tổng cộng</span>
                                <span className={styles.summaryTotalValue}>{formatPrice(totalPrice)}</span>
                            </div>
                            <NavLink
                                to="/payment"
                                className={styles.btnPayment}
                                onClick={() => clearBuyNowFromStorage()}
                            >
                                Tiến hành thanh toán
                                <FiArrowRight size={18} aria-hidden />
                            </NavLink>
                            <NavLink to="/products" className={styles.linkContinue}>
                                ← Tiếp tục mua sắm
                            </NavLink>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ProfileCart;
