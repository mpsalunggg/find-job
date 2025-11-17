import Header from "@/components/layout/Header";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="h-screen">
      <Header />
      <main className="pt-24 pb-8">{children}</main>
    </div>
  );
}
