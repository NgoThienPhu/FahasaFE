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
            { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '89.000₫', rating: '4.7', cover: '🌟', badge: 'Mới', category: 'new' },
            { id: 2, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: '4.8', cover: '🎯', badge: 'Mới', category: 'new' },
            { id: 3, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: '4.7', cover: '🚀', badge: 'Mới', category: 'new' },
            { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: '4.8', cover: '💎', badge: 'Mới', category: 'new' },
            { id: 5, title: 'Từ Tốt Đến Vĩ Đại', author: 'Jim Collins', price: '125.000₫', rating: '4.7', cover: '⭐', badge: 'Mới', category: 'new' },
            { id: 6, title: 'Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm', author: 'Mark Manson', price: '85.000₫', rating: '4.5', cover: '🎨', badge: 'Mới', category: 'new' },
            
            // Sách bán chạy
            { id: 7, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: '4.8', cover: '📚', badge: 'Bán chạy', category: 'bestseller' },
            { id: 8, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: '4.9', cover: '📖', badge: 'Bán chạy', category: 'bestseller' },
            { id: 9, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: '4.6', cover: '🔥', badge: 'Bán chạy', category: 'bestseller' },
            { id: 10, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: '4.7', cover: '🚀', badge: 'Bán chạy', category: 'bestseller' },
            { id: 11, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: '4.8', cover: '💎', badge: 'Bán chạy', category: 'bestseller' },
            { id: 12, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: '4.8', cover: '🎯', badge: 'Bán chạy', category: 'bestseller' },
            
            // Sách hot
            { id: 13, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: '4.9', cover: '📖', badge: 'Hot', category: 'hot' },
            { id: 14, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: '4.6', cover: '🔥', badge: 'Hot', category: 'hot' },
            { id: 15, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: '4.8', cover: '💎', badge: 'Hot', category: 'hot' },
            { id: 16, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: '4.7', cover: '🚀', badge: 'Hot', category: 'hot' },
            { id: 17, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: '4.8', cover: '🎯', badge: 'Hot', category: 'hot' },
            { id: 18, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '95.000₫', rating: '4.8', cover: '📚', badge: 'Hot', category: 'hot' },
            
            // Khuyến mãi
            { id: 19, title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '75.000₫', rating: '4.6', cover: '💡', badge: 'Khuyến mãi', category: 'sale' },
            { id: 20, title: 'Sapiens', author: 'Yuval Noah Harari', price: '140.000₫', rating: '4.8', cover: '💎', badge: 'Khuyến mãi', category: 'sale' },
            { id: 21, title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '130.000₫', rating: '4.7', cover: '🚀', badge: 'Khuyến mãi', category: 'sale' },
            { id: 22, title: '7 Thói Quen Của Người Thành Đạt', author: 'Stephen Covey', price: '110.000₫', rating: '4.8', cover: '🎯', badge: 'Khuyến mãi', category: 'sale' },
            { id: 23, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: '100.000₫', rating: '4.6', cover: '🔥', badge: 'Khuyến mãi', category: 'sale' },
            { id: 24, title: 'Atomic Habits', author: 'James Clear', price: '120.000₫', rating: '4.9', cover: '📖', badge: 'Khuyến mãi', category: 'sale' }
        ]
        
        return allBooks.filter(book => book.category === tabId)
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
                                <div className={styles.bookCover}>{book.cover}</div>
                                <div className={styles.bookBadge}>{book.badge}</div>
                                <h3 className={styles.bookTitle}>{book.title}</h3>
                                <p className={styles.bookAuthor}>{book.author}</p>
                                <div className={styles.bookMeta}>
                                    <span className={styles.bookPrice}>{book.price}</span>
                                    <span className={styles.bookRating}>★ {book.rating}</span>
                                </div>
                                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.addToCart}`}>
                                    <FaShoppingCart className={styles.btnIcon} /> Thêm vào giỏ
                                </button>
                            </div>
                        ))}
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
