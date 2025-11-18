"use client";

import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const pathname = usePathname();

  const hideHeader = pathname.startsWith("/applicant/apply/");
  return (
    <div className="h-screen">
      {!hideHeader ? (
        <>
          <Header />
          <main className="pt-24 pb-8">{children}</main>
        </>
      ) : (
        children
      )}
    </div>
  );
}
