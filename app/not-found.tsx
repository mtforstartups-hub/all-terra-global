import Link from "next/link";

export default function NotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C5244] to-[#143d33] px-4">
            <div className="text-center max-w-2xl">
                {/* Large 404 */}
                <h1 className="text-[12rem] sm:text-[16rem] font-bold text-white/10 leading-none select-none">
                    404
                </h1>

                {/* Overlay Content */}
                <div className="-mt-32 sm:-mt-40 relative z-10">
                    <span className="text-[#F8AB1D] font-semibold text-sm uppercase tracking-wider">
                        Page Not Found
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
                        Oops! This Page Doesn&apos;t Exist
                    </h2>
                    <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
                        The page you&apos;re looking for may have been moved, deleted, or never existed in the first place.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-[#F8AB1D] text-[#333333] px-8 py-4 rounded-xl font-bold hover:bg-[#d99310] transition-all hover:-translate-y-1"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Back to Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-[#F8AB1D]/10 blur-2xl" />
                <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-[#F8AB1D]/10 blur-3xl" />
            </div>
        </section>
    );
}
