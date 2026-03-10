import Link from "next/link";

interface PageCtaProps {
    title: string;
    description: string;
    /** Background variant: "green" (primary) or "dark" (secondary) */
    variant?: "green" | "dark";
    /** Primary button configuration */
    primaryButton?: {
        text: string;
        href: string;
        showArrow?: boolean;
    };
    /** Secondary outline button configuration */
    secondaryButton?: {
        text: string;
        href: string;
    };
    /** Highlighted text (shown instead of or in addition to buttons) */
    highlightedText?: string;
}

export default function PageCta({
    title,
    description,
    variant = "green",
    primaryButton,
    secondaryButton,
    highlightedText,
}: PageCtaProps) {
    const bgClass =
        variant === "green"
            ? "bg-gradient-to-r from-[#1C5244] to-[#143d33]"
            : "bg-gradient-to-r from-[#333333] to-[#1a1a1a]";

    return (
        <section className={`py-20 ${bgClass}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    {title}
                </h2>
                <p className="text-white/80 text-lg mb-8">{description}</p>

                {(primaryButton || secondaryButton) && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {primaryButton && (
                            <Link
                                href={primaryButton.href}
                                className="inline-flex items-center justify-center gap-2 bg-[#F8AB1D] text-[#333333] px-8 py-4 rounded-xl font-bold hover:bg-[#d99310] transition-all hover:-translate-y-1"
                            >
                                {primaryButton.text}
                                {primaryButton.showArrow && (
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
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                )}
                            </Link>
                        )}
                        {secondaryButton && (
                            <Link
                                href={secondaryButton.href}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:-translate-y-1"
                            >
                                {secondaryButton.text}
                            </Link>
                        )}
                    </div>
                )}

                {highlightedText && (
                    <p className="text-[#F8AB1D] font-medium">{highlightedText}</p>
                )}
            </div>
        </section>
    );
}
