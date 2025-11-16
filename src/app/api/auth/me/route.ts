import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return errorResponse("Tidak memiliki izin akses", 401);
    }

    const payload = verifyToken(token);

    if (!payload) {
      return errorResponse("Token tidak valid", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        candidate: true,
      },
    });

    if (!user) {
      return errorResponse("Pengguna tidak ditemukan", 404);
    }

    return successResponse(
      "Berhasil mengambil data pengguna",
      {
        id: user.id,
        email: user.email,
        roles: user.roles.map((ur) => ur.role.name),
        candidate: user.candidate,
        createdAt: user.createdAt,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Terjadi kesalahan pada server", 500);
  }
}
