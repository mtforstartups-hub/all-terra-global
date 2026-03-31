"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { LayoutGrid, User, Briefcase, Tag } from "lucide-react";
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
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      ></div>
      <aside
        className={`sidebar glass border-card ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-header-mobile">
          <div className="sidebar-brand">
            <div className="brand-logo">
              <Image
                src="/logo-white.png"
                alt="Allteraglobal Logo"
                width={30}
                height={30}
              />
            </div>
            <h2>All Terra Global</h2>
          </div>
          <button className="mobile-close-btn" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {dashboardMenu.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={closeSidebar} // Close mobile sidebar on navigation
              >
                <span className="nav-icon">
                  <Icon size={20} />
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout">
            <span className="nav-icon">
              <LogOut size={20} />
            </span>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
