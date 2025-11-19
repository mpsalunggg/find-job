import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ReactNode } from "react";

interface ApplicantLayoutProps {
  children: ReactNode;
}

export default function ApplicantLayout({ children }: ApplicantLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["Applicant"]} redirectTo="/">
      {children}
    </ProtectedRoute>
  );
}
