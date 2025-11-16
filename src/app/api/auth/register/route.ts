import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { hashPassword } from "@/lib/bcrypt";
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("Pengguna dengan email ini sudah terdaftar", 400);
    }

    const hashedPassword = await hashPassword(password);

    const applicantRole = await prisma.role.findUnique({
      where: { name: "Applicant" },
    });

    if (!applicantRole) {
      return errorResponse(
        "Role Applicant tidak ditemukan. Silakan jalankan seed database.",
        500
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: {
          create: {
            roleId: applicantRole.id,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    const response = successResponse(
      "Registrasi berhasil",
      {
        id: user.id,
        email: user.email,
        roles: user.roles.map((ur) => ur.role.name),
      },
      201
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
    return errorResponse("Terjadi kesalahan pada server", 500);
  }
}
