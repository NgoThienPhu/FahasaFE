import { useState } from 'react';
import WeeklyBestSellersData from '../WeeklyBestSellersData';
import styles from './body.module.css';
import Book from './Book';
import { VNDCurrencyFormatting } from '../../../../util/PublicMethod';

const Body: React.FC = () => {

    const [currentBook, setCurrentBook] = useState(WeeklyBestSellersData[0].id);

    const book = WeeklyBestSellersData.find((book) => {
        return book.id === currentBook;
    })

    return (
        <div className={styles.bodyContainer}>
            <div className={styles.bodyLeft}>
                {
                    WeeklyBestSellersData.map((book, index) => {
                        return (
                            <Book
                                image={book.bookImage}
                                bookName={book.bookName}
                                author={book.author}
                                point={book.point}
                                index={index + 1}
                                id={book.id}
                                currentBook={currentBook}
                                setCurrentBook={setCurrentBook}
                            />
                        )
                    })
                }
            </div>
            <div className={styles.bodyRight}>
                <div className={styles.currentBookImage}>
                    <img src={book?.bookImage} alt='currrent-book-image' />
                </div>
                <div className={styles.currentBookDescription}>
                    <p className={styles.currentBookName}>{book?.bookName}</p>
                    <p className={styles.currentBookAuthor}>Tác giả: {book?.author}</p>
                    <p className={styles.currentBookPublisher}>Nhà Xuất Bản: Thế Giới</p>
                    <p className={styles.currentBookPrice}>{VNDCurrencyFormatting(150000)}</p>
                    <p className={styles.currentBookDiscount}>
                        {VNDCurrencyFormatting(150000)} <span className={styles.discount}>20%</span>
                    </p>
                    <br />
                    <p>NGƯỜI ĐÀN ÔNG MANG TÊN OVE - CUỐN SÁCH KHIẾN TRIỆU ĐỘC GIẢ CƯỜI RỒI KHÓC</p>
                    <br />
                    <p>
                        Bạn có tin rằng một ông lão cộc cằn, khó tính lại có thể khiến bạn rơi nước mắt vì xúc động? Bạn đã bao giờ nghĩ rằng lòng nhân ái có thể đến từ những con người tưởng chừng khô khan nhất? Một ông lão cộc cằn, một con mèo hoang, vài người hàng xóm phiền phức - tất cả có thể tạo nên một câu chuyện khiến bạn bật khóc?
                    </p>
                    <br />
                    <p>VỀ TÁC GIẢ: PHẠM LỮ ÂN</p>
                    <br />
                    <p>
                        Là bút danh của đôi vợ chồng nhà báo chuyên viết cho giới trẻ, là Đặng Nguyễn Đông Vy và Nguyễn Hoàng Mai, hai nhà văn nổi bật trong dòng sách truyền cảm hứng.

                        Những tác phẩm của họ không chỉ là lời kể, mà là những triết lý sống sâu sắc, giúp độ...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Body;