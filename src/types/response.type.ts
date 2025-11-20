/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  additional?: Record<string, any> | null;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, any>;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  additional?: Record<string, any> | null;
}
