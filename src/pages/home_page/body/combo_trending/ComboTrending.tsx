import BookCategorySection from '../../../../conponents/BookCategorySection';
import HoziontalScrollList from '../../../../conponents/HorizontalScrollList';
import SectionHeader from '../../../../conponents/SectionHeader';
import styles from './comboTrending.module.css';

const ComboTrending: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.comboTrendingContainer}>
                <SectionHeader
                    lable='Combo Trending'
                    iconUrl='https://cdn1.fahasa.com/media/wysiwyg/Thang-11-2023/icon_new.png'
                />
                <BookCategorySection
                    listMenu={["Combo Kinh Tế", "Combo Sách Học Ngoại Ngữ", "Combo Tâm Lý Kỹ Năng Sống", "Combo Văn Học"]}
                >
                    <HoziontalScrollList
                        padding='10px'
                    />
                </BookCategorySection>
            </div>
        </div>
    )
}

export default ComboTrending;