import styles from './homePage.module.css';
import Header from './header/Header';
import Body from './body/Body';
import { useState } from 'react';

const HomePage: React.FC = () => {

    const [isOverlayBody, setIsOverlayBody] = useState(false);

    return (
        <div className={styles.container}>
            <Header setIsOverlayBody={setIsOverlayBody} />
            <Body isOverlay={isOverlayBody} />
            <div className={styles.footer}>

            </div>
        </div>
    )
}

export default HomePage;