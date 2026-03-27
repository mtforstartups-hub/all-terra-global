// app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NdaModal from "@/components/dashboard/SignNdaButton";
import DashboardClient from "@/components/dashboard/DashboardClient";

// search params can be removed when using docusign or other service
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  // ── Auth temporarily commented out for UI preview ────────────────────
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/");
  }
  const user = session.user;
  const hasSignedNda = user.hasSignedNda;

  // Resolve search params (only needed for the inbuild pdf signing)
  const resolvedParams = await searchParams;
  const isVerifying = resolvedParams.event === "signing_complete";

  // Show the modal if they haven't signed, OR if they just returned from signing
  // const showModal = !hasSignedNda || isVerifying;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // ── Stub data for preview ─────────────────────────────────────────────
  // const user = {
  //   id: "preview",
  //   name: "John Doe",
  //   email: "johndoe@allterraglobal.com",
  //   hasSignedNda: false,
  // };
  // const hasSignedNda = user.hasSignedNda;
  // const initials = "JD";

  return (
    <div className="relative">
      {/* ── NDA Modal Overlay ──────────────────────────────────────────── */}
      {!hasSignedNda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <NdaModal
            userId={user.id}
            userEmail={user.email}
            userName={user.name}
            isVerifying={isVerifying}
            hasSignedNda={hasSignedNda}
          />
        </div>
      )}

      {/* ── Dashboard Layout ────────────────────────────────────────────── */}
      <div
        className={
          !hasSignedNda ? "blur-md pointer-events-none select-none" : ""
        }
      >
        <DashboardClient
          userName={user.name ?? "Investor"}
          userEmail={user.email ?? ""}
          userInitials={initials}
          userId={user.id}
        />
      </div>
    </div>
  );
}
