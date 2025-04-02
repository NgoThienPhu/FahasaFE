import { useEffect, useRef } from 'react';
import styles from './bookType.module.css';

interface BookTypeProps {
    image: string;
    name: string;
    width?: string;
}

const BookType: React.FC<BookTypeProps> = (props) => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const style = containerRef.current.style;
            if (props.width) style.width = props.width;
        }
    }, [props.width])

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.bookTypeImage}>
                <img src={props.image} alt='book-type-image' width={"100%"} draggable="false" />
            </div>
            <div className={styles.bookTypeName}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}

export default BookType;