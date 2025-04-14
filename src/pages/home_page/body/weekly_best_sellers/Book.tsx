import styles from './book.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';

interface BookProps {
    index: number;
    id: number;
    image: string;
    bookName: string;
    author: string;
    point: number;
    currentBook: number;
    setCurrentBook: React.Dispatch<React.SetStateAction<number>>;
}

const Book: React.FC<BookProps> = (props) => {


    function handleMouseMove() {
        props.setCurrentBook(props.id)
    }

    return (
        <div
            className={`${styles.book} ${props.id === props.currentBook && styles.isHover}`}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.icon}>
                <p>{"0" + props.index}</p>
                <FontAwesomeIcon icon={faCircleUp} size='lg' color='green' />
            </div>
            <div className={styles.bookImage}>
                <img src={props.image} alt='book-image' />
            </div>
            <div className={styles.bookDescription}>
                <p className={styles.bookName}>{props.bookName}</p>
                <p className={styles.author}>{props.author}</p>
                <p className={styles.point}>{props.point} điểm</p>
            </div>
        </div>
    )
}

export default Book;