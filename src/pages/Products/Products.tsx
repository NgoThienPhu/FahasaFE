import React, { useState, useMemo } from 'react'
import styles from './Products.module.css'
import { FaSearch, FaFilter, FaSort, FaShoppingCart, FaHeart } from 'react-icons/fa'

interface Book {
    id: number
    title: string
    author: string
    price: number
    originalPrice?: number
    rating: number
    cover: string
    category: string
    description: string
    inStock: boolean
}

const Products: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortByName, setSortByName] = useState('name-asc')
    const [sortByPrice, setSortByPrice] = useState('price-none')
    const [sortByRating, setSortByRating] = useState('rating-none')
    const [priceRange, setPriceRange] = useState('all')
    const [category, setCategory] = useState('all')
    const [showFilters, setShowFilters] = useState(false)

    const books: Book[] = [
        { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 89000, originalPrice: 120000, rating: 4.7, cover: '🌟', category: 'Văn học', description: 'Câu chuyện về hành trình tìm kiếm kho báu của cậu bé chăn cừu Santiago', inStock: true },
        { id: 2, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: 110000, rating: 4.8, cover: '🎯', category: 'Kỹ năng sống', description: '7 nguyên tắc cơ bản để đạt được thành công trong cuộc sống', inStock: true },
        { id: 3, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: 130000, rating: 4.7, cover: '🚀', category: 'Khoa học', description: 'Khám phá cách bộ não hoạt động và đưa ra quyết định', inStock: true },
        { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', price: 140000, rating: 4.8, cover: '💎', category: 'Lịch sử', description: 'Lịch sử loài người từ thời tiền sử đến hiện tại', inStock: true },
        { id: 5, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: 125000, rating: 4.7, cover: '⭐', category: 'Kinh doanh', description: 'Nghiên cứu về các công ty vượt trội và cách họ đạt được thành công', inStock: true },
        { id: 6, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: 85000, rating: 4.5, cover: '🎨', category: 'Kỹ năng sống', description: 'Cách sống đơn giản và hạnh phúc hơn', inStock: true },
        { id: 7, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 95000, rating: 4.8, cover: '📚', category: 'Kỹ năng sống', description: 'Nghệ thuật thu phục lòng người và giao tiếp hiệu quả', inStock: true },
        { id: 8, title: 'Atomic Habits', author: 'James Clear', price: 120000, rating: 4.9, cover: '📖', category: 'Kỹ năng sống', description: 'Cách xây dựng thói quen tốt và loại bỏ thói quen xấu', inStock: true },
        { id: 9, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 100000, rating: 4.6, cover: '🔥', category: 'Tài chính', description: 'Bài học về tài chính cá nhân và đầu tư', inStock: true },
        { id: 10, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: 75000, rating: 4.6, cover: '💡', category: 'Kỹ năng sống', description: 'Hành trình khám phá bản thân và theo đuổi đam mê', inStock: true },
        { id: 11, title: 'Sapiens', author: 'Yuval Noah Harari', price: 140000, rating: 4.8, cover: '💎', category: 'Lịch sử', description: 'Lịch sử loài người từ thời tiền sử đến hiện tại', inStock: true },
        { id: 12, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: 130000, rating: 4.7, cover: '🚀', category: 'Khoa học', description: 'Khám phá cách bộ não hoạt động và đưa ra quyết định', inStock: true },
        { id: 13, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: 110000, rating: 4.8, cover: '🎯', category: 'Kỹ năng sống', description: '7 nguyên tắc cơ bản để đạt được thành công trong cuộc sống', inStock: true },
        { id: 14, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: 125000, rating: 4.7, cover: '⭐', category: 'Kinh doanh', description: 'Nghiên cứu về các công ty vượt trội và cách họ đạt được thành công', inStock: true },
        { id: 15, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: 95000, rating: 4.8, cover: '📚', category: 'Kỹ năng sống', description: 'Nghệ thuật thu phục lòng người và giao tiếp hiệu quả', inStock: true },
        { id: 16, title: 'Atomic Habits', author: 'James Clear', price: 120000, rating: 4.9, cover: '📖', category: 'Kỹ năng sống', description: 'Cách xây dựng thói quen tốt và loại bỏ thói quen xấu', inStock: true },
        { id: 17, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 100000, rating: 4.6, cover: '🔥', category: 'Tài chính', description: 'Bài học về tài chính cá nhân và đầu tư', inStock: true },
        { id: 18, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: 75000, rating: 4.6, cover: '💡', category: 'Kỹ năng sống', description: 'Hành trình khám phá bản thân và theo đuổi đam mê', inStock: true },
        { id: 19, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: 89000, originalPrice: 120000, rating: 4.7, cover: '🌟', category: 'Văn học', description: 'Câu chuyện về hành trình tìm kiếm kho báu của cậu bé chăn cừu Santiago', inStock: true },
        { id: 20, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: 85000, rating: 4.5, cover: '🎨', category: 'Kỹ năng sống', description: 'Cách sống đơn giản và hạnh phúc hơn', inStock: true }
    ]

    const categories = ['Tất cả', 'Văn học', 'Kỹ năng sống', 'Khoa học', 'Lịch sử', 'Kinh doanh', 'Tài chính']

    const filteredAndSortedBooks = useMemo(() => {
        let filtered = books

        // Lọc theo tên sách
        if (searchTerm) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Lọc theo thể loại
        if (category !== 'all') {
            filtered = filtered.filter(book => book.category === category)
        }

        // Lọc theo khoảng giá
        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'under-50k':
                    filtered = filtered.filter(book => book.price < 50000)
                    break
                case '50k-100k':
                    filtered = filtered.filter(book => book.price >= 50000 && book.price < 100000)
                    break
                case '100k-200k':
                    filtered = filtered.filter(book => book.price >= 100000 && book.price < 200000)
                    break
                case 'over-200k':
                    filtered = filtered.filter(book => book.price >= 200000)
                    break
            }
        }

        // Sắp xếp theo tên
        if (sortByName !== 'name-none') {
            filtered.sort((a, b) => {
                if (sortByName === 'name-asc') {
                    return a.title.localeCompare(b.title)
                } else if (sortByName === 'name-desc') {
                    return b.title.localeCompare(a.title)
                }
                return 0
            })
        }

        // Sắp xếp theo giá
        if (sortByPrice !== 'price-none') {
            filtered.sort((a, b) => {
                if (sortByPrice === 'price-asc') {
                    return a.price - b.price
                } else if (sortByPrice === 'price-desc') {
                    return b.price - a.price
                }
                return 0
            })
        }

        // Sắp xếp theo đánh giá
        if (sortByRating !== 'rating-none') {
            filtered.sort((a, b) => {
                if (sortByRating === 'rating-asc') {
                    return a.rating - b.rating
                } else if (sortByRating === 'rating-desc') {
                    return b.rating - a.rating
                }
                return 0
            })
        }

        return filtered
    }, [searchTerm, sortByName, sortByPrice, sortByRating, priceRange, category])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    return (
        <div className={styles.products}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Sản phẩm</h1>
                    <p className={styles.subtitle}>Khám phá bộ sưu tập sách đa dạng của chúng tôi</p>
                </div>

                {/* Filter Bar */}
                <div className={styles.filterBar}>
                    <div className={styles.filterRow}>
                        {/* Search Input */}
                        <div className={styles.searchContainer}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        {/* Sort by Name */}
                        <div className={styles.selectContainer}>
                            <FaSort className={styles.selectIcon} />
                            <select
                                value={sortByName}
                                onChange={(e) => setSortByName(e.target.value)}
                                className={styles.select}
                            >
                                <option value="name-none">Sắp xếp tên</option>
                                <option value="name-asc">Tên A-Z</option>
                                <option value="name-desc">Tên Z-A</option>
                            </select>
                        </div>

                        {/* Sort by Price */}
                        <div className={styles.selectContainer}>
                            <FaSort className={styles.selectIcon} />
                            <select
                                value={sortByPrice}
                                onChange={(e) => setSortByPrice(e.target.value)}
                                className={styles.select}
                            >
                                <option value="price-none">Sắp xếp giá</option>
                                <option value="price-asc">Giá thấp đến cao</option>
                                <option value="price-desc">Giá cao đến thấp</option>
                            </select>
                        </div>

                        {/* Sort by Rating */}
                        <div className={styles.selectContainer}>
                            <FaSort className={styles.selectIcon} />
                            <select
                                value={sortByRating}
                                onChange={(e) => setSortByRating(e.target.value)}
                                className={styles.select}
                            >
                                <option value="rating-none">Sắp xếp đánh giá</option>
                                <option value="rating-asc">Đánh giá thấp đến cao</option>
                                <option value="rating-desc">Đánh giá cao đến thấp</option>
                            </select>
                        </div>

                        {/* Filter Toggle Button */}
                        <button
                            className={styles.filterToggle}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FaFilter className={styles.filterIcon} />
                            Bộ lọc
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className={styles.advancedFilters}>
                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Thể loại:</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="all">Tất cả thể loại</option>
                                    {categories.slice(1).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label className={styles.filterLabel}>Khoảng giá:</label>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="all">Tất cả mức giá</option>
                                    <option value="under-50k">Dưới 50.000₫</option>
                                    <option value="50k-100k">50.000₫ - 100.000₫</option>
                                    <option value="100k-200k">100.000₫ - 200.000₫</option>
                                    <option value="over-200k">Trên 200.000₫</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Info */}
                <div className={styles.resultsInfo}>
                    <span className={styles.resultsCount}>
                        Hiển thị {filteredAndSortedBooks.length} sản phẩm
                    </span>
                </div>

                {/* Books Grid */}
                <div className={styles.booksGrid}>
                    {filteredAndSortedBooks.map((book) => (
                        <div key={book.id} className={styles.bookCard}>
                            <div className={styles.bookCover}>
                                <div className={styles.coverIcon}>{book.cover}</div>
                                {book.originalPrice && (
                                    <div className={styles.discountBadge}>
                                        -{Math.round((1 - book.price / book.originalPrice) * 100)}%
                                    </div>
                                )}
                                <div className={styles.bookActions}>
                                    <button className={styles.actionBtn}>
                                        <FaHeart />
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                            
                            <div className={styles.bookContent}>
                                <h3 className={styles.bookTitle}>{book.title}</h3>
                                <p className={styles.bookAuthor}>{book.author}</p>
                                <p className={styles.bookCategory}>{book.category}</p>
                                
                                <div className={styles.bookRating}>
                                    <span className={styles.stars}>
                                        {'★'.repeat(Math.floor(book.rating))}
                                        {'☆'.repeat(5 - Math.floor(book.rating))}
                                    </span>
                                    <span className={styles.ratingNumber}>({book.rating})</span>
                                </div>

                                <div className={styles.bookPrice}>
                                    <span className={styles.currentPrice}>{formatPrice(book.price)}</span>
                                    {book.originalPrice && (
                                        <span className={styles.originalPrice}>{formatPrice(book.originalPrice)}</span>
                                    )}
                                </div>

                                <div className={styles.bookStock}>
                                    {book.inStock ? (
                                        <span className={styles.inStock}>Còn hàng</span>
                                    ) : (
                                        <span className={styles.outOfStock}>Hết hàng</span>
                                    )}
                                </div>

                                <button 
                                    className={`${styles.addToCartBtn} ${!book.inStock ? styles.disabled : ''}`}
                                    disabled={!book.inStock}
                                >
                                    <FaShoppingCart className={styles.btnIcon} />
                                    {book.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredAndSortedBooks.length === 0 && (
                    <div className={styles.noResults}>
                        <h3>Không tìm thấy sản phẩm nào</h3>
                        <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
