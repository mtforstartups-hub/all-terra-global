import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | All Terra Global",
  description: "Investor Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-all duration-300">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 px-10 pb-10 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
