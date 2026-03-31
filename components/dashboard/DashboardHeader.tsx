"use client";

import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
import { useSidebarToggle } from "@/stores/SidebarStore";

export default function DashboardHeader() {
  const { openSidebar } = useSidebarToggle();
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle-btn" onClick={openSidebar}>
          <Menu size={24} />
        </button>
        <div className="search-bar">
          <span className="search-icon">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search investments, transactions..."
          />
        </div>
      </div>
      <div className="topbar-actions">
        <button className="action-btn notifications">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        <Link href="/dashboard/profile" className="user-menu">
          <div className="user-avatar-small"></div>
          <span className="user-name-small">John Doe</span>
        </Link>
      </div>
    </header>
  );
}
