// app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NdaModal from "@/components/dashboard/NdaModal";
import {
    BarChart2,
    TrendingUp,
    FileText,
    Globe,
    Shield,
    Bell,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const user = session.user;
    const hasSignedNda = user.hasSignedNda;

    const initials = user.name
        ? user.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

    return (
        <main className="relative min-h-screen bg-[#F4F7F6] font-sans">
            {/* ── NDA Modal Overlay ──────────────────────────────────────────── */}
            {!hasSignedNda && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <NdaModal
                        userId={user.id}
                        userEmail={user.email}
                        userName={user.name}
                    />
                </div>
            )}

            {/* ── Layout ─────────────────────────────────────────────────────── */}
            <div
                className={`flex min-h-screen ${!hasSignedNda ? "blur-md pointer-events-none select-none" : ""}`}
            >
                {/* Sidebar */}
                <aside className="hidden md:flex flex-col w-64 bg-[#1C5244] text-white shrink-0">
                    {/* Logo */}
                    <div className="px-6 py-6 border-b border-white/10">
                        <p className="text-xs font-bold tracking-widest text-[#F8AB1D] uppercase">
                            All-Terra Global
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">Investor Portal</p>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {[
                            { icon: LayoutDashboard, label: "Dashboard", active: true },
                            { icon: TrendingUp, label: "Investments" },
                            { icon: BarChart2, label: "Analytics" },
                            { icon: FileText, label: "Documents" },
                            { icon: Globe, label: "Portfolio" },
                            { icon: Shield, label: "Compliance" },
                        ].map(({ icon: Icon, label, active }) => (
                            <button
                                key={label}
                                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active
                                        ? "bg-[#F8AB1D] text-[#1C5244]"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* User + Logout */}
                    <div className="px-4 py-5 border-t border-white/10 space-y-3">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-[#F8AB1D] text-[#1C5244] flex items-center justify-center text-xs font-bold shrink-0">
                                {initials}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-semibold text-white truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-white/50 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                            <LogOut size={15} />
                            Sign out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar */}
                    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
                        <div>
                            <h1 className="text-xl font-bold text-[#1C5244]">
                                Welcome back, {user.name?.split(" ")[0] ?? "Investor"} 👋
                            </h1>
                            <p className="text-sm text-gray-400">
                                Here&apos;s your investment overview for today.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-500">
                                <Bell size={18} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F8AB1D]" />
                            </button>
                            <div className="w-9 h-9 rounded-full bg-[#1C5244] text-white flex items-center justify-center text-sm font-bold">
                                {initials}
                            </div>
                        </div>
                    </header>

                    {/* Page Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "Portfolio Value",
                                    value: "$2,400,000",
                                    change: "+12.4%",
                                    up: true,
                                    icon: TrendingUp,
                                },
                                {
                                    label: "Active Investments",
                                    value: "7",
                                    change: "+2 this quarter",
                                    up: true,
                                    icon: BarChart2,
                                },
                                {
                                    label: "Documents Signed",
                                    value: "14",
                                    change: "All up to date",
                                    up: true,
                                    icon: FileText,
                                },
                                {
                                    label: "Global Reach",
                                    value: "12 Countries",
                                    change: "Across 4 regions",
                                    up: true,
                                    icon: Globe,
                                },
                            ].map(({ label, value, change, up, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            {label}
                                        </p>
                                        <div className="w-8 h-8 rounded-lg bg-[#1C5244]/10 flex items-center justify-center text-[#1C5244]">
                                            <Icon size={15} />
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-[#1C5244]">{value}</p>
                                    <p
                                        className={`text-xs mt-1 font-medium ${up ? "text-emerald-500" : "text-red-400"}`}
                                    >
                                        {change}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Two columns: Recent Activity + Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Recent Activity */}
                            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-base font-bold text-[#1C5244] mb-4">
                                    Recent Activity
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        {
                                            title: "NDA Signed",
                                            desc: "You signed the Non-Disclosure Agreement",
                                            time: "Just now",
                                            dot: "bg-[#F8AB1D]",
                                        },
                                        {
                                            title: "Portfolio Report Available",
                                            desc: "Q1 2026 report is ready to download",
                                            time: "2 days ago",
                                            dot: "bg-[#1C5244]",
                                        },
                                        {
                                            title: "New Investment Opportunity",
                                            desc: "AgriTech Expansion Round — view details",
                                            time: "5 days ago",
                                            dot: "bg-emerald-400",
                                        },
                                    ].map(({ title, desc, time, dot }) => (
                                        <div
                                            key={title}
                                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                                        >
                                            <div
                                                className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dot}`}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {title}
                                                </p>
                                                <p className="text-xs text-gray-400">{desc}</p>
                                            </div>
                                            <span className="text-xs text-gray-300 whitespace-nowrap">
                                                {time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#1C5244] rounded-2xl p-6 text-white shadow-sm">
                                <h2 className="text-base font-bold mb-4">Quick Actions</h2>
                                <div className="space-y-2">
                                    {[
                                        { label: "Download Q1 Report", icon: FileText },
                                        { label: "View Investments", icon: TrendingUp },
                                        { label: "Request Meeting", icon: Globe },
                                    ].map(({ label, icon: Icon }) => (
                                        <button
                                            key={label}
                                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-[#F8AB1D] hover:text-[#1C5244] transition-colors text-sm font-medium text-left group"
                                        >
                                            <Icon
                                                size={15}
                                                className="group-hover:text-[#1C5244] text-white/70"
                                            />
                                            {label}
                                        </button>
                                    ))}
                                </div>

                                {/* Accent Badge */}
                                <div className="mt-6 rounded-xl bg-[#F8AB1D]/20 border border-[#F8AB1D]/30 p-4">
                                    <p className="text-xs font-bold text-[#F8AB1D] uppercase tracking-wide mb-1">
                                        Compliance
                                    </p>
                                    <p className="text-sm text-white/80">
                                        All agreements up to date. No action required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
