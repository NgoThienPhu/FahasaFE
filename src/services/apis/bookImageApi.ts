import apiClient, { type APISuccessResponse } from "./apiConfig";
import type { BookImage } from "../entities/BookImage";

const bookImageApi = {

    getBookSecondaryImages(id: string): Promise<APISuccessResponse<BookImage[]>> {
        return apiClient.get(`/books/${id}/images/secondary`);
    },
    
};

export default bookImageApi;