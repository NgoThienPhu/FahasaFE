import styles from './shoppingTrends.module.css';
import SectionHeader from '../../../../conponents/SectionHeader';
import BookCategorySection from '../../../../conponents/BookCategorySection';
import ButtonViewMore from '../../../../conponents/ButtonViewMore';
import Products from '../../../../conponents/Products';
import Product from '../../../../conponents/Product';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';

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
                    <Products
                        padding='15px 15px'
                        gapColumn='5px'
                        gapRow='5px'
                    >
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </Products>
                    <ButtonViewMore margin='25px 0' />
                </BookCategorySection>
                <BookCategorySection
                    listMenu={["Sách Tham Khảo", "Luyện Thi THPT QG"]}
                >
                    <HoziontalScrollList
                        padding='10px'
                    />
                    <ButtonViewMore margin='25px 0' />
                </BookCategorySection>
            </div>
        </div>
    )
}

export default ShoppingTrends;