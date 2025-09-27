import React, { useState } from 'react'
import styles from './Home.module.css'
import { FaBook, FaShoppingCart } from 'react-icons/fa'

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState('new')

    const tabs = [
        { id: 'new', label: 'Sách mới', icon: '🆕' },
        { id: 'bestseller', label: 'Sách bán chạy', icon: '🔥' },
        { id: 'hot', label: 'Sách hot', icon: '⭐' },
        { id: 'sale', label: 'Khuyến mãi', icon: '💥' }
    ]

    const getBooksForTab = (tabId: string) => {
        const allBooks = [
            // Sách mới
            { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '89.000₫', rating: 4.7, cover: '🌟', badge: 'Mới', category: 'new', bookCategory: 'Văn học' },
            { id: 2, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: 4.8, cover: '🎯', badge: 'Mới', category: 'new', bookCategory: 'Kỹ năng sống' },
            { id: 3, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: 4.7, cover: '🚀', badge: 'Mới', category: 'new', bookCategory: 'Khoa học' },
            { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: 4.8, cover: '💎', badge: 'Mới', category: 'new', bookCategory: 'Lịch sử' },
            { id: 5, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: '125.000₫', rating: 4.7, cover: '⭐', badge: 'Mới', category: 'new', bookCategory: 'Kinh doanh' },
            { id: 6, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: '85.000₫', rating: 4.5, cover: '🎨', badge: 'Mới', category: 'new', bookCategory: 'Kỹ năng sống' },
            { id: 7, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: 4.8, cover: '📚', badge: 'Mới', category: 'new', bookCategory: 'Kỹ năng sống' },
            { id: 8, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: 4.9, cover: '📖', badge: 'Mới', category: 'new', bookCategory: 'Kỹ năng sống' },
            { id: 9, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: 4.6, cover: '🔥', badge: 'Mới', category: 'new', bookCategory: 'Tài chính' },
            { id: 10, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '75.000₫', rating: 4.6, cover: '💡', badge: 'Mới', category: 'new', bookCategory: 'Kỹ năng sống' },
            
            // Sách bán chạy
            { id: 11, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: 4.8, cover: '📚', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kỹ năng sống' },
            { id: 12, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: 4.9, cover: '📖', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kỹ năng sống' },
            { id: 13, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: 4.6, cover: '🔥', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Tài chính' },
            { id: 14, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: 4.7, cover: '🚀', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Khoa học' },
            { id: 15, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: 4.8, cover: '💎', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Lịch sử' },
            { id: 16, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: 4.8, cover: '🎯', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kỹ năng sống' },
            { id: 17, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: '125.000₫', rating: 4.7, cover: '⭐', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kinh doanh' },
            { id: 18, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: '85.000₫', rating: 4.5, cover: '🎨', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kỹ năng sống' },
            { id: 19, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '75.000₫', rating: 4.6, cover: '💡', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Kỹ năng sống' },
            { id: 20, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '89.000₫', rating: 4.7, cover: '🌟', badge: 'Bán chạy', category: 'bestseller', bookCategory: 'Văn học' },
            
            // Sách hot
            { id: 21, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: 4.9, cover: '📖', badge: 'Hot', category: 'hot', bookCategory: 'Kỹ năng sống' },
            { id: 22, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: 4.6, cover: '🔥', badge: 'Hot', category: 'hot', bookCategory: 'Tài chính' },
            { id: 23, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: 4.8, cover: '💎', badge: 'Hot', category: 'hot', bookCategory: 'Lịch sử' },
            { id: 24, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: 4.7, cover: '🚀', badge: 'Hot', category: 'hot', bookCategory: 'Khoa học' },
            { id: 25, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: 4.8, cover: '🎯', badge: 'Hot', category: 'hot', bookCategory: 'Kỹ năng sống' },
            { id: 26, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: 4.8, cover: '📚', badge: 'Hot', category: 'hot', bookCategory: 'Kỹ năng sống' },
            { id: 27, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: '125.000₫', rating: 4.7, cover: '⭐', badge: 'Hot', category: 'hot', bookCategory: 'Kinh doanh' },
            { id: 28, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: '85.000₫', rating: 4.5, cover: '🎨', badge: 'Hot', category: 'hot', bookCategory: 'Kỹ năng sống' },
            { id: 29, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '75.000₫', rating: 4.6, cover: '💡', badge: 'Hot', category: 'hot', bookCategory: 'Kỹ năng sống' },
            { id: 30, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '89.000₫', rating: 4.7, cover: '🌟', badge: 'Hot', category: 'hot', bookCategory: 'Văn học' },
            
            // Khuyến mãi
            { id: 31, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '75.000₫', rating: 4.6, cover: '💡', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kỹ năng sống' },
            { id: 32, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: 4.8, cover: '💎', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Lịch sử' },
            { id: 33, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: 4.7, cover: '🚀', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Khoa học' },
            { id: 34, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: 4.8, cover: '🎯', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kỹ năng sống' },
            { id: 35, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: 4.6, cover: '🔥', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Tài chính' },
            { id: 36, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: 4.9, cover: '📖', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kỹ năng sống' },
            { id: 37, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: 4.8, cover: '📚', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kỹ năng sống' },
            { id: 38, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: '125.000₫', rating: 4.7, cover: '⭐', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kinh doanh' },
            { id: 39, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: '85.000₫', rating: 4.5, cover: '🎨', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Kỹ năng sống' },
            { id: 40, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '89.000₫', rating: 4.7, cover: '🌟', badge: 'Khuyến mãi', category: 'sale', bookCategory: 'Văn học' }
        ]
        
        return allBooks.filter(book => book.category === tabId).slice(0, 8)
    }

    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Khám phá thế giới sách với <span className={styles.highlight}>Fahasa</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Hơn 100,000 đầu sách từ trong nước và quốc tế, văn phòng phẩm chất lượng cao
                            và đồ chơi giáo dục cho mọi lứa tuổi.
                        </p>
                        <div className={styles.heroActions}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`}>
                                <FaShoppingCart className={styles.btnIcon} />
                                Mua sắm ngay
                            </button>
                            <button className={`${styles.btn} ${styles.btnSecondary}`}>
                                <FaBook className={styles.btnIcon} />
                                Khám phá sách
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.heroBooks}>
                            <div className={`${styles.book} ${styles.book1}`}></div>
                            <div className={`${styles.book} ${styles.book2}`}></div>
                            <div className={`${styles.book} ${styles.book3}`}></div>
                        </div>
                    </div>
                </div>
            </section>


            <section className={styles.featuredBooks}>
                <div className={styles.container}>
                    <div className={styles.tabContainer}>
                        <div className={styles.tabHeader}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className={styles.tabIcon}>{tab.icon}</span>
                                    <span className={styles.tabLabel}>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                        <a href="/products" className={styles.viewMoreLink}>
                            <span>Xem tất cả</span>
                            <div className={styles.arrowIcon}>→</div>
                        </a>
                    </div>
                    <div className={styles.booksGrid}>
                        {getBooksForTab(activeTab).map((book) => (
                            <div key={book.id} className={styles.bookCard}>
                                <div className={styles.bookCover}>
                                    <div className={styles.coverIcon}>{book.cover}</div>
                                    <div className={styles.bookBadge}>{book.badge}</div>
                                </div>
                                <div className={styles.bookContent}>
                                    <h3 className={styles.bookTitle}>{book.title}</h3>
                                    <p className={styles.bookAuthor}>{book.author}</p>
                                    <p className={styles.bookCategory}>{book.bookCategory}</p>
                                    
                                    <div className={styles.bookRating}>
                                        <span className={styles.stars}>
                                            {'★'.repeat(Math.floor(book.rating))}
                                            {'☆'.repeat(5 - Math.floor(book.rating))}
                                        </span>
                                        <span className={styles.ratingNumber}>({book.rating})</span>
                                    </div>

                                    <div className={styles.bookMeta}>
                                        <span className={styles.bookPrice}>{book.price}</span>
                                    </div>
                                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                        <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.categoryViewMore}>
                        <a href={`/products?category=${activeTab}`} className={styles.categoryViewMoreLink}>
                            <span>Xem thêm {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()}</span>
                            <div className={styles.arrowIcon}>→</div>
                        </a>
                    </div>
                </div>
            </section>


            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <div className={styles.newsletterContent}>
                        <h2 className={styles.newsletterTitle}>Đăng ký nhận tin</h2>
                        <p className={styles.newsletterDescription}>
                            Nhận thông tin về sách mới, khuyến mãi đặc biệt và ưu đãi độc quyền
                        </p>
                        <div className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className={styles.newsletterInput}
                            />
                            <button className={`${styles.btn} ${styles.btnPrimary}`}>Đăng ký</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
