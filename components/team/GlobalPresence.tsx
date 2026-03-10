const offices = [
    { location: "Dubai, UAE", role: "HQ & Investor Relations", icon: "🏛️" },
    { location: "Harare, Zimbabwe", role: "Operations Hub", icon: "⚡" },
    { location: "USA", role: "Director Office", icon: "🇺🇸" },
    { location: "India", role: "Tech & Analytics", icon: "💻" },
];

export default function GlobalPresence() {
    return (
        <section className="py-24 bg-[#333333]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                        Global Presence
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                        Where We Operate
                    </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {offices.map((office) => (
                        <div key={office.location} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                            <span className="text-4xl mb-4 block">{office.icon}</span>
                            <h3 className="font-bold text-white mb-2">{office.location}</h3>
                            <p className="text-white/70 text-sm">{office.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
