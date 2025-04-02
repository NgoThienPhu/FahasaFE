import BookType from '../../../../conponents/BookType';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import SectionHeader from '../../../../conponents/SectionHeader';
import styles from './featuredCollections.module.css';

const FeaturedCollections: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.featuredCollectionsContainer}>
                <SectionHeader
                    iconUrl='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/category/ico_sachtrongnuoc.svg'
                    lable='Bộ Sưu Tập Nổi Bật'
                />
                <HoziontalScrollList>
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/6/9/6976919369788_1.jpg'
                        name='Baby Three'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936134264082.jpg'
                        name='Doraemon'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/1/8/1890000035121-_3_.jpg'
                        name='Capybara'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936134261302.jpg'
                        name='One Piece'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936134262521.jpg'
                        name='Conan'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8935306041285-mau1.jpg'
                        name='Panda - Gấu trúc'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936134263238-_1_.jpg'
                        name='Disney'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/f/u/fun-with-mickey-and-friends-9781788108676_2.jpg'
                        name='Sanrio'
                    />
                    <BookType
                        width='calc((100%/8) - 8px)'
                        image='https://cdn0.fahasa.com/media/catalog/product/8/9/8936134263238-_1_.jpg'
                        name='Ôn Luyện THPT'
                    />
                </HoziontalScrollList>
            </div>
        </div>
    )
}

export default FeaturedCollections;