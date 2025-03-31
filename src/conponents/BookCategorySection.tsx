import styles from './bookCategorySection.module.css';
import ButtonViewMore from './ButtonViewMore';
import Line from './Line';
import Product from './Product';
import Products from './Products';

interface BookCategorySectionProps {
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
            <Products
                padding='15px 15px'
                gapColumn='5px'
                gapRow='5px'
            >
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </Products>
            <ButtonViewMore />
        </div>
    )
}

export default BookCategorySection;