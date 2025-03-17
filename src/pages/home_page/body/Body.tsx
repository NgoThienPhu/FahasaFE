import Banner from './banner/Banner';
import styles from './body.module.css'
import Overlay from './Overlay';

interface BodyProps {
    isOverlay: boolean;
}

const Body: React.FC<BodyProps> = ({ isOverlay }) => {
    return (
        <div className={styles.container}>
            <Banner />
            {isOverlay && <Overlay />}
        </div>
    )
}

export default Body;