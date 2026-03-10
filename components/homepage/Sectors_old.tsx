import Image from "next/image";
import TiltCard3D from "../TiltCard3D";

export default function Sectors() {
  const sectors = [
    {
      title: "Mining",
      description:
        "Gold, Platinum, Lithium & Chrome extraction with proven reserves",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
      stats: ["40+ Minerals", "World #3 PGMs", "Top 5 Lithium"],
    },
    {
      title: "Real Estate",
      description:
        "Residential development projects capitalizing on 80%+ property value growth",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      stats: ["Urban Growth", "Mixed Housing", "High Demand"],
    },
    {
      title: "Vendor Financing",
      description:
        "Working capital solutions for established supply chain ecosystems",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
      stats: ["SME Support", "Cash Flow", "Trade Finance"],
    },
    {
      title: "Micro Financing",
      description:
        "Community-level financing driving grassroots economic development",
      // image:
      //   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      image: "/images/micro-financing.jpeg",
      stats: ["RBZ Registered"],
    },
    {
      title: "Emerging Businesses",
      description:
        "Nurturing and scaling high-potential enterprises across innovative and high-growth industries",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
      stats: ["Venture Scaling", "Innovation", "Strategic Growth"],
    },
  ];

  return (
    <section id="sectors" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
            Our Focus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-6">
            Sectors We Deal In
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Diversified exposure across Zimbabwe&apos;s most dynamic growth
            sectors
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mining - Featured Large */}
          <TiltCard3D
            className="md:col-span-2 lg:col-span-2 h-100"
            tiltAmount={8}
            glareOpacity={0.2}
          >
            <div className="group relative overflow-hidden rounded-3xl h-full">
              <Image
                src={sectors[0].image}
                alt={sectors[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {sectors[0].stats.map((stat) => (
                    <span
                      key={stat}
                      className="px-3 py-1 bg-[#F8AB1D] text-secondary rounded-full text-xs font-semibold"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {sectors[0].title}
                </h3>
                <p className="text-white/80">{sectors[0].description}</p>
              </div>
              {/* 3D Float Effect */}
              <div
                className="absolute top-4 right-4 w-16 h-16 bg-[#F8AB1D] rounded-2xl flex items-center justify-center shadow-xl"
                style={{ transform: "translateZ(40px)" }}
              >
                {/* <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg> */}
                <Image
                  src="/images/globe-icon.png"
                  alt={sectors[0].title}
                  width={48}
                  height={48}
                  className="invert"
                />
              </div>
            </div>
          </TiltCard3D>

          {/* Real Estate */}
          <TiltCard3D className="h-100" tiltAmount={12} glareOpacity={0.25}>
            <div className="group relative overflow-hidden rounded-3xl h-full">
              <Image
                src={sectors[1].image}
                alt={sectors[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {sectors[1].stats.map((stat) => (
                    <span
                      key={stat}
                      className="px-3 py-1 bg-[#F8AB1D] text-secondary rounded-full text-xs font-semibold"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {sectors[1].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {sectors[1].description}
                </p>
              </div>
              {/* 3D Float Icon */}
              <div
                className="absolute top-4 right-4 w-12 h-12 bg-[#1C5244] rounded-xl flex items-center justify-center shadow-lg"
                style={{ transform: "translateZ(30px)" }}
              >
                {/* <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg> */}

                <Image
                  src="/images/globe-icon.png"
                  alt={sectors[0].title}
                  width={48}
                  height={48}
                  className="invert"
                />
              </div>
            </div>
          </TiltCard3D>

          {/* Remaining Sectors */}
          {sectors.slice(2).map((sector, index) => (
            <TiltCard3D
              key={sector.title}
              className="h-75"
              tiltAmount={15}
              glareOpacity={0.3}
            >
              <div className="group relative overflow-hidden rounded-3xl h-full">
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {sector.stats.slice(0, 2).map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 bg-[#F8AB1D] text-secondary rounded-full text-xs font-semibold"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {sector.title}
                  </h3>
                  <p className="text-white/80 text-sm">{sector.description}</p>
                </div>
                {/* 3D Float Icon */}
                <div
                  className="absolute top-4 right-4 w-10 h-10 bg-primary-dark backdrop-blur-sm rounded-lg flex items-center justify-center"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <Image
                    src="/images/globe-icon.png"
                    alt={sector.title}
                    width={48}
                    height={48}
                    className=""
                  />
                  {/* {index === 0 && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )} */}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
