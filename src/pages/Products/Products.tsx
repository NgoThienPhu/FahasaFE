import React, { useEffect, useState, useCallback } from "react";
import styles from "./Products.module.css";
import BookCard from "../../components/book_card/BookCard";
import categoryApi from "../../services/apis/categoryApi";
import bookApi, { type GetBooksParams } from "../../services/apis/bookApi";
import type { Book } from "../../services/entities/Book";
import { FiFilter, FiX, FiInbox, FiSearch } from "react-icons/fi";
import type { Category } from "../../services/entities/Category";

const PAGE_SIZE = 10;
const PAGINATION_SPREAD = 2;

const Products: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0 });
    const [initialBooksLoad, setInitialBooksLoad] = useState(true);
    const [booksListLoading, setBooksListLoading] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [searchDraft, setSearchDraft] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const loadBooks = useCallback(
        (pageOneBased: number = 1) => {
            setBooksListLoading(true);

            const params: GetBooksParams = {
                page: pageOneBased - 1,
                size: PAGE_SIZE,
                sortBy: "title",
                orderBy: "ASC",
            };
            
            if (categoryIds.length > 0) params.categoryId = categoryIds[0];

            const q = appliedSearch.trim();
            if (q) params.search = q;

            bookApi
                .getBooks(params)
                .then((res) => {
                    const list = res.data;
                    setBooks(list);
                    const p = res.pagination;
                    const page = p.page;
                    const totalPages = p.totalPages;
                    const totalItems = p.totalItems;
                    setPagination({
                        page: page + 1,
                        totalPages,
                        totalItems,
                    });
                })
                .catch(() => {
                    setBooks([]);
                    setPagination((prev) => ({ ...prev, page: 1, totalPages: 1, totalItems: 0 }));
                })
                .finally(() => {
                    setBooksListLoading(false);
                    setInitialBooksLoad(false);
                });
        },
        [categoryIds, appliedSearch]
    );

    useEffect(() => {
        categoryApi.getCategories().then((resp) => setCategories(resp.data));
    }, []);

    useEffect(() => {
        loadBooks(1);
    }, [loadBooks]);

    const toggleCategory = (id: string) => {
        setCategoryIds((prev) => (prev.includes(id) ? [] : [id]));
    };

    const clearFilters = () => {
        setCategoryIds([]);
        setSearchDraft("");
        setAppliedSearch("");
    };

    const hasActiveFilters = categoryIds.length > 0 || appliedSearch.length > 0;

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(searchDraft.trim());
    };

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

                    <div className={styles.filterBlock}>
                        <h3 className={styles.filterLabel}>Thể loại</h3>
                        <div className={styles.categoryList}>
                            {categories.length > 0 ? (
                                categories.map((c) => (
                                    <label key={c.id} className={styles.checkboxRow}>
                                        <input
                                            type="checkbox"
                                            checked={categoryIds.includes(c.id)}
                                            onChange={() => toggleCategory(c.id)}
                                        />
                                        <span>{c.name}</span>
                                    </label>
                              
                                ))
                            ) : (
                                <div className={styles.empty}>Không có thể loại nào</div>
                            )}
                      
             
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
                    {initialBooksLoad ? (
                        <div className={styles.loading}>Đang tải...</div>
                    ) : (
                        <>
                            <form className={styles.searchForm} onSubmit={submitSearch} role="search" aria-label="Tìm sách theo tên">
                                <input
                                    type="search"
                                    name="bookSearch"
                                    className={styles.searchInput}
                                    placeholder="Tìm theo tên sách..."
                                    value={searchDraft}
                                    onChange={(e) => setSearchDraft(e.target.value)}
                                    autoComplete="off"
                                    enterKeyHint="search"
                                />
                                <button type="submit" className={styles.searchBtn} disabled={booksListLoading}>
                                    <FiSearch size={18} aria-hidden />
                                    Tìm
                                </button>
                            </form>

                            <div className={styles.listRegion}>
                                {booksListLoading && (
                                    <div
                                        className={styles.listLoadingOverlay}
                                        role="status"
                                        aria-live="polite"
                                        aria-busy="true"
                                    >
                                        <span className={styles.listLoadingText}>Đang tải...</span>
                                    </div>
                                )}
                                {!Array.isArray(books) || books.length === 0 ? (
                                    <div className={styles.empty}>
                                        <div className={styles.emptyIcon} aria-hidden>
                                            <FiInbox size={24} />
                                        </div>
                                        <h2 className={styles.emptyTitle}>Không tìm thấy sản phẩm</h2>
                                        <p className={styles.emptyHint}>
                                            Hãy thử từ khóa khác, thể loại khác hoặc xóa bộ lọc đang áp dụng.
                                        </p>
                                        {hasActiveFilters && (
                                            <button type="button" className={styles.btnClear} onClick={clearFilters}>
                                                Xóa tất cả bộ lọc
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className={styles.grid}>
                                        {books.map((book) => (
                                            <BookCard key={String(book.id)} book={book} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {pagination.totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        type="button"
                                        className={styles.pageBtn}
                                        disabled={booksListLoading || pagination.page <= 1}
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
                                                    disabled={booksListLoading}
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
                                        disabled={booksListLoading || pagination.page >= pagination.totalPages}
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
