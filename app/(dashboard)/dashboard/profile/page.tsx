import { requireUser } from "@/lib/session";
import UserDetails from "@/components/dashboard/UserDetails";

export default async function Profile() {
  const user = await requireUser();
  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold mb-2">Profile</h1>
        <p className="text-slate-500 text-[15px]">
          Welcome back, {user?.name}. Here is what's happening with your
          account.
        </p>
      </div>
      <UserDetails user={user} />
    </>
  );
}
