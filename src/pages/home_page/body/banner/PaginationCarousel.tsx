import { JSX } from 'react';
import styles from './paginationCarousel.module.css';

interface PaginationCarouselProps {
    sum: number;
    current: number;
}

const PaginationCarousel: React.FC<PaginationCarouselProps> = ({ sum, current }) => {
    return (
        <div className={styles.container}>
            {
                renderItems(sum, current)
            }
        </div>
    )
};

function renderItems(sum: number, current: number): JSX.Element[] {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < sum; i++) {
        elements.push(
            <div key={i} className={`${styles.page} ${i === current && styles.isActive}`}></div>
        );
    }
    return elements;
};

export default PaginationCarousel;