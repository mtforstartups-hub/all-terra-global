"use client";

import Link from "next/link";
import { Menu, User } from "lucide-react";
import { useSidebarToggle } from "@/stores/SidebarStore";

export default function DashboardHeader({ username }: { username: string }) {
  const { openSidebar } = useSidebarToggle();
  return (
    <header className="flex flex-row justify-between items-start md:items-center px-5 py-4 md:px-10 md:py-6 gap-4 md:gap-0 h-auto md:h-20">
      <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
        <button
          className="flex items-center justify-center bg-white/90 border border-black/5 text-secondary cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-black/5"
          onClick={openSidebar}
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 py-1 pl-1 pr-4 bg-white/90 border border-black/5 rounded-full transition-all duration-300 hover:border-accent/30 hover:shadow-md group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-accent to-[#ffcf70] text-[#8b5a00] shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
            <User size={16} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col items-start justify-center pr-1">
            <span className="text-[13px] font-bold text-secondary leading-none">
              {username}
            </span>
            <span className="text-[11px] text-slate-500 font-medium leading-none mt-1">
              Premium
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
