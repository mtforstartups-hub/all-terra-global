import { requireUser } from "@/lib/session";

export default async function LiveDeals() {
  const user = await requireUser();
  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold mb-2">Livedeals</h1>
        <p className="text-slate-500 text-[15px]">
          Welcome back, {user?.name}. Here is what's happening with your
          account.
        </p>
      </div>
      <div>
        <h2>Currently no live deals</h2>
      </div>
    </>
  );
}
