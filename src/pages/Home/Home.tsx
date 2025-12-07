import React from "react";
import styles from "./Home.module.css";
import BookCard from "../../components/book_card/BookCard";
import { NavLink } from "react-router-dom";

const books = [
  { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", desc: "Hành trình tìm kiếm giấc mơ và bản thân.", price: "149.000₫", rating: 4.6 },
  { id: 2, title: "Lược Sử Thời Gian", author: "Stephen Hawking", desc: "Khám phá vũ trụ và những bí ẩn của thời gian.", price: "220.000₫", rating: 4.7 },
  { id: 3, title: "Đắc Nhân Tâm", author: "Dale Carnegie", desc: "Những nguyên tắc vàng để thành công trong cuộc sống.", price: "129.000₫", rating: 4.5 },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", desc: "Lịch sử loài người nhìn từ góc độ khác.", price: "195.000₫", rating: 4.8 },
];

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHero}>
        <div className={`${styles.heroInner} container`}>
          <h1 className={styles.heroTitle}>Fahasa</h1>
          <p className={styles.heroSubtitle}>Khám phá bộ sưu tập sách phong phú — từ tiểu thuyết, khoa học đến sách phát triển bản thân.</p>
          <div className={styles.heroActions}>
            <a className={`${styles.btn} ${styles.primary}`} href={"#featured"}>Khám Phá Sách</a>
            <NavLink className={styles.btn} to={"/products"}>Tất Cả Sản Phẩm</NavLink>
          </div>
        </div>
      </div>

      <div className={`${styles.homeContent} container`}>
        <div id="featured" className={styles.featureSection}>
          <h2>SÁCH NỔI BẬT</h2>
          <div className={styles.bookGrid}>
            {books.map((b) => (
              <BookCard key={b.id} id={b.id} title={b.title} author={b.author} desc={b.desc} price={b.price} rating={b.rating} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;