import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './flahsSale.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';
import { useEffect, useRef, useState } from 'react';

const FlashSale: React.FC = () => {

    const [start, setStart] = useState(0);
    const itemsRef = useRef<HTMLDivElement | null>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [indexPage, setIndexPage] = useState(0);

    useEffect(() => {
        if (!itemsRef.current) return;
        if (indexPage === 1) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100% - 10px))`;
        if (indexPage === 0) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100%))`;
    }, [indexPage])

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement> | MouseEvent): void {
        setStart(event.clientX);
        setIsMouseDown(true);
    }

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement> | MouseEvent): void {
        if (!itemsRef.current || !isMouseDown) return;

        itemsRef.current.style.transition = 'none';

        const movementX = event.clientX - start;
        const translateValue = `calc(${indexPage} * -100% + ${movementX}px)`;

        itemsRef.current.style.transform = `translateX(${translateValue})`;
    }

    function handleMouseUp(event: React.MouseEvent<HTMLDivElement> | MouseEvent): void {
        if (!itemsRef.current) return;

        setIsMouseDown(false);
        itemsRef.current.style.transition = 'transform 0.5s ease';

        const movementX = event.clientX - start;
        const threshold = itemsRef.current.clientWidth * 0.5;

        if (movementX < -threshold && indexPage < 1) {
            setIndexPage((preVal) => preVal + 1);
            itemsRef.current.style.transform = `translateX(calc(${indexPage + 1} * -100% - 10px))`;
        } else if (movementX > threshold && indexPage > 0) {
            setIndexPage((preVal) => preVal - 1);
            itemsRef.current.style.transform = `translateX(calc(${indexPage - 1} * -100%))`;
        } else {
            if (indexPage === 1) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100% - 10px))`;
            if (indexPage === 0) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100%))`;
        }
    }

    function handleButtonLeft() {
        if (indexPage > 0) setIndexPage(indexPage - 1);
    }

    function handleButtonRight() {
        if (indexPage < 1) setIndexPage(indexPage + 1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.flashSale}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <img src='https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=' alt='logo-flash-sale' />
                        <div className={styles.cownDown}>
                            <span className={styles.lableCownDown}>Kết thúc trong</span>
                            <span className={styles.time}>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                                <span>:</span>
                                <span className={styles.flashSaleCownDownNumber}>00</span>
                            </span>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <a href='#'>
                            <span>Xem tất cả</span>
                            <FontAwesomeIcon icon={faChevronRight} size='xl' />
                        </a>
                    </div>
                </div>
                <div
                    className={styles.containerItems}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className={styles.wrapItems}>
                        <div
                            ref={itemsRef}
                            className={styles.items}
                        >
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                    </div>
                    <button
                        onClick={handleButtonLeft}
                        className={`${styles.buttonLeft} ${indexPage === 0 && styles.isHidden}`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size='xl' color='gray' />
                    </button>
                    <button
                        onClick={handleButtonRight}
                        className={`${styles.buttonRight} ${indexPage === 1 && styles.isHidden}`}
                    >
                        <FontAwesomeIcon icon={faChevronRight} size='xl' color='gray' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FlashSale;