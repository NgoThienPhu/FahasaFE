import styles from './banner.module.css';
import Carousel from './Carousel';
import CategoryMenu from './CategoryMenu';
import PromotionBanner from './PromotionBanner';
import { PromotionBannerImages, CategoryMenuImages, CarouselImages } from './BannerData'

const Banner: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.containerBannerOne}>
                <Carousel images={CarouselImages} />
                <div className={styles.saleOne}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/pizzahut_392x156.jpg' alt='sale' />
                </div>
                <div className={styles.saleTwo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/ShopeeSubBanner_392x156%20.png' alt='sale' />
                </div>
            </div>
            <PromotionBanner images={PromotionBannerImages} />
            <CategoryMenu images={CategoryMenuImages} />
        </div>
    )
}

export default Banner;