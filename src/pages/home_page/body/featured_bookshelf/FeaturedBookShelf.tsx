import BookType from '../../../../conponents/BookType';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import SectionHeader from '../../../../conponents/SectionHeader';
import styles from './featuredBookShelf.module.css';

const FeaturedBookShelf: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.featuredBookShelfContainer}>
                <SectionHeader
                    iconUrl='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_sachtrongnuoc.svg'
                    lable='Tủ Sách Nổi Bật'
                />
                <HoziontalScrollList
                    limitElement={8}
                    totalElement={8}
                >
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/9/7/9786043519112_1_1.jpg'
                        name='Ôn Luyện THPT'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/d/_/d_-m_t-qu_-2.jpg'
                        name='Kinh dị - Bí ẩn'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8935236433587.jpg'
                        name='Take note! Ngắn gọn - Dễ học'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8934974177623.jpg'
                        name='Donald Trump - Không đầu hàng'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_6_6.jpg'
                        name='Song ngữ Thiếu nhi'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/h/u/huong-dan-su-dung-me.jpg'
                        name='Ehon Nhật Bản'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/t/t/ttph---y_u-nh_ng-ng_y-n_ng-ch_ng-gh_t-nh_ng-ng_y-m_a.jpg'
                        name='Tô màu cảm xúc'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936225390010.jpg'
                        name='Tư duy siêu việt'
                    />
                </HoziontalScrollList>
            </div>
        </div>
    )
}

export default FeaturedBookShelf;