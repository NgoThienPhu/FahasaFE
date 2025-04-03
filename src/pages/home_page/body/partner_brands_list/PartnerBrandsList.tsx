import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import styles from './partnerBrandsList.module.css';

const PartnerBrandsList: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.partnerBrandsListContainer}>
                <HoziontalScrollList
                    limitElement={9}
                    totalElement={18}
                    gap="0px"
                    padding='10px'
                >
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/9_NCC_MinhLong_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_AlphaBooks_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_SBooks_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/5_NCC_McBook_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_patech_1_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_DinhTi_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_HaiDang_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_HuongTrang_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/12_NCC_Duka_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/9_NCC_MinhLong_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_AlphaBooks_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_SBooks_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/5_NCC_McBook_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_patech_1_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_DinhTi_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_HaiDang_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/NCC_HuongTrang_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                    <div className={styles.banner}>
                        <img src='https://cdn1.fahasa.com/media/wysiwyg/Hien_UI/LogoNCC/12_NCC_Duka_115x115.png' alt='banner-img' width={"100%"} draggable="false" />
                    </div>
                </HoziontalScrollList>
            </div>
        </div>
    )
}

export default PartnerBrandsList;