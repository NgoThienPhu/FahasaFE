import React, { useEffect, useState, useCallback } from "react";
import styles from "./Products.module.css";
import BookCard from "../../components/book_card/BookCard";
import productApi, { type Product, type Category } from "../../services/apis/productApi";
import { FiFilter, FiX } from "react-icons/fi";

const LIMIT = 12;
const PAGINATION_SPREAD = 2; // số trang hiển thị hai bên trang hiện tại

const SORT_OPTIONS = [
    { value: "name_asc", label: "Tên A → Z", sortBy: "name" as const, order: "asc" as const },
    { value: "name_desc", label: "Tên Z → A", sortBy: "name" as const, order: "desc" as const },
    { value: "price_asc", label: "Giá thấp → cao", sortBy: "price" as const, order: "asc" as const },
    { value: "price_desc", label: "Giá cao → thấp", sortBy: "price" as const, order: "desc" as const },
    { value: "rating_desc", label: "Đánh giá cao", sortBy: "rating" as const, order: "desc" as const },
    { value: "sold_desc", label: "Bán chạy", sortBy: "sold" as const, order: "desc" as const },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "decimal",
        minimumFractionDigits: 0,
    }).format(price) + "₫";
}

const Products: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0 });
    const [loading, setLoading] = useState(true);

    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [sortValue, setSortValue] = useState("name_asc");
    const [showFilters, setShowFilters] = useState(false);

    const loadProducts = useCallback(
        (page: number = 1) => {
            setLoading(true);
            const opt = SORT_OPTIONS.find((o) => o.value === sortValue) || SORT_OPTIONS[0];
            const min = minPrice.trim() ? Number(minPrice.replace(/\D/g, "")) : undefined;
            const max = maxPrice.trim() ? Number(maxPrice.replace(/\D/g, "")) : undefined;

            productApi
                .getProducts({
                    categoryIds: categoryIds.length > 0 ? categoryIds : undefined,
                    minPrice: min && !isNaN(min) ? min : undefined,
                    maxPrice: max && !isNaN(max) ? max : undefined,
                    sortBy: opt.sortBy,
                    order: opt.order,
                    page,
                    limit: LIMIT,
                })
                .then((res) => {
                    setProducts(res.data);
                    setPagination({
                        page: res.pagination.page,
                        totalPages: res.pagination.totalPages,
                        totalItems: res.pagination.totalItems,
                    });
                })
                .catch(() => setProducts([]))
                .finally(() => setLoading(false));
        },
        [categoryIds, minPrice, maxPrice, sortValue]
    );

    useEffect(() => {
        productApi.getCategories().then(setCategories);
    }, []);

    useEffect(() => {
        loadProducts(1);
    }, [loadProducts]);

    const toggleCategory = (id: string) => {
        setCategoryIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const clearFilters = () => {
        setCategoryIds([]);
        setMinPrice("");
        setMaxPrice("");
        setSortValue("name_asc");
    };

    const hasActiveFilters =
        categoryIds.length > 0 || minPrice.trim() !== "" || maxPrice.trim() !== "";

    const getPageNumbers = (): (number | "ellipsis")[] => {
        const total = pagination.totalPages;
        const current = pagination.page;
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        const pages: (number | "ellipsis")[] = [];
        const left = Math.max(1, current - PAGINATION_SPREAD);
        const right = Math.min(total, current + PAGINATION_SPREAD);
        if (left > 2) {
            pages.push(1, "ellipsis");
        } else if (left === 2) {
            pages.push(1);
        }
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < total - 1) {
            pages.push("ellipsis", total);
        } else if (right === total - 1) {
            pages.push(total);
        }
        return pages;
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

                    <div className={styles.filterBlock}>
                        <h3 className={styles.filterLabel}>Thể loại</h3>
                        <div className={styles.categoryList}>
                            {categories.map((c) => (
                                <label key={c.id} className={styles.checkboxRow}>
                                    <input
                                        type="checkbox"
                                        checked={categoryIds.includes(c.id)}
                                        onChange={() => toggleCategory(c.id)}
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
                            <button
                                type="button"
                                className={styles.btnClear}
                                onClick={clearFilters}
                            >
                                Xóa bộ lọc
                            </button>
                        )}
                        <button
                            type="button"
                            className={styles.btnApply}
                            onClick={() => {
                                loadProducts(1);
                                setShowFilters(false);
                            }}
                        >
                            Áp dụng
                        </button>
                    </div>
                </aside>

                <main className={styles.main}>
                    <div className={styles.toolbar}>
                        <button
                            type="button"
                            className={styles.btnFilters}
                            onClick={() => setShowFilters(true)}
                            aria-label="Mở bộ lọc"
                        >
                            <FiFilter size={18} />
                            Bộ lọc
                        </button>
                        <div className={styles.sortWrap}>
                            <label htmlFor="products-sort" className={styles.sortLabel}>
                                Sắp xếp:
                            </label>
                            <select
                                id="products-sort"
                                className={styles.sortSelect}
                                value={sortValue}
                                onChange={(e) => setSortValue(e.target.value)}
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className={styles.loading}>Đang tải sản phẩm...</div>
                    ) : products.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Không tìm thấy sản phẩm nào.</p>
                            <button
                                type="button"
                                className={styles.btnClear}
                                onClick={clearFilters}
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className={styles.resultCount}>
                                Hiển thị {products.length} / {pagination.totalItems} sản phẩm
                            </p>
                            <div className={styles.grid}>
                                {products.map((p) => (
                                    <BookCard
                                        key={p.id}
                                        id={p.id}
                                        title={p.name}
                                        author={p.author}
                                        desc={p.description}
                                        price={formatPrice(p.price)}
                                        rating={p.rating}
                                    />
                                ))}
                            </div>
                            {pagination.totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        type="button"
                                        className={styles.pageBtn}
                                        disabled={pagination.page <= 1}
                                        onClick={() => loadProducts(pagination.page - 1)}
                                        aria-label="Trang trước"
                                    >
                                        Trước
                                    </button>
                                    <div className={styles.pageNumbers} role="navigation" aria-label="Phân trang">
                                        {getPageNumbers().map((p, i) =>
                                            p === "ellipsis" ? (
                                                <span key={`ellipsis-${i}`} className={styles.pageEllipsis} aria-hidden>
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    className={pagination.page === p ? styles.pageNumActive : styles.pageNum}
                                                    onClick={() => loadProducts(p)}
                                                    aria-label={`Trang ${p}`}
                                                    aria-current={pagination.page === p ? "page" : undefined}
                                                >
                                                    {p}
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.pageBtn}
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => loadProducts(pagination.page + 1)}
                                        aria-label="Trang sau"
                                    >
                                        Sau
                                    </button>
                                    <span className={styles.pageInfo}>
                                        Trang {pagination.page} / {pagination.totalPages}
                                        {pagination.totalItems > 0 && (
                                            <> · {pagination.totalItems} sản phẩm</>
                                        )}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {showFilters && (
                <div
                    className={styles.overlay}
                    onClick={() => setShowFilters(false)}
                    aria-hidden
                />
            )}
        </div>
    );
};

export default Products;
