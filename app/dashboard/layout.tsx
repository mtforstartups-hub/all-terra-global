// app/dashboard/layout.tsx
// This layout intentionally omits the global Header, Footer and ScrollToTop
// so the dashboard can render as a full-screen, self-contained app shell.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | All Terra Global",
  description: "Investor Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
