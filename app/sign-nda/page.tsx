import PDFViewerClient from "@/components/pdfsigning/PDFViewerClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignNDA() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if no session exists
  if (!session) {
    // Optional: Pass the current path as a return URL
    // redirect("/login?callbackURL=/sign-nda");
    redirect("/");
  }
  return <PDFViewerClient userEmail={session.user.email} />;
}
