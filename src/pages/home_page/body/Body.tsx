import Banner from './banner/Banner';
import styles from './body.module.css'

const Body: React.FC = () => {
    return (
        <div className={styles.container}>
            <Banner />
        </div>
    )
}

export default Body;