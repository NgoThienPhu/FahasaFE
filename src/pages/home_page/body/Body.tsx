import Banner from './banner/Banner';
import styles from './body.module.css'
import FlashSale from './flash_sale/FlashSale';
import Overlay from './Overlay';
import ProductCatalog from './product_catalog/ProductCatalog';
import ShoppingTrends from './ShoppingTrens';
import TopOrders from './top_orders/TopOrders';

interface BodyProps {
    isOverlay: boolean;
}

const Body: React.FC<BodyProps> = ({ isOverlay }) => {
    return (
        <div className={styles.container}>
            <Banner />
            <FlashSale />
            <ProductCatalog />
            <TopOrders />
            <ShoppingTrends />
            {isOverlay && <Overlay />}
        </div>
    )
}

export default Body;