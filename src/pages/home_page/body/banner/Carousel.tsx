import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './carousel.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {

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
        }
        if (start - event.clientX > 0 && Math.abs(start - event.clientX) >= (event.currentTarget.clientWidth * 0.3) && indexItem + 1 < items.length) {
            setIndexItem(indexItem + 1);
        }
    }

    function handleMouseLeaveCarousel(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (isMouseDown) {
            handleMouseUpCarousel(event);
        } else {
            if (caroselTrack.current) caroselTrack.current.style.transform = `translateX(-${100 * indexItem}%)`;
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
                    onMouseLeave={handleMouseLeaveCarousel}
                >
                    {
                        images.map((image, index) => {
                            return (
                                <div key={index} className={styles.carouselItem}>
                                    <img src={image} alt='sale' draggable="false" />
                                </div>
                            );
                        })
                    }
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

export default Carousel;