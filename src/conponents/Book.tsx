import { useEffect, useRef, useState } from 'react';
import { VNDCurrencyFormatting } from '../util/PublicMethod';
import styles from './book.module.css';

interface ProductProps {
    width?: string;
    borderRadius?: string;
    isHover?: boolean;
    bookImage: string;
    bookName: string;
}

const Book: React.FC<ProductProps> = (props) => {

    const [isHover, setIsHover] = useState(false);
    const productRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (productRef.current) {
            const style = productRef.current.style;
            if (props.width) style.width = props.width;
            if (props.borderRadius) style.borderRadius = props.borderRadius;
        }
    }, [props.width, props.borderRadius])

    function handleMouseMove() {
        if (props.isHover) setIsHover(true);
    }

    function handleMouseLeave() {
        if (props.isHover) setIsHover(false);
    }

    return (
        <div
            ref={productRef}
            className={`${styles.productContainer} ${isHover && styles.isHover}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.productImage}>
                <img src={props.bookImage} alt='product-image' draggable="false" />
            </div>
            <p className={styles.productName}>{props.bookName}</p>
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

export default Book;