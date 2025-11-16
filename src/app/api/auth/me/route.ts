import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      return errorResponse("User not found", 404);
    }

    return successResponse(
      "Success get user data",
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
    return errorResponse("Failed to get user data", 500);
  }
}
