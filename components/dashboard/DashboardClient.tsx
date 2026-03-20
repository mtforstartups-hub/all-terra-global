"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Tag,
  LogOut,
  Search,
  Bell,
  Pencil,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "overview" | "profile" | "investments" | "livedeals" | "editProfile";

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  userInitials: string;
  userId: string;
}

// ── Profile Card ──────────────────────────────────────────────────────────────
function UserProfileCard({
  userName,
  userEmail,
  userInitials,
  onEdit,
}: {
  userName: string;
  userEmail: string;
  userInitials: string;
  onEdit: () => void;
}) {
  const joinedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl shadow-sm p-6 flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#F8AB1D] to-[#ffcf70] flex items-center justify-center text-2xl font-bold text-[#8b5a00] shadow-lg shadow-[#F8AB1D]/30 shrink-0">
          {userInitials}
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-[#333333] truncate">{userName}</h2>
          <p className="text-[#64748b] text-sm mt-0.5 mb-3">Investor</p>
          <div className="flex gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 size={11} /> Verified
            </span>
          </div>
        </div>

        {/* Edit button */}
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gray-100/80 hover:bg-gray-200/80 text-[#333333] transition-colors duration-200 shrink-0"
        >
          <Pencil size={15} />
          Edit Profile
        </button>
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Email", value: userEmail },
          { label: "Joined", value: joinedDate },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              {label}
            </span>
            <span className="text-base font-medium text-[#333333] break-all">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Edit Profile Form ─────────────────────────────────────────────────────────
function EditProfileForm({
  userName,
  userEmail,
  onCancel,
}: {
  userName: string;
  userEmail: string;
  onCancel: () => void;
}) {
  const nameParts = userName.split(" ");
  const [formData, setFormData] = useState({
    firstName: nameParts[0] ?? "",
    lastName: nameParts.slice(1).join(" ") ?? "",
    email: userEmail,
    phone: "",
    location: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Frontend-only for now — backend form handling to be wired later
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API route
    onCancel();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-[#333333] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:border-[#F8AB1D] focus:ring-2 focus:ring-[#F8AB1D]/20 transition-all duration-200";

  return (
    <div className="bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl shadow-sm p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
        <button
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-gray-100 text-[#64748b] hover:text-[#333333] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Edit Profile</h2>
          <p className="text-sm text-[#64748b] mt-0.5">
            Update your personal information and contact details.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Phone + Location row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className={inputClass}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us a bit about yourself..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-[#64748b] hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#F8AB1D] text-white hover:bg-[#e09915] transition-colors duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Live Deals ────────────────────────────────────────────────────────────────
function LiveDealsSection() {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center gap-3 min-h-[220px] text-center">
      <Tag size={32} className="text-[#64748b]" />
      <h2 className="text-xl font-semibold text-[#333333]">Currently no live deals</h2>
      <p className="text-sm text-[#64748b]">Check back later for new investment opportunities.</p>
    </div>
  );
}

// ── Investments ───────────────────────────────────────────────────────────────
function InvestmentsSection() {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-black/5 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center gap-3 min-h-[220px] text-center">
      <Briefcase size={32} className="text-[#64748b]" />
      <h2 className="text-xl font-semibold text-[#333333]">No investments yet</h2>
      <p className="text-sm text-[#64748b]">Your investment portfolio will appear here.</p>
    </div>
  );
}

// ── Main Dashboard Client ─────────────────────────────────────────────────────
export default function DashboardClient({
  userName,
  userEmail,
  userInitials,
  userId,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navItems: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "profile", label: "My Profile", icon: <User size={20} /> },
    { id: "investments", label: "My Investments", icon: <Briefcase size={20} /> },
    { id: "livedeals", label: "Live Deals", icon: <Tag size={20} /> },
  ];

  const pageTitle: Record<Tab, string> = {
    overview: "Dashboard Overview",
    profile: "My Profile",
    investments: "Investment Portfolio",
    livedeals: "Live Deals",
    editProfile: "Edit Profile",
  };

  const pageSubtitle: Record<Tab, string> = {
    overview: `Welcome back, ${userName.split(" ")[0]}. Here\u2019s what\u2019s happening with your account.`,
    profile: "View and manage your account details.",
    investments: "Track your current and past investments.",
    livedeals: "Browse active investment opportunities.",
    editProfile: "Update your personal information.",
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden text-[#333333] font-sans"
      style={{
        background:
          "radial-gradient(circle at 15% 50%, rgba(28,82,68,0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(248,171,29,0.05), transparent 25%), #f8fafc",
      }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-[280px] shrink-0 m-4 rounded-3xl bg-white/90 backdrop-blur-md border border-black/5 shadow-sm z-10">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c5244] to-[#2a7a65] flex items-center justify-center text-white font-bold text-xl shrink-0">
            A
          </div>
          <h2 className="text-[18px] font-semibold tracking-tight text-[#333333]">
            All Terra Global
          </h2>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 flex-1 px-4">
          {navItems.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-[15px] font-medium text-left transition-all duration-200
                ${
                  activeTab === id || (id === "profile" && activeTab === "editProfile")
                    ? "bg-[#F8AB1D] text-white border-l-[3px] border-[#F8AB1D]"
                    : "text-[#64748b] hover:bg-[#f8ab1d]/10 hover:text-[#333333]"
                }`}
            >
              <span className="flex items-center justify-center">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto px-4 py-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-[15px] font-medium text-[#ef4444] text-left transition-all duration-200 hover:bg-red-50"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-10 py-6 h-20 shrink-0">
          {/* Search */}
          <div className="flex items-center gap-3 bg-white/90 border border-black/5 rounded-full px-4 py-2.5 w-[350px] focus-within:border-[#2a7a65] focus-within:shadow-[0_0_0_2px_rgba(42,122,101,0.2)] transition-all duration-200">
            <Search size={18} className="text-[#64748b] shrink-0" />
            <input
              type="text"
              placeholder="Search investments, transactions..."
              className="bg-transparent border-none outline-none text-[#333333] text-sm w-full placeholder:text-[#64748b]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* Bell */}
            <button className="relative bg-white/90 border border-black/5 w-10 h-10 rounded-full flex items-center justify-center text-[#64748b] hover:bg-black/5 hover:text-[#333333] transition-colors duration-200">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ef4444] border-2 border-[#f8fafc]" />
            </button>

            {/* User pill */}
            <button
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-white/90 border border-black/5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#F8AB1D] flex items-center justify-center text-xs font-bold text-[#8b5a00]">
                {userInitials}
              </div>
              <span className="text-[#333333] text-sm font-medium">
                {userName.split(" ")[0]}
              </span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-500/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500/40">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-[#333333] mb-2">
              {pageTitle[activeTab]}
            </h1>
            <p className="text-[#64748b] text-[15px]">{pageSubtitle[activeTab]}</p>
          </div>

          {/* Content — fade-in restarts on tab change via key */}
          <div key={activeTab} className="flex flex-col gap-6 animate-fade-in-up">
            {(activeTab === "overview" || activeTab === "profile") && (
              <UserProfileCard
                userName={userName}
                userEmail={userEmail}
                userInitials={userInitials}
                onEdit={() => setActiveTab("editProfile")}
              />
            )}

            {activeTab === "editProfile" && (
              <EditProfileForm
                userName={userName}
                userEmail={userEmail}
                onCancel={() => setActiveTab("profile")}
              />
            )}

            {activeTab === "investments" && <InvestmentsSection />}
            {activeTab === "livedeals" && <LiveDealsSection />}
          </div>
        </div>
      </main>
    </div>
  );
}
