import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-bold mb-2">Dashboard Overview</h1>
        <p className="text-slate-500 text-[15px]">
          Welcome back, John. Here is what's happening with your account.
        </p>
      </div>
      <div className="animate-fade-in">
        <section className="flex flex-col gap-6 mb-8 animate-fade-in">
          <div className="flex flex-col gap-6 p-6 bg-white/90 backdrop-blur-md border border-black/5 shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl">
            <div className="relative flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-black/10">
              <div className="relative flex items-center justify-center w-20 h-20 bg-linear-to-br from-accent to-[#ffcf70] rounded-full text-[28px] font-bold text-[#8b5a00] shadow-[0_8px_16px_rgba(248,171,29,0.3)] shrink-0">
                <span>JD</span>
                <div className="absolute bottom-0.5 right-0.5 w-[18px] h-[18px] bg-emerald-500 border-[3px] border-white/90 rounded-full transition-colors duration-300"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-1">John Doe</h2>
                <p className="text-slate-500 text-[15px] mb-3">
                  Premium Investor
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500">
                    ✓ Verified
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/15 text-accent">
                    PRO
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/profile/edit"
                className="md:ml-auto bg-slate-500/10 border border-black/5 text-secondary px-5 py-2.5 rounded-lg font-medium transition-colors duration-300 hover:bg-slate-500/20 whitespace-nowrap"
              >
                Edit Profile
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[13px] uppercase tracking-[0.5px]">
                  Email
                </span>
                <span className="text-base font-medium">
                  john.doe@allteraglobal.com
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[13px] uppercase tracking-[0.5px]">
                  Phone
                </span>
                <span className="text-base font-medium">000000000</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[13px] uppercase tracking-[0.5px]">
                  Location
                </span>
                <span className="text-base font-medium">New York, USA</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[13px] uppercase tracking-[0.5px]">
                  Joined
                </span>
                <span className="text-base font-medium">March 2023</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
