import type { BaseEntity } from "./BaseEntity";
import type { Category } from "./Category";
import type { BasePrice } from "./BookPrice";
import type { BookImage } from "./BookImage";

interface Book extends BaseEntity {
    title: string;
    summary: string;
    author: string;
    description: string;
    publisher: string;
    isbn: string;
    primaryImage: BookImage;
    category: Category;
    publishDate: string;
    price: BasePrice;
}

export type { Book };