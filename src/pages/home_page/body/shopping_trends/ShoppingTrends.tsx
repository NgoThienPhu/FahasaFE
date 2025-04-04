import styles from './shoppingTrends.module.css';
import SectionHeader from '../../../../conponents/SectionHeader';
import BookCategorySection from '../../../../conponents/BookCategorySection';
import ButtonViewMore from '../../../../conponents/ButtonViewMore';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import Book from '../../../../conponents/Book';
import Books from '../../../../conponents/Books';

const ShoppingTrends: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.shoppingTrends}>
                <SectionHeader
                    iconUrl='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png'
                    lable='Xu Hướng Mua Sắm'
                />
                <BookCategorySection
                    listMenu={["Xu Hướng Theo Ngày", "Sách HOT - Giảm Sốc", "Bestseller Ngoại Văn"]}
                >
                    <Books
                        padding='15px 15px'
                        gapColumn='5px'
                        gapRow='5px'
                    >
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935095633289.jpg'
                            bookName='Cuộc Cách Mạng Glucose'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235237070.jpg'
                            bookName='Cách Mạng Siêu Nhân Hóa - Công Nghệ Y Học Và Xu Hướng Kinh Tế Chia Sẻ'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_19092022_120954.jpg'
                            bookName='Những Bức Di Thư Thành Cổ'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/9/7/9786045883273.jpg'
                            bookName='Nghìn Năm Bia Miệng - Tập 2'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/t/h/th_y-gi_i----b_a1.jpg'
                            bookName='Seeing Gender - Thấy Giới'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_26495.jpg'
                            bookName='Từ Điển Thiền Tông Tân Biên - Tập 2'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235239333.jpg'
                            bookName='Chữ Số Và Thế Giới - Nguồn Gốc Bị Lãng Quên'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_227294.jpg'
                            bookName='Lịch Sử Việt Nam Bằng Tranh - Chiến Thắng Quân Nguyên Mông Lần 2 (Bản Màu)'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8932000132943.jpg'
                            bookName='Người Thầy Của Tỉnh Thức & Thương Yêu'
                            isHover={true}
                        />
                        <Book
                            width='100%'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8936067610055.jpg'
                            bookName='Kể Chuyện Sứ Thần Việt Nam (Tái Bản 2024)'
                            isHover={true}
                        />
                    </Books>
                    <ButtonViewMore margin='25px 0' />
                </BookCategorySection>
                <BookCategorySection
                    listMenu={["Sách Tham Khảo", "Luyện Thi THPT QG"]}
                >
                    <HoziontalScrollList
                        padding='10px'
                        limitElement={5}
                        totalElement={10}
                    >
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935095633289.jpg'
                            bookName='Cuộc Cách Mạng Glucose'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235237070.jpg'
                            bookName='Cách Mạng Siêu Nhân Hóa - Công Nghệ Y Học Và Xu Hướng Kinh Tế Chia Sẻ'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/n/x/nxbtre_full_19092022_120954.jpg'
                            bookName='Những Bức Di Thư Thành Cổ'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/9/7/9786045883273.jpg'
                            bookName='Nghìn Năm Bia Miệng - Tập 2'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/t/h/th_y-gi_i----b_a1.jpg'
                            bookName='Seeing Gender - Thấy Giới'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_195509_1_26495.jpg'
                            bookName='Từ Điển Thiền Tông Tân Biên - Tập 2'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8935235239333.jpg'
                            bookName='Chữ Số Và Thế Giới - Nguồn Gốc Bị Lãng Quên'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/i/m/image_227294.jpg'
                            bookName='Lịch Sử Việt Nam Bằng Tranh - Chiến Thắng Quân Nguyên Mông Lần 2 (Bản Màu)'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8932000132943.jpg'
                            bookName='Người Thầy Của Tỉnh Thức & Thương Yêu'
                            isHover={true}
                        />
                        <Book
                            width='calc(100%/5 - 8px)'
                            borderRadius='5px'
                            bookImage='https://cdn1.fahasa.com/media/catalog/product/8/9/8936067610055.jpg'
                            bookName='Kể Chuyện Sứ Thần Việt Nam (Tái Bản 2024)'
                            isHover={true}
                        />
                    </HoziontalScrollList>
                    <ButtonViewMore margin='25px 0' />
                </BookCategorySection>
            </div>
        </div>
    )
}

export default ShoppingTrends;