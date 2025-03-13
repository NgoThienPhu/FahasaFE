import styles from './homePage.module.css';
import Header from './header/Header';
import Body from './body/Body';

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Body />
            <div className={styles.footer}>

            </div>
        </div>
    )
}

export default HomePage;