import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './flahsSale.module.css';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';

const FlashSale: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.flashSale}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=' alt='logo-flash-sale' />
                        <p className={styles.cownDown}>
                            <span className={styles.lableCownDown}>Kết thúc trong</span>
                            <div className={styles.time}>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                            </div>
                        </p>
                    </div>
                    <div className={styles.headerRight}>
                        <a href='#'>
                            <span>Xem tất cả</span>
                            <FontAwesomeIcon icon={faChevronRight} size='xl' />
                        </a>
                    </div>
                </div>
                <div className={styles.items}>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>
        </div>
    );
}

export default FlashSale;