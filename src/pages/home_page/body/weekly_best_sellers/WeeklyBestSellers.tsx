import BookCategorySection from '../../../../conponents/BookCategorySection';
import ButtonViewMore from '../../../../conponents/ButtonViewMore';
import Body from './Body';
import styles from './weeklyBestSellers.module.css';

const WeeklyBestSellers: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.weeklyBestSellers}>
                <div className={styles.header}>
                    <p>Bảng xếp hạng bán chạy tuần</p>
                </div>
                <BookCategorySection
                    listMenu={["Văn Học", "Kinh Tế", "Tâm Lý - Kỹ Năng Sống", "Thiếu Nhi", "Sách Học Ngoại Ngữ", "Foreign Book", "Thể Loại Khác"]}
                    isShowLine={false}
                    paddingMenu='5px 10px 15px 15px'
                >
                    <Body />
                </BookCategorySection>
                <ButtonViewMore
                    margin='15px 0'
                />
            </div>
        </div>
    )
}

export default WeeklyBestSellers;