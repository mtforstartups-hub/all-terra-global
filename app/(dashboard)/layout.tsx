import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/SideBar";
import type { Metadata } from "next";
import "@/components/dashboard/Dashboard.css";

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
    <div className="dashboard-layout fade-in">
      <Sidebar />

      <main className="main-content">
        <DashboardHeader />

        <div className="content-scroll">{children}</div>
      </main>
    </div>
  );
}
