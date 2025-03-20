import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './productCatalog.module.css';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Items from './items/Items';
import ProductCatalogData from '../ProductCatalogData';
import Line from '../../../../conponents/Line';

const ProductCatalog: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.warpContent}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={faList} size='xl' color='#c92127' />
                    <p>Danh mục sản phẩm</p>
                </div>
                <Line />
                <Items items={ProductCatalogData} />
            </div>
        </div>
    );
}

export default ProductCatalog;