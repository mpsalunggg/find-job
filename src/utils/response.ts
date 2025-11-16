import { NextResponse } from "next/server";
import type { ApiResponse, PaginatedData } from "@/types/response.type";

export function successResponse<T>(
  message: string,
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(
  message: string,
  status: number = 500
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
    },
    { status }
  );
}

export function paginatedResponse<T>(
  message: string,
  items: T[],
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  },
  status: number = 200
): NextResponse<ApiResponse<PaginatedData<T>>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data: {
        items,
        meta,
      },
    },
    { status }
  );
}
