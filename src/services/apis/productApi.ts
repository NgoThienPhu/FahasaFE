import type { APIPaginationSuccessResponse } from "./config";

export interface Product {
    id: number;
    name: string;
    author: string;
    description: string;
    price: number;
    rating: number;
    soldCount: number;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface ProductListParams {
    categoryIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "name" | "price" | "rating" | "sold";
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
}

const productApi = {
    getCategories(): Promise<Category[]> {
        return Promise.resolve([]);
    },

    getProducts(
        params: ProductListParams = {}
    ): Promise<APIPaginationSuccessResponse<Product[]>> {
        const { page = 1, limit = 12 } = params;
        return Promise.resolve({
            data: [],
            pagination: { page, limit, totalItems: 0, totalPages: 1 },
            message: "OK",
            status: 200,
            timestamp: new Date().toISOString(),
        });
    },
};

export default productApi;
