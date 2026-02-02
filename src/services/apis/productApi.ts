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

const MOCK_CATEGORIES: Category[] = [
    { id: "van-hoc", name: "Văn học" },
    { id: "khoa-hoc", name: "Khoa học" },
    { id: "ky-nang", name: "Kỹ năng & Phát triển bản thân" },
    { id: "kinh-te", name: "Kinh tế" },
];

const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: "Nhà Giả Kim", author: "Paulo Coelho", description: "Hành trình tìm kiếm giấc mơ và bản thân.", price: 149000, rating: 4.6, soldCount: 1200, categoryId: "van-hoc" },
    { id: 2, name: "Lược Sử Thời Gian", author: "Stephen Hawking", description: "Khám phá vũ trụ và những bí ẩn của thời gian.", price: 220000, rating: 4.7, soldCount: 890, categoryId: "khoa-hoc" },
    { id: 3, name: "Đắc Nhân Tâm", author: "Dale Carnegie", description: "Những nguyên tắc vàng để thành công trong cuộc sống.", price: 129000, rating: 4.5, soldCount: 2100, categoryId: "ky-nang" },
    { id: 4, name: "Sapiens", author: "Yuval Noah Harari", description: "Lịch sử loài người nhìn từ góc độ khác.", price: 195000, rating: 4.8, soldCount: 1500, categoryId: "khoa-hoc" },
    { id: 5, name: "Tôi Tài Giỏi Bạn Cũng Thế", author: "Adam Khoo", description: "Phương pháp học tập hiệu quả.", price: 99000, rating: 4.4, soldCount: 3200, categoryId: "ky-nang" },
    { id: 6, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Tư duy về tiền bạc và đầu tư.", price: 179000, rating: 4.6, soldCount: 1800, categoryId: "kinh-te" },
    { id: 7, name: "Đại Dương Đen", author: "Nguyễn Nhật Ánh", description: "Câu chuyện tuổi thơ và biển.", price: 85000, rating: 4.7, soldCount: 950, categoryId: "van-hoc" },
    { id: 8, name: "Bí Mật Của May Mắn", author: "Alex Rovira", description: "Hành trình tìm kiếm may mắn trong cuộc sống.", price: 119000, rating: 4.3, soldCount: 760, categoryId: "ky-nang" },
    { id: 9, name: "Cây Cam Ngọt Của Tôi", author: "José Mauro de Vasconcelos", description: "Tuổi thơ và tình yêu thương.", price: 79000, rating: 4.8, soldCount: 1100, categoryId: "van-hoc" },
    { id: 10, name: "Tư Duy Nhanh Và Chậm", author: "Daniel Kahneman", description: "Hai hệ thống tư duy ảnh hưởng đến quyết định.", price: 249000, rating: 4.7, soldCount: 640, categoryId: "kinh-te" },
];

const productApi = {
    getCategories(): Promise<Category[]> {
        return Promise.resolve(MOCK_CATEGORIES);
    },

    getProducts(
        params: ProductListParams = {}
    ): Promise<APIPaginationSuccessResponse<Product[]>> {
        const {
            categoryIds = [],
            minPrice,
            maxPrice,
            sortBy = "name",
            order = "asc",
            page = 1,
            limit = 12,
        } = params;

        let list = [...MOCK_PRODUCTS];

        if (categoryIds.length > 0) {
            list = list.filter((p) => categoryIds.includes(p.categoryId));
        }
        if (minPrice != null) {
            list = list.filter((p) => p.price >= minPrice);
        }
        if (maxPrice != null) {
            list = list.filter((p) => p.price <= maxPrice);
        }

        const asc = order === "asc";
        list.sort((a, b) => {
            if (sortBy === "name") return asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            if (sortBy === "price") return asc ? a.price - b.price : b.price - a.price;
            if (sortBy === "rating") return asc ? a.rating - b.rating : b.rating - a.rating;
            if (sortBy === "sold") return asc ? a.soldCount - b.soldCount : b.soldCount - a.soldCount;
            return 0;
        });

        const totalItems = list.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / limit));
        const start = (page - 1) * limit;
        const data = list.slice(start, start + limit);

        return Promise.resolve({
            data,
            pagination: { page, limit, totalItems, totalPages },
            message: "OK",
            status: 200,
            timestamp: new Date().toISOString(),
        });
    },
};

export default productApi;
