import PageHero from "@/components/shared/PageHero";
import PageCta from "@/components/shared/PageCta";
import GlobalPresence from "@/components/about/GlobalPresence";
import ContactForm from "@/components/ContactForm";

const trustItems = [
    { icon: "🛡️", text: "Insurance-backed protection on investments" },
    { icon: "🔒", text: "Collateral-backed secured loans" },
    { icon: "📋", text: "Independent due diligence on every deal" },
    { icon: "🌍", text: "UAE jurisdiction for investor protection" },
    { icon: "💰", text: "13-20% target returns on investments" },
];

export default function ContactPage() {
    return (
        <>
            <PageHero
                label="Get In Touch"
                title="Start Your Investment Journey"
                description="Ready to explore high-yield opportunities in African markets? Our team is here to discuss investment structures tailored to your needs."
                backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
                imageAlt="Modern office"
            />
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Form */}
                        <ContactForm />

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-secondary mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-[#1C5244] flex items-center justify-center shrink-0">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-secondary mb-1">Email</h4>
                                            <a
                                                href="mailto:investments@allterraglobal.com"
                                                className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors text-lg"
                                            >
                                                investments@allterraglobal.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-[#1C5244] flex items-center justify-center shrink-0">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-secondary mb-1">
                                                Response Time
                                            </h4>
                                            <p className="text-gray-600">
                                                We typically respond within 24-48 business hours
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Section */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="font-bold text-secondary mb-6">
                                    Why Partner With Us
                                </h3>
                                <div className="space-y-4">
                                    {trustItems.map((item) => (
                                        <div key={item.text} className="flex items-center gap-4">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-gray-600">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <GlobalPresence />
            <PageCta
                title="Have Questions About Investing?"
                description="Download our investor FAQ document or schedule a call with our team to learn more about our investment process."
                variant="dark"
                highlightedText="Email us at investments@allterraglobal.com"
            />
        </>
    );
}
