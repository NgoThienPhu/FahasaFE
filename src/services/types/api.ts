// Generic API Response
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}