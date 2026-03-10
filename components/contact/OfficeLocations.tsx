import Image from "next/image";

const offices = [
    {
        city: "Dubai",
        country: "United Arab Emirates",
        address: "Business Bay, Dubai",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
        type: "Global Headquarters",
    },
    {
        city: "Harare",
        country: "Zimbabwe",
        address: "Harare CBD",
        image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=600&q=80",
        type: "Operations Center",
    },
];

export default function OfficeLocations() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#1C5244] font-semibold text-sm uppercase tracking-wider">
                        Our Offices
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#333333] mt-3">
                        Visit Us
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {offices.map((office) => (
                        <div key={office.city} className="group relative overflow-hidden rounded-3xl h-80">
                            <Image
                                src={office.image}
                                alt={office.city}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="px-3 py-1 bg-[#F8AB1D] text-[#333333] rounded-full text-xs font-bold mb-3 inline-block">
                                    {office.type}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-1">{office.city}</h3>
                                <p className="text-white/80">{office.country}</p>
                                <p className="text-white/60 text-sm mt-2">{office.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
