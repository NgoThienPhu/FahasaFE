import apiClient, { type APISuccessResponse } from "./apiConfig";

export interface OrderLineItem {
    bookId: string;
    quantity: number;
}

export interface CreateOrderParams {
    items: OrderLineItem[];
    paymentType: "COD" | "QR";
    fullName: string;
    phoneNumber: string;
    addressDetail: string;
    city: string;
    district: string;
    ward: string;
    note: string;
}

export type CreateOrderData = {
    id?: string;
    orderCode?: string;
    code?: string;
} & Record<string, unknown>;

const orderApi = {
    createOrder(params: CreateOrderParams): Promise<APISuccessResponse<CreateOrderData>> {
        return apiClient.post("/orders", params);
    },
};

export default orderApi;
