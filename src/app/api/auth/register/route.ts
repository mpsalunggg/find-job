import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { hashPassword } from "@/lib/bcrypt";
import { successResponse, errorResponse } from "@/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("A user with this email already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const applicantRole = await prisma.role.findUnique({
      where: { name: "Applicant" },
    });

    if (!applicantRole) {
      return errorResponse(
        "Applicant role not found. Please run the database seed.",
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
      "Registration successful",
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
    return errorResponse("Internal server error", 500);
  }
}
