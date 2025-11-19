"use client";

import { toast } from "@/utils/toast";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (pathname === "/login" || hasRedirectedRef.current) {
      return;
    }

    if (!isAuthenticated || !user) {
      hasRedirectedRef.current = true;
      toast.error("User not authenticated");
      router.replace("/login");
      return;
    }

    const hasRequiredRole = allowedRoles.some((role) =>
      user.roles.includes(role)
    );

    if (!hasRequiredRole && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      toast.error("Sorry you dont have access to this menu");
      router.push(redirectTo);
    }
  }, [
    user,
    isLoading,
    isAuthenticated,
    allowedRoles,
    redirectTo,
    router,
    pathname,
  ]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Spinner className="text-primary-main size-12" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const hasRequiredRole = allowedRoles.some((role) =>
    user.roles.includes(role)
  );

  if (!hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
}
