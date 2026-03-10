
"use client"
import { CarouselCard } from "../CarouselCard";

// --- Types ---
interface MineralData {
    name: string;
    description: string;
}

interface EconomicPoint {
    title: string;
    numericValue: number;
    suffix: string;
    description: string;
}

// --- Data ---
const mineralData: MineralData[] = [
    { name: "Gold", description: "Highest gold reserve density globally (4,000+ deposits)" },
    { name: "Platinum (PGMs)", description: "#3 globally by production (~8% of global supply)" },
    { name: "Lithium", description: "Largest reserves in Africa; top 5–7 globally for EV batteries" },
    { name: "Chrome", description: "2nd largest high-grade chrome reserves worldwide" },
];

const economicPoints: EconomicPoint[] = [
    { title: "High GDP Growth", numericValue: 6.6, suffix: "%", description: "Among the highest growing countries of Africa" },
    { title: "Real Estate Boom", numericValue: 80, suffix: "%+", description: "Harare home prices growth over 5 years" },
    { title: "Macroeconomic Stability", numericValue: 4, suffix: "-5%", description: "Cooling inflation and tighter fiscal discipline" },
    { title: "Export Growth Momentum", numericValue: 2, suffix: "-3x", description: "Doubled over recent years, driven by increased global demand" },
];

export default function WhyZimbabwe() {
    return (
        <section className="w-full py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mt-3 mb-4">
                        Why Zimbabwe{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C5244] to-[#F8AB1D]">
                            (Now)
                        </span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Africa faces a structural capital gap across MSMEs, mining, land,
                        and real estate. Zimbabwe offers unique opportunities for strategic
                        investors.
                    </p>
                </div>

                {/* Carousel Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* 1. Mineral Card */}
                    <CarouselCard
                        title="Mineral Reserves"
                        accentColor="#F8AB1D"
                        items={mineralData}
                        delay={0}
                        renderItem={(item) => (
                            <>
                                <h4 className="text-2xl font-bold text-[#F8AB1D] mb-1">
                                    {item.name}
                                </h4>
                                <p className="text-[#333333] leading-snug text-sm md:text-base">
                                    {item.description}
                                </p>
                            </>
                        )}
                    />

                    {/* 2. Economic Card */}
                    <CarouselCard
                        title="Economic Growth"
                        accentColor="#1C5244"
                        items={economicPoints}
                        delay={1.5} // Slight offset so they don't move in unison
                        renderItem={(item) => (
                            <>
                                <div className="flex justify-center items-baseline gap-1 mb-1 text-[#1C5244]">
                                    <span className="text-3xl font-bold">{item.numericValue}</span>
                                    <span className="text-xl font-semibold">{item.suffix}</span>
                                </div>
                                <h4 className="text-lg font-bold text-[#333333] mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </>
                        )}
                    />

                </div>
            </div>
        </section>
    );
}