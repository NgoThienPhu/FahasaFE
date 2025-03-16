import styles from './promotionBanner.module.css';

interface PromotionBannerProps {
    images: string[];
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ images }) => {
    return (
        <div className={styles.containerBannerTwo}>
            {
                images.map((image, index) => {
                    return <img key={index} src={image} alt='sale' />
                })
            }
        </div>
    )
};

export default PromotionBanner;