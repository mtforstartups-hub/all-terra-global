// app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NdaModal from "@/components/dashboard/SignNdaButton";
import PageHero from "@/components/shared/PageHero";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = session.user;
  const hasSignedNda = user.hasSignedNda;

  return (
    <div className=" ">
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
      <PageHero
        label="Dashboard"
        title={`Welcome back, ${user.name?.split(" ")[0] ?? "Investor"}`}
        description="Here's your investment overview for today."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern architecture"
      />
    </div>
  );
}
