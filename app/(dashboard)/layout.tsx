import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/SideBar";
import type { Metadata } from "next";

import NdaProtector from "@/components/dashboard/NdaProtector";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard | All Terra Global",
  description: "Investor Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();
  return (
    <NdaProtector user={user}>
      <div className="flex min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-all duration-300">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader username={user?.name || ""} />
          <div className="flex-1 px-10 pb-10 overflow-y-auto">{children}</div>
        </main>
      </div>
    </NdaProtector>
  );
}
