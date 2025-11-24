import React from "react";
import "./BookCard.css";

interface Book {
    id: number;
    title: string;
    author: string,
    desc: string,
    price: string,
    rating: number
}

const BookCard: React.FC<Book> = (props) => {
    return (
        <div className="bookCard">
            <div className="bookCover" aria-hidden>
                <span>{props.title.split(" ")[0].slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="bookBody">
                <div className="bookMeta">
                    <h3 className="bookTitle">{props.title}</h3>
                    <span className="bookPrice">{props.price}</span>
                </div>
                <p className="bookAuthor">{props.author} · <span className="bookRating">{props.rating}★</span></p>
                <p className="bookDesc">{props.desc}</p>
                <div className="cardActions">
                    <a className="btn small" href={`/products/${props.id}`}>Xem Chi Tiết</a>
                    <button className="btn outline small">Thêm Vào Giỏ</button>
                </div>
            </div>
        </div>
    )
}

export default BookCard;
