import { NextResponse } from "next/server";
import type { ApiResponse, PaginatedData } from "@/types/response.type";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const successResponse = <T>(
  message: string,
  data: T,
  status: number = 200,
  additional?: Record<string, any> | null
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      ...(additional ? { additional } : {}),
    },
    { status }
  );
};

export const errorResponse = (
  message: string,
  status: number = 500,
  additional?: Record<string, any> | null
): NextResponse<ApiResponse<null>> => {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
      ...(additional ? { additional } : {}),
    },
    { status }
  );
};

export const paginatedResponse = <T>(
  message: string,
  items: T[],
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  },
  status: number = 200,
  additional?: Record<string, any> | null
): NextResponse<ApiResponse<PaginatedData<T>>> => {
  return NextResponse.json(
    {
      success: true,
      message,
      data: {
        items,
        meta,
        ...(additional ? { additional } : {}),
      },
    },
    { status }
  );
};
