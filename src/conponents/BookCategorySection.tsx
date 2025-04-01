import styles from './bookCategorySection.module.css';
import Line from './Line';

interface BookCategorySectionProps {
    children: React.ReactNode;
    listMenu: string[];
}

const BookCategorySection: React.FC<BookCategorySectionProps> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                {
                    props.listMenu.map((menu) => {
                        return <p>{menu}</p>
                    })
                }
            </div>
            <Line padding={0} backgroundColor='#cdcfd0' />
            {props.children}
        </div>
    )
}

export default BookCategorySection;