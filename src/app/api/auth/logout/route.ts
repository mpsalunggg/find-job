import { successResponse, errorResponse } from "@/utils/response";

export async function POST() {
  try {
    const response = successResponse("Logout Success", null, 200);

    response.cookies.set({
      name: "auth-token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return errorResponse("Internal server error", 500);
  }
}
