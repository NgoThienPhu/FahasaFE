import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './carousel.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const Carosel: React.FC = () => {

    const caroselTrack = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<NodeListOf<Element> | []>([]);
    const [start, setStart] = useState(0);
    const [positionX, setPositionX] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [indexItem, setIndexItem] = useState(0);

    useEffect(() => {
        setItems(document.querySelectorAll(`.${styles.carouselItem}`));
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            clickButtonNext();
        }, 5000)

        return () => clearInterval(id);
    }, [indexItem, items, positionX])

    useEffect(() => {
        if (caroselTrack.current) caroselTrack.current.style.transform = `translateX(-${100 * indexItem}%)`;
    }, [indexItem])

    useEffect(() => {
        if (caroselTrack.current) caroselTrack.current.style.transform = `translateX(calc(${positionX < 0 ? `${positionX * -1}px` : `${positionX * -1}px`} + ${indexItem * -100}%))`;
    }, [positionX]);

    function clickButtonNext() {
        if (indexItem + 1 >= items.length) {
            setIndexItem(0);
            return;
        }
        setIndexItem(indexItem + 1);
    }

    function clickButtonPrev() {
        if (indexItem - 1 < 0) {
            setIndexItem(0);
            return;
        }
        setIndexItem(indexItem - 1);
    }

    function handleMouseDownCarousel(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        setIsMouseDown(true);
        setStart(event.clientX);
    };

    function handleMouseMoveCarousel(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (caroselTrack.current && isMouseDown) {
            setPositionX(start - event.clientX);
            caroselTrack.current.style.transition = 'none';
        }
    }

    function handleMouseUpCarousel(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        setIsMouseDown(false);
        setPositionX(0);
        if (caroselTrack.current) caroselTrack.current.style.transition = 'transform 1s ease';
        if (start - event.clientX < 0 && Math.abs(start - event.clientX) >= (event.currentTarget.clientWidth * 0.3) && indexItem - 1 >= 0) {
            setIndexItem(indexItem - 1);
            return;
        }
        if (start - event.clientX > 0 && Math.abs(start - event.clientX) >= (event.currentTarget.clientWidth * 0.3) && indexItem + 1 < items.length) {
            setIndexItem(indexItem + 1);
            return;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <div
                    ref={caroselTrack}
                    className={styles.carouselTrack}
                    onMouseDown={handleMouseDownCarousel}
                    onMouseUp={handleMouseUpCarousel}
                    onMouseMove={handleMouseMoveCarousel}
                    onMouseLeave={handleMouseUpCarousel}
                >
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/Mainbanner_1503_840x320.png' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/MCBooksT3_KC_840x320.png' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/saigonbooks_bac_840x320_1.png' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/tranguudai_840x320.png' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/hoisacht3_840x320_2.jpg' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/BlingboxT125_840X320_1.jpg' alt='sale' draggable="false" />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/CanhCutThanToc_840x320.png' alt='sale' draggable="false" />
                    </div>
                </div>
            </div>
            <button onClick={clickButtonPrev} className={`${styles.carouselBtn} ${styles.prev}`}>
                <FontAwesomeIcon icon={faChevronLeft} size='sm' color='gray' />
            </button>

            <button onClick={clickButtonNext} className={`${styles.carouselBtn} ${styles.next}`}>
                <FontAwesomeIcon icon={faChevronRight} size='sm' color='gray' />
            </button>
        </div>
    )
}

export default Carosel;