import { NextRequest } from "next/server";
import { roleMiddleware } from "./middleware/role.middleware";

export async function proxy(request: NextRequest) {
  return roleMiddleware(request);
}

export const config = {
  matcher: ["/api/:path*"],
};
