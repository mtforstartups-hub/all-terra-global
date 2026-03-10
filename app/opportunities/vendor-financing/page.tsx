import Image from "next/image";
import Link from "next/link";

export default function VendorFinancingPage() {
    const investmentDetails = {
        title: "Vendor Financing",
        sector: "Vendor / SME Order Financing",
        location: "Zimbabwe",
        amount: "USD 2,000,000",
        tenure: "3 years (renewable)",
        returns: "15% p.a.",
        status: "Active",
        interestPayment: "Monthly",
        principalRepayment: "Bullet repayment after 3 years",
        collateral: "Nil",
        insurance: "Credit insurance covering interest and principal",
        capitalDeployment: "Tranche-based disbursement",
        regulatoryProtection: "RBZ-registered debt allowing USD repatriation",
        repaymentSource: "Operating cashflows from vendor and SME activities",
        currency: "USD",
        instrument: "Senior Secured Loan",
    };

    const images = [
        {
            src: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
            alt: "Business operations",
        },
        {
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
            alt: "Financial services",
        },
        {
            src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
            alt: "Business meeting",
        },
        {
            src: "https://images.unsplash.com/photo-1551135049-8a33b5883817?auto=format&fit=crop&w=800&q=80",
            alt: "Trade finance",
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
                        Structured vendor and SME order financing within the value chain of one of
                        Zimbabwe&apos;s largest diversified business groups.
                    </p>
                </div>
            </section>

            {/* Key Metrics */}
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
                            <div className="text-3xl font-bold text-[#F8AB1D]">RBZ Registered</div>
                            <div className="text-white/70 text-sm">Regulatory Status</div>
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

            {/* Content */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Opportunity Overview</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>
                                        This investment provides structured vendor and SME order financing within the
                                        value chain of one of Zimbabwe&apos;s largest diversified business groups.
                                        The financing is routed through a regulated, well-governed microfinance institution.
                                    </p>
                                    <p>
                                        It supports essential day-to-day operations, not speculative expansion, providing
                                        stable and predictable cash flow generation.
                                    </p>
                                </div>
                            </div>

                            {/* Operational Model */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Operational Model</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Cashflows generated from ongoing supply and distribution activities",
                                        "Interest serviced regularly from operating cashflows",
                                        "Principal repaid as a bullet at maturity",
                                        "USD working capital financing for vendor and SME operations",
                                        "Disbursed in defined tranches aligned with utilisation",
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

                            {/* Risk Mitigation */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Risk Mitigation & Visibility</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { icon: "🏢", title: "Corporate Ecosystem", desc: "Exposure to systemically important corporate ecosystem" },
                                        { icon: "📋", title: "Strong Documentation", desc: "Strong legal documentation and personal guarantees" },
                                        { icon: "🛡️", title: "Insurance Coverage", desc: "Insurance against repayment of interest and principal" },
                                        { icon: "🏛️", title: "Regulatory Oversight", desc: "Regulatory and institutional oversight embedded" },
                                    ].map((item) => (
                                        <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                                            <span className="text-3xl mb-4 block">{item.icon}</span>
                                            <h3 className="font-bold text-[#1C5244] mb-2">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Advantages */}
                            <div className="bg-[#1C5244] rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Key Advantages</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "RBZ-registered debt enabling USD repatriation",
                                        "Routed through regulated microfinance institution",
                                        "Supports essential operations, not speculation",
                                        "Tranche-based deployment aligned with utilisation",
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-[#F8AB1D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-white/90 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
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

                                <div className="mt-6 p-4 bg-[#F8AB1D]/10 rounded-xl">
                                    <h4 className="font-semibold text-[#333333] mb-2">Regulatory Protection</h4>
                                    <p className="text-sm text-gray-600">{investmentDetails.regulatoryProtection}</p>
                                </div>

                                <div className="mt-4 p-4 bg-[#1C5244]/10 rounded-xl">
                                    <h4 className="font-semibold text-[#1C5244] mb-2">Insurance</h4>
                                    <p className="text-sm text-gray-600">{investmentDetails.insurance}</p>
                                </div>

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
                        <Link href="/opportunities/mining" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                            <div className="relative h-48">
                                <Image src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80" alt="Mining" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#333333] mb-2">Mining Investment</h3>
                                <p className="text-gray-600 text-sm mb-4">$4M USD | 36 months | 13% p.a.</p>
                                <span className="text-[#1C5244] font-medium text-sm">View details →</span>
                            </div>
                        </Link>
                        <Link href="/opportunities/real-estate" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                            <div className="relative h-48">
                                <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Real Estate" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#333333] mb-2">Real Estate Financing</h3>
                                <p className="text-gray-600 text-sm mb-4">$5M USD | 24 months | 20% p.a.</p>
                                <span className="text-[#1C5244] font-medium text-sm">View details →</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
