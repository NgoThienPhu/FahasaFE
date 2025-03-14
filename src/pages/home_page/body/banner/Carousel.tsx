import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './carousel.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const Carosel: React.FC = () => {

    const caroselTrack = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<NodeListOf<Element> | []>([]);
    const [indexItem, setIndexItem] = useState(0);

    useEffect(() => {
        setItems(document.querySelectorAll(`.${styles.carouselItem}`));
    }, []);

    useEffect(() => {
        if (caroselTrack.current) caroselTrack.current.style.transform = `translateX(-${100 * indexItem}%)`;
    }, [indexItem])

    function clickButtonNext() {
        console.log(items.length)
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

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <div ref={caroselTrack} className={styles.carouselTrack}>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/Mainbanner_1503_840x320.png' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/MCBooksT3_KC_840x320.png' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/saigonbooks_bac_840x320_1.png' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/tranguudai_840x320.png' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/hoisacht3_840x320_2.jpg' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/BlingboxT125_840X320_1.jpg' alt='sale' />
                    </div>
                    <div className={styles.carouselItem}>
                        <img src='https://cdn1.fahasa.com/media/magentothem/banner7/CanhCutThanToc_840x320.png' alt='sale' />
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