import Banner from './banner/Banner';
import styles from './body.module.css'
import ComboTrending from './combo_trending/ComboTrending';
import FeaturedBookShelf from './featured_bookshelf/FeaturedBookShelf';
import FeaturedCollections from './featured_collections/FeaturedCollections';
import FlashSale from './flash_sale/FlashSale';
import OutStandingBrand from './out_standing_brand/OutStandingBrand';
import Overlay from './overlay/Overlay';
import PartnerBrandsList from './partner_brands_list/PartnerBrandsList';
import ProductCatalog from './product_catalog/ProductCatalog';
import ShoppingTrends from './shopping_trends/ShoppingTrends';
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
            <FeaturedBookShelf />
            <FeaturedCollections />
            <OutStandingBrand />
            <ComboTrending />
            <PartnerBrandsList />
            {isOverlay && <Overlay />}
        </div>
    )
}

export default Body;