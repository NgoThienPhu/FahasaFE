import apiClient, { type APISuccessResponse, type APIPaginationSuccessResponse } from "./config";
import type { Book } from "../entities/Book";

export interface GetBooksParams {
    page: number;
    size: number;
    search?: string;
    orderBy?: "asc" | "desc";
    sortBy?: "title" | "publishDate" | "author" | "createdAt" | "category";
    categoryId?: string;
}

const bookApi = {
    getBooks(params: GetBooksParams): Promise<APIPaginationSuccessResponse<Book[]>> {
        const search = params.search?.trim();
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
        const categoryParam = params.categoryId ? `&categoryId=${encodeURIComponent(params.categoryId)}` : "";
        return apiClient.get(
            `/books?page=${params.page}&size=${params.size}&orderBy=${params.orderBy}&sortBy=${params.sortBy}${searchParam}${categoryParam}`
        );
    },

    getBookById(id: string): Promise<APISuccessResponse<Book>> {
        return apiClient.get(`/books/${id}`);
    },
};

export default bookApi;