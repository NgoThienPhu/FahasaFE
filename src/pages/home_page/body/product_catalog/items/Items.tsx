import Item from './Item';
import styles from './items.module.css';

interface ItemType {
    src: string;
    name: string;
}

interface ItemsProps {
    items: ItemType[];
}

const Items: React.FC<ItemsProps> = ({ items }) => {
    return (
        <div className={styles.items}>
            {
                items.map((item, index) => {
                    return <Item key={index} name={item.name} src={item.src} />
                })
            }
        </div>
    );
}

export default Items;
export type { ItemType }