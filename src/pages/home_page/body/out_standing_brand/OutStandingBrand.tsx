import BookCategorySection from '../../../../conponents/BookCategorySection';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import SectionHeader from '../../../../conponents/SectionHeader';
import styles from './outStandingBrand.module.css';

const OutStandingBrand: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.OutStandingBrandContainer}>
                <SectionHeader
                    lable='Thương Hiệu Nổi Bật'
                    iconUrl='https://cdn1.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png'
                />
                <BookCategorySection
                    listMenu={["Minh Long", "Sbooks", "Patech"]}
                >
                    <HoziontalScrollList
                        padding='10px'
                    />
                </BookCategorySection>
                <BookCategorySection
                    listMenu={["Mcbooks", "Alphabooks"]}
                >
                    <HoziontalScrollList
                        padding='10px'
                    />
                </BookCategorySection>
            </div>
        </div >
    )
}

export default OutStandingBrand;