import type { BaseEntity } from "./BaseEntity";
import type { Category } from "./Category";
import type { BasePrice } from "./BookPrice";

interface Book extends BaseEntity {
    title: string;
    author: string;
    description: string;
    publisher: string;
    isbn: string;
    category: Category;
    publishDate: string;
    price: BasePrice;
}

export type { Book };