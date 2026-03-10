import Image from "next/image";
import Link from "next/link";

export default function RealEstateInvestmentPage() {
    const investmentDetails = {
        title: "Real Estate Financing",
        sector: "Residential Real Estate Development",
        location: "Harare, Zimbabwe",
        amount: "USD 5,000,000",
        tenure: "24 months (renewable)",
        returns: "20% p.a.",
        status: "Active",
        interestPayment: "Monthly",
        principalRepayment: "Monthly repayments",
        moratorium: "6 months on principal",
        collateral: "Title ownership on project land, personal development assets",
        insurance: "Credit insurance covering interest and principal",
        repaymentSource: "Sale of residential housing units",
        currency: "USD",
        instrument: "Senior Secured Loan",
    };

    const projectConfig = [
        { value: "98", label: "Standalone residential plots" },
        { value: "500 sqm", label: "Average plot size" },
        { value: "28", label: "Additional 3BHK flats" },
        { value: "9.52 ha", label: "Total land parcel" },
    ];

    const images = [
        {
            src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            alt: "Modern residential development",
        },
        {
            src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80",
            alt: "Housing complex",
        },
        {
            src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
            alt: "Residential homes",
        },
        {
            src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            alt: "Property development",
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
                        Large-scale residential development project in Harare, designed as a mixed
                        low-density housing cluster on a 9.52-hectare land parcel.
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
                            <div className="text-white/70 text-sm">Target Return</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.tenure}</div>
                            <div className="text-white/70 text-sm">Tenure</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#F8AB1D]">{investmentDetails.moratorium}</div>
                            <div className="text-white/70 text-sm">Moratorium</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Configuration */}
            <section className="py-12 bg-[#1C5244]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {projectConfig.map((item) => (
                            <div key={item.label} className="text-center">
                                <div className="text-4xl font-bold text-white">{item.value}</div>
                                <div className="text-white/70 text-sm">{item.label}</div>
                            </div>
                        ))}
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
                                        This large-scale residential development project is located in Harare, Zimbabwe.
                                        Designed as a mixed low-density housing cluster, it sits on a 9.52-hectare land
                                        parcel with clear subdivision and development plan.
                                    </p>
                                    <p>
                                        Demand is driven by urbanisation, population growth, and limited supply of formal
                                        housing. The project structure focuses on delivering completed units with clear
                                        execution timelines.
                                    </p>
                                </div>
                            </div>

                            {/* Project Configuration */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Project Configuration</h2>
                                <ul className="space-y-4">
                                    {[
                                        "98 standalone residential plots, each approximately 500 sqm",
                                        "Construction of 3BHK and 4-BHK houses on each plot",
                                        "Additional 28 × 3BHK flats developed on a separate portion",
                                        "Dedicated allocation for roads (21,000 sqm) and 15,000 sqm recreational zone",
                                        "Optional future scope for school development within the cluster",
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

                            {/* Operational Model */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Operational Model</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Construction executed in phases, beginning with demo units",
                                        "Houses sold on credit, with buyers paying over 12 equal instalments",
                                        "Sales commence approximately 5 months after project start",
                                        "Title deeds issued post-construction with interim contractual protections",
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

                            {/* Performance */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#333333] mb-6">Performance & Visibility</h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { title: "Timeline", desc: "24-month target completion" },
                                        { title: "Profit Cushion", desc: "Meaningful profit margin at development level" },
                                        { title: "Cashflows", desc: "Generated progressively from unit sales" },
                                        { title: "Protection", desc: "Insurance-backed interest and principal coverage" },
                                    ].map((item) => (
                                        <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                                            <h3 className="font-bold text-[#1C5244] mb-2">{item.title}</h3>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
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
                                        { label: "Target Investor Return", value: investmentDetails.returns },
                                        { label: "Interest Payment", value: investmentDetails.interestPayment },
                                        { label: "Moratorium", value: investmentDetails.moratorium },
                                        { label: "Currency", value: investmentDetails.currency },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between items-start py-3 border-b border-gray-200 last:border-0">
                                            <span className="text-gray-500 text-sm">{item.label}</span>
                                            <span className="text-[#333333] font-medium text-sm text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-[#1C5244]/10 rounded-xl">
                                    <h4 className="font-semibold text-[#1C5244] mb-2">Collateral & Insurance</h4>
                                    <p className="text-sm text-gray-600 mb-2">{investmentDetails.collateral}</p>
                                    <p className="text-sm text-[#1C5244] font-medium">{investmentDetails.insurance}</p>
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
                        <Link href="/opportunities/vendor-financing" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                            <div className="relative h-48">
                                <Image src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80" alt="Vendor Financing" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
