import { useEffect, useRef, useState } from 'react';
import styles from './horizontalScrollList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface HoziontalScrollListProps {
    children: React.ReactNode;
    padding?: string;
    totalElement: number;
    limitElement: number;
}

const HoziontalScrollList: React.FC<HoziontalScrollListProps> = (props) => {

    const [start, setStart] = useState(0);
    const itemsRef = useRef<HTMLDivElement | null>(null);
    const wrapItemsRef = useRef<HTMLDivElement | null>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [indexPage, setIndexPage] = useState(0);
    const totalPage = props.totalElement / props.limitElement + (props.totalElement % props.limitElement === 0 ? 0 : 1)

    useEffect(() => {
        if (!itemsRef.current) return;
        if (indexPage === 0) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100%))`;
        if (indexPage <= totalPage - 1) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100% - (10px * ${indexPage})))`;
    }, [indexPage, totalPage])

    useEffect(() => {
        if (wrapItemsRef.current) {
            const style = wrapItemsRef.current.style;
            if (props.padding) style.padding = props.padding;
        }
    }, [props.padding])

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

        if (movementX < -threshold && indexPage < totalPage - 1) {
            setIndexPage((preVal) => preVal + 1);
            itemsRef.current.style.transform = `translateX(calc(${indexPage + 1} * -100% - (10px * ${indexPage})))`;
        } else if (movementX > threshold && indexPage > 0) {
            setIndexPage((preVal) => preVal - 1);
            itemsRef.current.style.transform = `translateX(calc(${indexPage - 1} * -100%))`;
        } else {
            if (indexPage === totalPage - 1) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100% - (10px * ${indexPage})))`;
            if (indexPage === 0) itemsRef.current.style.transform = `translateX(calc(${indexPage} * -100%))`;
        }
    }

    function handleButtonLeft() {
        if (indexPage > 0) setIndexPage(indexPage - 1);
    }

    function handleButtonRight() {
        if (indexPage < totalPage) setIndexPage(indexPage + 1);
    }

    return (
        <div
            className={styles.containerItems}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                ref={wrapItemsRef}
                className={styles.wrapItems}
            >
                <div
                    ref={itemsRef}
                    className={styles.items}
                >
                    {props.children}
                </div>
            </div>
            <button
                onClick={handleButtonLeft}
                className={`${styles.buttonLeft} ${(indexPage === 0 || props.totalElement <= props.limitElement) && styles.isHidden}`}
            >
                <FontAwesomeIcon icon={faChevronLeft} size='xl' color='gray' />
            </button>
            <button
                onClick={handleButtonRight}
                className={`${styles.buttonRight} ${(indexPage === totalPage - 1 || props.totalElement <= props.limitElement) && styles.isHidden}`}
            >
                <FontAwesomeIcon icon={faChevronRight} size='xl' color='gray' />
            </button>
        </div>
    )
}

export default HoziontalScrollList;