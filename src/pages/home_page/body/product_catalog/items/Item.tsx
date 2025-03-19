import styles from './item.module.css';
import { ItemType } from './Items';

const Item: React.FC<ItemType> = ({ name, src }) => {
    return (
        <div className={styles.item}>
            <div className={styles.itemImage}>
                <img src={src} alt='item-icon' />
            </div>
            <p className={styles.itemName}>{name}</p>
        </div>
    )
};

export default Item;