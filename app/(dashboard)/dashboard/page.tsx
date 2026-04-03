import UserDetails from "@/components/dashboard/UserDetails";
import { requireUser } from "@/lib/session";

export default async function Dashboard() {
  const user = await requireUser();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold mb-2">Dashboard Overview</h1>
        <p className="text-slate-500 text-[15px]">
          Welcome back, {user?.name?.split(" ")[0] || "Investor"}. Here is
          what's happening with your account.
        </p>
      </div>
      <UserDetails user={user} />
    </>
  );
}
