import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service | All Terra Global",
  description:
    "Read the terms and conditions governing your use of the All Terra Global website and services.",
};

const sections = [
  {
    title: "Nature of the Website",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>The website is provided for informational purposes only.</p>
        <p>It is intended to provide general information about the Company, its investment strategy, and related opportunities.</p>
        <p>The website does not constitute an offer, solicitation, or recommendation to invest.</p>
      </div>
    ),
  },
  {
    title: "Eligibility",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>Use of this website is intended only for individuals who are:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>at least 18 years of age</li>
          <li>legally capable of entering into binding agreements</li>
          <li>permitted under applicable laws to access such information</li>
        </ul>
        <p>Certain sections of the website may be restricted to qualified or accredited investors.</p>
      </div>
    ),
  },
  {
    title: "Investment Information",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>Any information relating to investment opportunities, financial projections, or expected returns is provided for informational purposes only.</p>
        <p>Investment opportunities may only be made available through:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>private placement documents</li>
          <li>formal agreements</li>
          <li>investor onboarding processes</li>
        </ul>
        <p>No investment decision should be made solely based on information provided on this website.</p>
      </div>
    ),
  },
  {
    title: "Intellectual Property",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>All content on this website including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>text</li>
          <li>graphics</li>
          <li>logos</li>
          <li>documents</li>
          <li>presentations</li>
          <li>visual materials</li>
        </ul>
        <p>is the property of All Terra Global unless otherwise indicated.</p>
        <p>Such content may not be copied, reproduced, distributed, or modified without prior written consent.</p>
      </div>
    ),
  },
  {
    title: "Prohibited Uses",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>Users agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>use the website for unlawful purposes</li>
          <li>attempt to gain unauthorized access to systems</li>
          <li>interfere with website functionality</li>
          <li>distribute malicious software</li>
          <li>scrape or harvest data without permission</li>
        </ul>
      </div>
    ),
  },
  {
    title: "No Warranty",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>The website and all information provided are offered on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.</p>
        <p>All Terra Global makes no warranties regarding:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>accuracy</li>
          <li>completeness</li>
          <li>reliability</li>
          <li>availability</li>
        </ul>
        <p>Information may be updated or changed without notice.</p>
      </div>
    ),
  },
  {
    title: "Limitation of Liability",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>To the maximum extent permitted by law, All Terra Global shall not be liable for any:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>direct damages</li>
          <li>indirect damages</li>
          <li>consequential damages</li>
          <li>financial losses</li>
        </ul>
        <p>arising from the use or inability to use this website.</p>
      </div>
    ),
  },
  {
    title: "Third-Party Services",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>The website may contain links to third-party services or websites.</p>
        <p>All Terra Global does not control and is not responsible for such services.</p>
      </div>
    ),
  },
  {
    title: "Modifications",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>We reserve the right to modify these Terms at any time.</p>
        <p>Continued use of the website after changes constitutes acceptance of the updated Terms.</p>
      </div>
    ),
  },
  {
    title: "Governing Law",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>These Terms shall be governed by and interpreted in accordance with the laws applicable to the jurisdiction in which All Terra Global operates its primary corporate entity.</p>
      </div>
    ),
  },
  {
    title: "Contact",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
    content: (
      <div className="space-y-2">
        <p>For inquiries regarding these Terms, please contact:</p>
        <p className="font-semibold text-[#1C5244]">All Terra Global</p>
        <p>
          Email: <a href="mailto:investments@allterraglobal.com" className="hover:text-[#F8AB1D] transition-colors">investments@allterraglobal.com</a>
        </p>
      </div>
    ),
  },
];

export default function TermsOfService() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using our services. By accessing our platform, you agree to be bound by these terms."
        backgroundImage="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Legal documents and agreement"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Effective Date */}
          <div className="mb-12 pb-8 border-b border-gray-100">
            <div className="inline-flex items-center gap-2 bg-[#1C5244]/5 border border-[#1C5244]/20 rounded-full px-4 py-2">
              <svg
                className="w-4 h-4 text-[#1C5244]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-[#1C5244] font-medium">
                Last Updated: 10 March 2026
              </span>
            </div>
            <div className="mt-4 text-gray-600 leading-relaxed space-y-4">
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated by All Terra Global (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p>
                By accessing this website, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree, you should not use this website.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <h2 className="text-sm font-semibold text-[#333333] uppercase tracking-wider mb-4 font-heading">
              Table of Contents
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#F8AB1D] font-bold text-sm">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-gray-600 text-sm hover:text-[#1C5244] transition-colors cursor-default">
                    {section.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#1C5244]/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1C5244]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[#1C5244]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {section.icon}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-[#F8AB1D] font-heading">
                        §{idx + 1}
                      </span>
                      <h2 className="text-xl font-bold text-[#333333] font-heading">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-gray-600 leading-relaxed text-sm">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-[#1C5244] rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-3 font-heading">
              Questions About Our Terms?
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Our team is happy to clarify any part of these terms. Reach out to
              us directly.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] font-semibold px-6 py-3 rounded-lg hover:bg-[#d99310] transition-colors"
            >
              Get in Touch
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
