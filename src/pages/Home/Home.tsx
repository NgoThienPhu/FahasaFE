import React from "react";
import "./Home.css";
import BookCard from "../../compoments/book_card/BookCard";
import { NavLink } from "react-router-dom";

const books = [
  { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", desc: "Hành trình tìm kiếm giấc mơ và bản thân.", price: "149.000₫", rating: 4.6 },
  { id: 2, title: "Lược Sử Thời Gian", author: "Stephen Hawking", desc: "Khám phá vũ trụ và những bí ẩn của thời gian.", price: "220.000₫", rating: 4.7 },
  { id: 3, title: "Đắc Nhân Tâm", author: "Dale Carnegie", desc: "Những nguyên tắc vàng để thành công trong cuộc sống.", price: "129.000₫", rating: 4.5 },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", desc: "Lịch sử loài người nhìn từ góc độ khác.", price: "195.000₫", rating: 4.8 },
];

const Home: React.FC = () => {
  return (
    <div className="homeContainer">
      <div className="homeHero">
        <div className="heroInner container">
          <h1 className="heroTitle">Fahasa</h1>
          <p className="heroSubtitle">Khám phá bộ sưu tập sách phong phú — từ tiểu thuyết, khoa học đến sách phát triển bản thân.</p>
          <div className="heroActions">
            <a className="btn primary" href="#featured">Khám Phá Sách</a>
            <NavLink className="btn" to={"/products"}>Tất Cả Sản Phẩm</NavLink>
          </div>
        </div>
      </div>

      <div className="homeContent container">
        <div className="introSection">
          <h2>VÌ SAO NÊN ĐỌC SÁCH ?</h2>
          <p>
            Sách là nguồn tri thức vô tận, giúp mở mang tầm hiểu biết và nuôi dưỡng cảm xúc.
            Dù bạn tìm kiếm cảm hứng, kiến thức chuyên môn hay câu chuyện thư giãn — sách luôn có giá trị.
          </p>
        </div>

        <div id="featured" className="featureSection">
          <h2>SÁCH NỔI BẬT</h2>
          <div className="bookGrid">
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