import { VNDCurrencyFormatting } from '../../../../util/PublicMethod';
import styles from './item.module.css';

const Item: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.productImage}>
                <img src='https://cdn1.fahasa.com/media/catalog/product/8/9/8935236434775.jpg' alt='product-image' />
            </div>
            <p className={styles.productName}>Take Note! - Kiến Thức Trọng Tâm Luyện Thi Môn Tiếng Anh Vào Lớp 10 - Bản Màu Có Lò Xo</p>
            <p className={styles.priceDiscount}>
                <span className={styles.price}>{VNDCurrencyFormatting(90000)}</span>
                <span className={styles.discount}>-10%</span>
            </p>
            <p className={styles.oldPrice}>{VNDCurrencyFormatting(10000)}</p>
            <div className={styles.sold}>
                <span>Đã bán 0</span>
            </div>
        </div>
    );
};

export default Item;