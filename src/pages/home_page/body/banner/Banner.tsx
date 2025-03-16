import { useRef } from 'react';
import styles from './banner.module.css';
import Carousel from './Carousel';

const Banner: React.FC = () => {

    const refBannerThree = useRef<HTMLDivElement | null>(null);

    function handleMouseDownBannerThree(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (refBannerThree) {
            console.log(event.clientX)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBannerOne}>
                <Carousel />
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
            <div
                ref={refBannerThree}
                className={styles.containerBannerThree}
                onMouseDown={handleMouseDownBannerThree}
            >
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_DuaTop_120x120.png' alt='logo' draggable="true" />
                    <p>Game Đua Top Đơn Hàng</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_1503_120x120.png' alt='logo' draggable="true" />
                    <p>DDay 15.03</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_DinhTi_120x120_2.png' alt='logo' draggable="true" />
                    <p>Đinh Tị</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-03-2025/Icon_MCbook_120x120_1.png' alt='logo' draggable="true" />
                    <p>McBooks</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png' alt='logo' draggable="true" />
                    <p>Mã Giảm Giá</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png' alt='logo' draggable="true" />
                    <p>Sản Phẩm Mới</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-05-2024/Icon_GiamGia_120x120.png' alt='logo' draggable="true" />
                    <p>Sản Phẩm Được Trợ Giá</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-01-2024/ChoDoCu.png' alt='logo' draggable="true" />
                    <p>Phiên Chợ Đồ Cũ</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Duy-VHDT/ICON/Icon_DonSi_120x120.png' alt='logo' draggable="true" />
                    <p>Bán Sỉ</p>
                </div>
                <div className={styles.logo}>
                    <img src='https://cdn1.fahasa.com/media/wysiwyg/Thang-06-2024/icon_ManngaT06.png' alt='logo' draggable="true" />
                    <p>Managa</p>
                </div>
            </div>
        </div>
    )
}

export default Banner;