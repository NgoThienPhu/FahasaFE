import styles from './shoppingTrens.module.css';
import SectionHeader from '../../../conponents/SectionHeader';
import BookCategorySection from '../../../conponents/BookCategorySection';

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
                />
                <BookCategorySection
                    listMenu={["Sách Tham Khảo", "Luyện Thi THPT QG"]}
                />
            </div>
        </div>
    )
}

export default ShoppingTrends;