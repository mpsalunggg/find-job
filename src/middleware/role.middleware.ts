import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/public",
];

const ADMIN_ROUTE_PREFIX = "/api/admin";
const APPLICANT_ROUTE_PREFIX = "/api/applicant";

export async function roleMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Tidak memiliki izin akses" },
      { status: 401 }
    );
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return NextResponse.json(
      { success: false, message: "Token invalid" },
      { status: 401 }
    );
  }

  if (!decoded || !decoded.userId) {
    return NextResponse.json(
      { success: false, message: "Token invalid" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  if (pathname.startsWith(ADMIN_ROUTE_PREFIX)) {
    const hasAdminRole = user.roles.some((ur) => ur.role.name === "Admin");

    if (!hasAdminRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden - Admin role required",
        },
        { status: 403 }
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (pathname.startsWith(APPLICANT_ROUTE_PREFIX)) {
    const hasApplicantRole = user.roles.some(
      (ur) => ur.role.name === "Applicant"
    );

    if (!hasApplicantRole) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden - Applicant role required",
        },
        { status: 403 }
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const requestHeaders = new Headers(request.headers);
  console.log("user idd: ", decoded.userId);
  requestHeaders.set("x-user-id", decoded.userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
