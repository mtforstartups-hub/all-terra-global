// app/dashboard/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // Adjust path to your better-auth config
import NdaModal from "@/components/dashboard/NdaModal";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/"); // Or wherever your login page is
  }

  const user = session.user;
  const hasSignedNda = user.hasSignedNda;

  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* If NDA is NOT signed, show the modal over the screen
       */}
      {!hasSignedNda && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <NdaModal
            userId={user.id}
            userEmail={user.email}
            userName={user.name}
          />
        </div>
      )}

      {/* The Dashboard Content.
        We add a blur and pointer-events-none if the NDA isn't signed.
      */}
      <div
        className={`p-8 ${!hasSignedNda ? "blur-md pointer-events-none select-none" : ""}`}
      >
        <h1 className="text-3xl font-bold">Exclusive Dashboard</h1>
        <p>
          Welcome, {user.name}. Here are the sensitive investment details...
        </p>
        {/* Your sensitive dashboard widgets go here */}
      </div>
    </main>
  );
}
