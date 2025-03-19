import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './productCatalog.module.css';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Items from './items/Items';
import ProductCatalogData from '../ProductCatalogData';

const ProductCatalog: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.warpContent}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={faList} size='xl' color='#c92127' />
                    <p>Danh mục sản phẩm</p>
                </div>
                <div className={styles.containerLine}>
                    <div className={styles.line}></div>
                </div>
                <Items items={ProductCatalogData} />
            </div>
        </div>
    );
}

export default ProductCatalog;