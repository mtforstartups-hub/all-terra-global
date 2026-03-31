"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Briefcase, Tag, LogOut, X } from "lucide-react";
import { useSidebarToggle } from "@/stores/SidebarStore";

export const dashboardMenu = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "My Investments", href: "/dashboard/investments", icon: Briefcase },
  { name: "Live Deals", href: "/dashboard/deals", icon: Tag },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarToggle();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-999 opacity-0 pointer-events-none transition-opacity duration-300 ease backdrop-blur-[2px] ${
          isSidebarOpen ? "opacity-100 pointer-events-auto!" : ""
        }`}
        onClick={closeSidebar}
      ></div>
      <aside
        className={`flex flex-col p-6 rounded-[24px] z-1000 fixed top-0 bottom-0 transition-all duration-300 ease-in-out w-[250px] m-[10px] h-[calc(100vh-20px)] -left-[280px] md:w-[280px] md:m-4 md:h-[calc(100vh-32px)] md:-left-[320px] bg-white/90 backdrop-blur-md border border-black/5 shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] ${
          isSidebarOpen ? "left-0!" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-[#2a7a65] rounded-[10px] flex items-center justify-center font-bold text-xl text-white">
              <Image
                src="/logo-white.png"
                alt="Allteraglobal Logo"
                width={30}
                height={30}
              />
            </div>
            <h2 className="text-sm md:text-base font-semibold tracking-[-0.5px]">
              All Terra Global
            </h2>
          </div>
          <button
            className="flex items-center justify-center bg-transparent border-none text-slate-500 cursor-pointer p-2 rounded-lg hover:bg-black/5 transition-colors"
            onClick={closeSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {dashboardMenu.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-[14px] rounded-xl text-[15px] font-medium cursor-pointer transition-all duration-300 text-left border-l-[3px] ${
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "border-transparent bg-transparent text-slate-500 hover:bg-accent-dark hover:text-secondary"
                }`}
                onClick={closeSidebar}
              >
                <span className="flex items-center justify-center">
                  <Icon size={20} />
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button className="flex w-full items-center gap-3 px-4 py-[14px] rounded-xl border-none bg-transparent text-red-500 text-[15px] font-medium cursor-pointer transition-all duration-300 text-left hover:bg-red-500/10">
            <span className="flex items-center justify-center">
              <LogOut size={20} />
            </span>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
