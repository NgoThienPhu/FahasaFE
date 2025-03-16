import { useRef, useState } from 'react';
import styles from './categoryMenu.module.css';

interface CategoryImageType {
    lable: string;
    src: string;
}

interface CategoryMenuProps {
    images: CategoryImageType[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ images }) => {

    const refBannerThree = useRef<HTMLDivElement | null>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [start, setStart] = useState(0);

    function handleMouseDownBanner(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        setIsMouseDown(true);
        setStart(event.clientX);
        if (refBannerThree.current) refBannerThree.current.style.transition = `none`;
    }

    function handleMouseMoveBanner(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const rangle = start - event.clientX;
        if (refBannerThree.current && isMouseDown) refBannerThree.current.style.transform = `translateX(${rangle < 0 ? rangle * -1 : rangle * -1}px)`;
    }

    function handleMouseUpBanner() {
        setIsMouseDown(false);
        if (refBannerThree.current) {
            refBannerThree.current.style.transition = `transform 1s ease`;
            refBannerThree.current.style.transform = `translateX(0px)`;
        }
    }

    return (
        <div
            onMouseDown={handleMouseDownBanner}
            onMouseMove={handleMouseMoveBanner}
            onMouseUp={handleMouseUpBanner}
            onMouseLeave={handleMouseUpBanner}
            className={styles.container}
        >
            <div
                ref={refBannerThree}
                className={styles.containerBanner}
            >
                {
                    images.map((image, index) => {
                        return (
                            <div key={index} className={styles.logo}>
                                <img src={image.src} alt='logo' draggable="false" />
                                <p>{image.lable}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default CategoryMenu;