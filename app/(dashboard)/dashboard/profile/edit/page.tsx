import EditProfile from "@/components/dashboard/EditProfile";
import { requireUser } from "@/lib/session";

export default async function page() {
  const user = await requireUser();
  return <EditProfile user={user} />;
}
