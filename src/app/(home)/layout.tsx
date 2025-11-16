import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen">
      <Header />
      <main className="px-4 pt-24 md:px-10 lg:px-20">{children}</main>
    </div>
  );
}
