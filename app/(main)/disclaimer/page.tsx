import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Disclaimer | All Terra Global",
  description:
    "Important disclaimers regarding investment information and content on the All Terra Global website.",
};

const disclaimerSections = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    ),
    content: (
      <>
        <p className="mb-4">
          The information provided on this website is for informational purposes only and should not be interpreted as investment advice, financial advice, legal advice, or a recommendation to invest.
        </p>
        <p className="mb-4">
          All Terra Global operates as an investment and financing platform focused on structured capital opportunities. Any references to potential investment opportunities, returns, or financial performance are illustrative and subject to change.
        </p>
      </>
    )
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    ),
    content: (
      <p>
        Investments in emerging markets and private credit structures involve significant risks, including the potential loss of capital. Prospective investors should conduct their own independent due diligence and seek advice from qualified financial, legal, and tax advisors before making any investment decision.
      </p>
    )
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    ),
    content: (
      <>
        <p className="mb-3">Nothing contained on this website constitutes:</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li>an offer to sell securities</li>
          <li>a solicitation to purchase securities</li>
          <li>an invitation to participate in any investment</li>
        </ul>
        <p>Any such offer will only be made through formal offering documents and in compliance with applicable securities regulations.</p>
      </>
    )
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
    ),
    content: (
      <>
        <p className="mb-4">Past performance is not indicative of future results.</p>
        <p className="mb-4">All Terra Global does not guarantee any returns or outcomes.</p>
        <p>Information contained on this website may include forward-looking statements that involve risks and uncertainties. Actual results may differ materially from those expressed or implied.</p>
      </>
    )
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    ),
    content: (
      <>
        <p className="mb-4">While reasonable efforts are made to ensure the accuracy of information presented, All Terra Global makes no representation or warranty regarding completeness or reliability.</p>
        <p>Use of this website is at the user&apos;s own risk.</p>
      </>
    )
  }
];

export default function Disclaimer() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Disclaimer"
        description="Important information regarding the nature of content on our website and the risks associated with investing in private markets."
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Financial disclaimer and legal notice"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice Banner */}
          <div className="mb-12 p-6 bg-[#F8AB1D]/10 border border-[#F8AB1D]/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F8AB1D] flex items-center justify-center shrink-0">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#333333] mb-2 font-heading">
                  Important Notice
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Please read this disclaimer carefully before using the All
                  Terra Global website or relying on any information contained
                  herein. By accessing this website, you acknowledge that you
                  have read, understood, and agree to our disclaimers.
                </p>
              </div>
            </div>
          </div>

          {/* Details Sections */}
          <div className="space-y-6">
            {disclaimerSections.map((section, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#1C5244]/20 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1C5244]/5 flex items-center justify-center shrink-0 border border-[#1C5244]/10">
                    <svg
                      className="w-6 h-6 text-[#1C5244]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {section.icon}
                    </svg>
                  </div>
                  <div className="text-gray-600 leading-relaxed text-[15px] pt-1 sm:pt-3">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-[#1C5244] rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-3 font-heading">
              Need Clarification?
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Our team can help you understand these disclaimers and assess
              whether our investment opportunities align with your profile.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] font-semibold px-6 py-3 rounded-lg hover:bg-[#d99310] transition-colors"
            >
              Speak With Our Team
              <svg
                className="w-4 h-4"
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
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
