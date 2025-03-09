import styles from './homePage.module.css';
import Header from './Header';

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>

            </div>
            <div className={styles.footer}>

            </div>
        </div>
    )
}

export default HomePage;