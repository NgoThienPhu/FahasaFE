import type { Category } from "../entities/Category";
import apiClient, { type APIPaginationSuccessResponse } from "./apiConfig";

const categoryApi = {

    getCategories(): Promise<APIPaginationSuccessResponse<Category[]>> {
        return apiClient.get("/categories");
    },

};

export default categoryApi;
