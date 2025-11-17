import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["Admin"]} redirectTo="/">
      {children}
    </ProtectedRoute>
  );
}
