import styles from './banner.module.css';

const Banner: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.containerBannerOne}>
                <div className={styles.carosel}>
                    <img src='https://cdn1.fahasa.com/media/magentothem/banner7/MCBooksT3_KC_840x320.png' alt='sale' />
                </div>
                <div className={styles.saleOne}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/pizzahut_392x156.jpg' alt='sale' />
                </div>
                <div className={styles.saleTwo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/ShopeeSubBanner_392x156%20.png' alt='sale' />
                </div>
            </div>
            <div className={styles.containerBannerTwo}>
                <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/dutopnganhhang_t3_310x210%20_1.jpg' alt='sale' />
                <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/NgoaiVanT3_Resize_310x210.png' alt='sale' />
                <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/MinhLong__310x210.png' alt='sale' />
                <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/laprap_310X210.jpg' alt='sale' />
            </div>
            <div className={styles.containerBannerThree}>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_DuaTop_120x120.png' alt='logo' />
                    <p>Game Đua Top Đơn Hàng</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_1503_120x120.png' alt='logo' />
                    <p>DDay 15.03</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_DinhTi_120x120_2.png' alt='logo' />
                    <p>Đinh Tị</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_MCbook_120x120_1.png' alt='logo' />
                    <p>McBooks</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png' alt='logo' />
                    <p>Mã Giảm Giá</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png' alt='logo' />
                    <p>Sản Phẩm Mới</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2024/Icon_GiamGia_120x120.png' alt='logo' />
                    <p>Sản Phẩm Được Trợ Giá</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-01-2024/ChoDoCu.png' alt='logo' />
                    <p>Phiên Chợ Đồ Cũ</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/ICON/Icon_DonSi_120x120.png' alt='logo' />
                    <p>Bán Sỉ</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-06-2024/icon_ManngaT06.png' alt='logo' />
                    <p>Managa</p>
                </div>
            </div>
        </div>
    )
}

export default Banner;