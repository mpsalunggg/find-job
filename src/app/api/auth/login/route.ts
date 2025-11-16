import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/bcrypt";
import { successResponse, errorResponse } from "@/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse("Email dan password wajib diisi", 400);
    }

    if (password.length < 6) {
      return errorResponse("Password minimal harus 6 karakter", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return errorResponse("Email tidak valid", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return errorResponse("Password tidak valid", 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    const response = successResponse(
      "Login successful",
      {
        id: user.id,
        email: user.email,
        roles: user.roles.map((ur) => ur.role.name),
      },
      200
    );

    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return errorResponse("Internal server error", 500);
  }
}
