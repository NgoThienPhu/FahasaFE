import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './flahsSale.module.css';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import Book from '../../../../conponents/Book';

const FlashSale: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.flashSale}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=' alt='logo-flash-sale' />
                        <div className={styles.cownDown}>
                            <span className={styles.lableCownDown}>Kết thúc trong</span>
                            <span className={styles.time}>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <a href='#'>
                            <span>Xem tất cả</span>
                            <FontAwesomeIcon icon={faChevronRight} size='xl' />
                        </a>
                    </div>
                </div>
                <HoziontalScrollList>
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935095633289.jpg'
                        bookName='Cuộc Cách Mạng Glucose'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235237070.jpg'
                        bookName='Cách Mạng Siêu Nhân Hóa - Công Nghệ Y Học Và Xu Hướng Kinh Tế Chia Sẻ'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_19092022_120954.jpg'
                        bookName='Những Bức Di Thư Thành Cổ'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/9/7/9786045883273.jpg'
                        bookName='Nghìn Năm Bia Miệng - Tập 2'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/t/h/th_y-gi_i----b_a1.jpg'
                        bookName='Seeing Gender - Thấy Giới'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_26495.jpg'
                        bookName='Từ Điển Thiền Tông Tân Biên - Tập 2'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235239333.jpg'
                        bookName='Chữ Số Và Thế Giới - Nguồn Gốc Bị Lãng Quên'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_227294.jpg'
                        bookName='Lịch Sử Việt Nam Bằng Tranh - Chiến Thắng Quân Nguyên Mông Lần 2 (Bản Màu)'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8932000132943.jpg'
                        bookName='Người Thầy Của Tỉnh Thức & Thương Yêu'
                    />
                    <Book
                        width='calc(100%/5 - 8px)'
                        borderRadius='5px'
                        bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8936067610055.jpg'
                        bookName='Kể Chuyện Sứ Thần Việt Nam (Tái Bản 2024)'
                    />
                </HoziontalScrollList>
            </div>
        </div>
    );
}

export default FlashSale;