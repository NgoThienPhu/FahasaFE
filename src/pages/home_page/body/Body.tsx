import Banner from './banner/Banner';
import styles from './body.module.css'
import FlashSale from './flash_sale/FlashSale';
import Overlay from './Overlay';

interface BodyProps {
    isOverlay: boolean;
}

const Body: React.FC<BodyProps> = ({ isOverlay }) => {
    return (
        <div className={styles.container}>
            <Banner />
            <FlashSale />
            {isOverlay && <Overlay />}
        </div>
    )
}

export default Body;