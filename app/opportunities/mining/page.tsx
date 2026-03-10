import Image from "next/image";
import Link from "next/link";

export default function MiningInvestmentPage() {
    const investmentDetails = {
        title: "Mining Investment",
        sector: "Copper Mining",
        location: "Zimbabwe",
        amount: "USD 4,000,000",
        tenure: "36 months",
        returns: "13% p.a.",
        status: "Active",
        interestPayment: "Monthly",
        principalRepayment: "Monthly repayments",
        collateral: "First charge over processing plant, equipment, and cashflows",
        repaymentSource: "Operating cashflows",
        currency: "USD",
        instrument: "Senior Secured Loan",
    };

    const highlights = [
        {
            icon: "⛏️",
            title: "Proven Reserves",
            description: "~1 million tons of dump material with established grade assumptions",
        },
        {
            icon: "🏭",
            title: "Processing Capacity",
            description: "1,000-1,500 TPD Carbon-in-Pulp (CIP) processing plant",
        },
        {
            icon: "💰",
            title: "Revenue Model",
            description: "Revenues generated in USD-linked Copper sales at international prices",
        },
        {
            icon: "📊",
            title: "Production Rate",
            description: "0.7g of Copper output per tonne of processing",
        },
    ];

    const images = [
        {
            src: "https://images.unsplash.com/photo-1580544859986-05322c53b1d4?auto=format&fit=crop&w=1200&q=80",
            alt: "Mining operations overview",
        },
        {
            src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
            alt: "Mining equipment",
        },
        {
            src: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
            alt: "Copper processing",
        },
        {
            src: "https://images.unsplash.com/photo-1586161148512-64a1b3dac527?auto=format&fit=crop&w=800&q=80",
            alt: "Mining site Tunnel",
        },
    ];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={images[0].src}
                        alt={images[0].alt}
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1C5244]/95 to-[#333333]/90" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/opportunities" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Opportunities
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-2 bg-[#F8AB1D] text-[#333333] rounded-full text-sm font-bold">
                            {investmentDetails.status}
                        </span>
                        <span className="text-white/80">{investmentDetails.sector}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/80">{investmentDetails.location}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        {investmentDetails.title}
                    </h1>

                    <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                        Operating Copper mining concession in Mazowe, Zimbabwe with focus on dump ore
                        and near-surface material. Existing underground operations integrated via toll processing.
                    </p>
                </div>
            </section>

            {/* Key Metrics Bar */}
            <section className="py-8 bg-[#333333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.amount}</div>
                            <div className="text-white/70 text-sm">Investment Amount</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.returns}</div>
                            <div className="text-white/70 text-sm">Interest Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.tenure}</div>
                            <div className="text-white/70 text-sm">Tenure</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.interestPayment}</div>
                            <div className="text-white/70 text-sm">Interest Payment</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`relative rounded-2xl overflow-hidden ${index === 0 ? "col-span-2 row-span-2 h-80 lg:h-[400px]" : "h-40 lg:h-48"
                                    }`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Opportunity Overview */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Opportunity Overview</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>
                                        This investment opportunity involves an operating Copper mining concession in Mazowe, Zimbabwe.
                                        The focus is on dump ore and near-surface material with an estimated ~1 million tons of
                                        dump material with established grade assumptions.
                                    </p>
                                    <p>
                                        Existing underground operations are integrated via toll processing, providing additional
                                        revenue streams and operational efficiency.
                                    </p>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Investment Highlights</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {highlights.map((highlight) => (
                                        <div key={highlight.title} className="bg-gray-50 rounded-2xl p-6">
                                            <span className="text-3xl mb-4 block">{highlight.icon}</span>
                                            <h3 className="font-bold text-[#333333] mb-2">{highlight.title}</h3>
                                            <p className="text-gray-600 text-sm">{highlight.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Capital Deployment */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Capital Deployment</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Development and commissioning of a 1,000–1,500 TPD Carbon-in-Pulp (CIP) processing plant",
                                        "Procurement of mining and earthmoving equipment",
                                        "Laboratory setup and initial working capital",
                                        "Capital deployed in phased tranches aligned with milestones",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-[#1C5244] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Performance & Visibility */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Performance & Visibility</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Guaranteed minimum production threshold over initial operating period",
                                        "Rights over mining output from existing underground shafts provide additional downside cover",
                                        "Revenues benchmarked to transparent international Copper prices",
                                        "Independent oversight, verification, and cashflow controls embedded in structure",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-[#1C5244] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar - Investment Terms */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-gray-50 rounded-3xl p-8">
                                <h3 className="text-xl font-bold text-[#333333] mb-6">Investment Terms</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Investment Instrument", value: investmentDetails.instrument },
                                        { label: "Sector", value: investmentDetails.sector },
                                        { label: "Jurisdiction", value: "Zimbabwe" },
                                        { label: "Investment Amount", value: investmentDetails.amount },
                                        { label: "Tenure", value: investmentDetails.tenure },
                                        { label: "Interest Rate", value: investmentDetails.returns },
                                        { label: "Interest Payment", value: investmentDetails.interestPayment },
                                        { label: "Principal Repayment", value: investmentDetails.principalRepayment },
                                        { label: "Currency", value: investmentDetails.currency },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between items-start py-3 border-b border-gray-200 last:border-0">
                                            <span className="text-gray-500 text-sm">{item.label}</span>
                                            <span className="text-[#333333] font-medium text-sm text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Collateral Info */}
                                <div className="mt-6 p-4 bg-[#1C5244]/10 rounded-xl">
                                    <h4 className="font-semibold text-[#1C5244] mb-2">Collateral</h4>
                                    <p className="text-sm text-gray-600">{investmentDetails.collateral}</p>
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/contact"
                                    className="mt-8 w-full flex items-center justify-center gap-2 bg-[#F8AB1D] text-[#333333] px-6 py-4 rounded-xl font-bold hover:bg-[#d99310] transition-all"
                                >
                                    Express Interest
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Opportunities */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-[#333333] mb-8">Other Opportunities</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href="/opportunities/real-estate" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                            <div className="relative h-48">
                                <Image
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                                    alt="Real Estate"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#333333] mb-2">Real Estate Financing</h3>
                                <p className="text-gray-600 text-sm mb-4">$5M USD | 24 months | 20% p.a.</p>
                                <span className="text-[#1C5244] font-medium text-sm">View details →</span>
                            </div>
                        </Link>
                        <Link href="/opportunities/vendor-financing" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                            <div className="relative h-48">
                                <Image
                                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80"
                                    alt="Vendor Financing"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#333333] mb-2">Vendor Financing</h3>
                                <p className="text-gray-600 text-sm mb-4">$2M USD | 36 months | 15% p.a.</p>
                                <span className="text-[#1C5244] font-medium text-sm">View details →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
