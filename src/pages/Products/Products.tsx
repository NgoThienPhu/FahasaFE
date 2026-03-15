import React, { useEffect, useState, useCallback } from "react";
import styles from "./Products.module.css";
import BookCard from "../../components/book_card/BookCard";
import productApi, { type Category } from "../../services/apis/productApi";
import bookApi, { type GetBooksParams } from "../../services/apis/bookApi";
import type { Book } from "../../services/entities/Book";
import { FiFilter, FiX } from "react-icons/fi";

const PAGE_SIZE = 10;
const PAGINATION_SPREAD = 2;

const Products: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0 });
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const loadBooks = useCallback(
        (pageOneBased: number = 1) => {
            setLoading(true);

            const params: GetBooksParams = {
                page: pageOneBased - 1,
                size: PAGE_SIZE,
                sortBy: "title",
                orderBy: "asc",
            };
            if (categoryIds.length > 0) params.categoryId = categoryIds[0];

            bookApi
                .getBooks(params)
                .then((res) => {
                    const list = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
                    setBooks(list as Book[]);
                    const p = res.pagination || res;
                    const page0 = p.page || 0;
                    const totalPages = p.totalPages || 1;
                    const totalItems = p.totalItems || list.length;
                    setPagination({
                        page: page0 + 1,
                        totalPages,
                        totalItems,
                    });
                })
                .catch(() => {
                    setBooks([]);
                    setPagination((prev) => ({ ...prev, page: 1, totalPages: 1, totalItems: 0 }));
                })
                .finally(() => setLoading(false));
        },
        [categoryIds]
    );

    useEffect(() => {
        productApi.getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        loadBooks(1);
    }, [loadBooks]);

    const toggleCategory = (id: string) => {
        setCategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    };

    const clearFilters = () => {
        setCategoryIds([]);
        setMinPrice("");
        setMaxPrice("");
    };

    const hasActiveFilters = categoryIds.length > 0 || minPrice.trim() !== "" || maxPrice.trim() !== "";

    const getPageNumbers = (): (number | "ellipsis")[] => {
        const { totalPages, page: current } = pagination;
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

        const left = Math.max(1, current - PAGINATION_SPREAD);
        const right = Math.min(totalPages, current + PAGINATION_SPREAD);
        const result: (number | "ellipsis")[] = [];

        if (left > 2) result.push(1, "ellipsis");
        else if (left === 2) result.push(1);
        for (let i = left; i <= right; i++) result.push(i);
        if (right < totalPages - 1) result.push("ellipsis", totalPages);
        else if (right === totalPages - 1) result.push(totalPages);

        return result;
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Sản phẩm</h1>
            </header>

            <div className={styles.layout}>
                <aside
                    className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ""}`}
                    aria-label="Bộ lọc"
                >
                    <div className={styles.sidebarHeader}>
                        <span className={styles.sidebarTitle}>
                            <FiFilter size={18} />
                            Bộ lọc
                        </span>
                        <button
                            type="button"
                            className={styles.closeFilters}
                            onClick={() => setShowFilters(false)}
                            aria-label="Đóng bộ lọc"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className={styles.filterBlock} aria-disabled="true">
                        <h3 className={styles.filterLabel}>Thể loại</h3>
                        <p className={styles.filterNote}>Sẽ bổ sung sau</p>
                        <div className={styles.categoryList}>
                            {categories.map((c) => (
                                <label key={c.id} className={styles.checkboxRow}>
                                    <input
                                        type="checkbox"
                                        checked={categoryIds.includes(c.id)}
                                        onChange={() => toggleCategory(c.id)}
                                        disabled
                                        aria-disabled="true"
                                    />
                                    <span>{c.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterBlock}>
                        <h3 className={styles.filterLabel}>Khoảng giá (₫)</h3>
                        <div className={styles.priceRow}>
                            <input
                                type="text"
                                placeholder="Từ"
                                className={styles.input}
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <span className={styles.priceSep}>–</span>
                            <input
                                type="text"
                                placeholder="Đến"
                                className={styles.input}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.filterActions}>
                        {hasActiveFilters && (
                            <button type="button" className={styles.btnClear} onClick={clearFilters}>
                                Xóa bộ lọc
                            </button>
                        )}
                        <button
                            type="button"
                            className={styles.btnApply}
                            onClick={() => {
                                loadBooks(1);
                                setShowFilters(false);
                            }}
                        >
                            Áp dụng
                        </button>
                    </div>
                </aside>

                <main className={styles.main}>
                    {loading ? (
                        <div className={styles.loading}>Đang tải...</div>
                    ) : !Array.isArray(books) || books.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Không có sản phẩm.</p>
                            <button type="button" className={styles.btnClear} onClick={clearFilters}>
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className={styles.grid}>
                                {books.map((book) => (
                                    <BookCard key={String(book.id)} book={book} />
                                ))}
                            </div>

                            {pagination.totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        type="button"
                                        className={styles.pageBtn}
                                        disabled={pagination.page <= 1}
                                        onClick={() => loadBooks(pagination.page - 1)}
                                        aria-label="Trang trước"
                                    >
                                        Trước
                                    </button>
                                    <div className={styles.pageNumbers} role="navigation" aria-label="Phân trang">
                                        {getPageNumbers().map((item, i) =>
                                            item === "ellipsis" ? (
                                                <span key={`ellipsis-${i}`} className={styles.pageEllipsis} aria-hidden>
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className={pagination.page === item ? styles.pageNumActive : styles.pageNum}
                                                    onClick={() => loadBooks(item)}
                                                    aria-label={`Trang ${item}`}
                                                    aria-current={pagination.page === item ? "page" : undefined}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.pageBtn}
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => loadBooks(pagination.page + 1)}
                                        aria-label="Trang sau"
                                    >
                                        Sau
                                    </button>
                                    <span className={styles.pageInfo}>
                                        Trang {pagination.page} / {pagination.totalPages}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {showFilters && (
                <div className={styles.overlay} onClick={() => setShowFilters(false)} aria-hidden />
            )}
        </div>
    );
};

export default Products;
