import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import styles from "./ProductDetail.module.css";
import bookApi from "../../services/apis/bookApi";
import bookImageApi from "../../services/apis/bookImageApi";
import type { Book } from "../../services/entities/Book";
import Loading from "../../components/Loading/Loading";
import LazyImage from "../../components/lazy_image/LazyImage";
import { BookPlaceholderIcon } from "../../components/icons/BookPlaceholderIcon";
import { FiShoppingCart, FiChevronRight, FiChevronLeft, FiAlertCircle } from "react-icons/fi";
import { useCart } from "../../contexts/CartContext";
import { useNotification } from "../../contexts/NotificationContext";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", { style: "decimal", minimumFractionDigits: 0 }).format(price) + " ₫";
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addItem } = useCart();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [secondaryImageUrls, setSecondaryImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        Promise.all([
            bookApi.getBookById(id),
            bookImageApi.getBookSecondaryImages(id),
        ])
            .then(([bookRes, imagesRes]) => {
                setBook(bookRes.data);
                setSecondaryImageUrls(imagesRes.data.map((img) => img.url));
            })
            .catch(() => {
                setBook(null);
                setSecondaryImageUrls([]);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loading notify="Đang tải..." />;
    if (!book) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <div className={styles.notFoundIcon} aria-hidden>
                        <FiAlertCircle size={28} />
                    </div>
                    <h2 className={styles.notFoundTitle}>Sách không tồn tại</h2>
                    <p className={styles.notFoundText}>
                        Sách bạn tìm kiếm không có hoặc đã bị gỡ. Vui lòng kiểm tra lại đường dẫn hoặc xem các sản phẩm khác.
                    </p>
                    <NavLink to="/products" className={styles.notFoundLink}>
                        Xem danh sách sách
                    </NavLink>
                </div>
            </div>
        );
    }

    const priceValue = typeof (book as any).price === "number" ? (book as any).price : (book.price?.price ?? 0);
    const imageUrl = book.primaryImage?.url;
    const categoryName = book.category?.name ?? "Sách";
    const images = [...(imageUrl ? [imageUrl] : []), ...secondaryImageUrls];

    return (
        <div className={styles.page}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <NavLink to="/products">Sản phẩm</NavLink>
                <FiChevronRight className={styles.breadcrumbSep} aria-hidden />
                <span className={styles.breadcrumbCurrent}>{book.title}</span>
            </nav>

            <div className={styles.main}>
                <div className={styles.leftCol}>
                    <div className={styles.gallery}>
                        <div className={styles.mainImageWrap}>
                            {images.length > 0 ? (
                                <button
                                    type="button"
                                    className={styles.mainImageTrigger}
                                    onClick={() => setLightboxOpen(true)}
                                    aria-label="Xem ảnh phóng to"
                                >
                                    <LazyImage
                                        src={images[selectedImageIndex] ?? images[0]}
                                        alt={book.title}
                                        className={styles.mainImage}
                                        placeholder={
                                            <span className={styles.imgPlaceholder}>
                                                <BookPlaceholderIcon size={56} strokeWidth={1.4} />
                                            </span>
                                        }
                                    />
                                </button>
                            ) : (
                                <div className={styles.mainImagePlaceholder}>
                                    <BookPlaceholderIcon size={56} strokeWidth={1.4} />
                                </div>
                            )}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        className={styles.galleryNavPrev}
                                        onClick={() => setSelectedImageIndex((i) => (i <= 0 ? images.length - 1 : i - 1))}
                                        aria-label="Ảnh trước"
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.galleryNavNext}
                                        onClick={() => setSelectedImageIndex((i) => (i >= images.length - 1 ? 0 : i + 1))}
                                        aria-label="Ảnh sau"
                                    >
                                        <FiChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                        {images.length > 0 && (
                            <div className={styles.thumbnails}>
                                {images.slice(0, 4).map((url, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={`${styles.thumb} ${selectedImageIndex === i ? styles.thumbActive : ""}`}
                                        onClick={() => {
                                            setSelectedImageIndex(i);
                                            if (images.length > 4 && i === 3) setLightboxOpen(true);
                                        }}
                                    >
                                        <img src={url} alt="" loading="lazy" />
                                        {images.length > 4 && i === 3 && (
                                            <span className={styles.thumbMoreOverlay}>+{images.length - 4}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                        {images.length > 0 && (
                            <Lightbox
                                open={lightboxOpen}
                                close={() => setLightboxOpen(false)}
                                index={selectedImageIndex}
                                slides={images.map((src) => ({ src, alt: book.title }))}
                                plugins={[Zoom]}
                                zoom={{ scrollToZoom: true }}
                            />
                        )}
                    </div>
                    <div className={styles.actionButtons}>
                        <button
                            type="button"
                            className={styles.btnCart}
                            onClick={() => {
                                const productId = book.id != null ? String(book.id) : "";
                                addItem(productId, 1);
                                addNotification("success", "Đã thêm vào giỏ hàng");
                            }}
                        >
                            <FiShoppingCart size={20} />
                            Thêm giỏ
                        </button>
                        <button
                            type="button"
                            className={styles.btnBuy}
                            onClick={() => {
                                const productId = book.id != null ? String(book.id) : "";
                                addItem(productId, 1);
                                addNotification("success", "Đã thêm vào giỏ hàng");
                                navigate({ pathname: "/profile", search: "?tab=cart" });
                            }}
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <div className={styles.infoCard}>
                        <h1 className={styles.title}>{book.title}</h1>
                        <div className={styles.meta}>
                            {book.publisher ? <span>NXB: {book.publisher}</span> : null}
                            {book.author ? <span>Tác giả: {book.author}</span> : null}
                            {categoryName ? <span>Thể loại: {categoryName}</span> : null}
                            {book.isbn ? <span>Mã: {book.isbn}</span> : null}
                            {book.publishDate ? <span>Ngày XB: {book.publishDate}</span> : null}
                        </div>
                        <div className={styles.priceRow}>
                            <span className={styles.priceCurrent}>{formatPrice(priceValue)}</span>
                        </div>
                    </div>

                    {book.summary ? (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Tóm tắt</h2>
                            <p className={styles.detailSummary}>{book.summary}</p>
                        </div>
                    ) : null}
                    {book.description ? (
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Mô tả</h2>
                            <div
                                className={styles.descriptionContent}
                                dangerouslySetInnerHTML={{ __html: book.description }}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
