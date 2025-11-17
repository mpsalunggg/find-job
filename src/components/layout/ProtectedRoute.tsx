"use client";

import { useMe } from "@/features/auth/auth.hook";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Spinner } from "../ui/spinner";

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
  const { data: user, isLoading, isError } = useMe();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !user?.data) {
      toast.error("User not authenticated");
      router.push("/login");
      return;
    }

    const hasRequiredRole = allowedRoles.some((role) =>
      user.data.roles.includes(role)
    );

    if (!hasRequiredRole) {
      toast.error("Sorry you dont have access to this menu");
      router.push(redirectTo);
    }
  }, [user, isLoading, isError, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Spinner className="text-primary-main size-12" />
      </div>
    );
  }

  if (isError || !user?.data) {
    return null;
  }

  const hasRequiredRole = allowedRoles.some((role) =>
    user.data.roles.includes(role)
  );

  if (!hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
}
