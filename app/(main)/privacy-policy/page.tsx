import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | All Terra Global",
  description:
    "Learn how All Terra Global collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p>We may collect the following categories of information:</p>
        
        <div>
          <h3 className="font-semibold text-[#1C5244] mb-2 font-heading">Personal Information</h3>
          <p className="mb-2">Information that identifies or can be used to identify an individual, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Country of residence</li>
            <li>Professional information</li>
            <li>Investment interests</li>
            <li>Identification details submitted for investor verification</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#1C5244] mb-2 font-heading">Technical Information</h3>
          <p className="mb-2">When you access our website, we may automatically collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited</li>
            <li>Date and time of access</li>
            <li>Referral source</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#1C5244] mb-2 font-heading">Investor Due Diligence Information</h3>
          <p className="mb-2">Where applicable, we may collect additional documentation for compliance purposes including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>KYC (Know Your Customer) information</li>
            <li>AML (Anti-Money Laundering) verification documents</li>
            <li>Investor accreditation status</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>We use collected information for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To operate and maintain our website</li>
          <li>To respond to inquiries or requests</li>
          <li>To provide information about investment opportunities</li>
          <li>To verify investor eligibility</li>
          <li>To comply with regulatory and legal obligations</li>
          <li>To improve website functionality and user experience</li>
          <li>To communicate updates, reports, or relevant information</li>
        </ul>
        <p>We only process personal data when we have a lawful basis to do so.</p>
      </div>
    ),
  },
  {
    title: "Legal Basis for Processing",
    content: (
      <div className="space-y-4">
        <p>Depending on the circumstances, we process personal data based on:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>User consent</li>
          <li>Contractual necessity</li>
          <li>Compliance with legal obligations</li>
          <li>Legitimate business interests</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Sharing of Information",
    content: (
      <div className="space-y-4">
        <p>We may share information with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Regulatory authorities</li>
          <li>Compliance and verification providers</li>
          <li>Professional advisors (legal, tax, accounting)</li>
          <li>Technology and hosting service providers</li>
          <li>Affiliates or partners involved in investment structuring</li>
        </ul>
        <p>We do not sell personal data to third parties.</p>
      </div>
    ),
  },
  {
    title: "International Data Transfers",
    content: (
      <div className="space-y-4">
        <p>Given the global nature of our operations, personal information may be transferred to and processed in jurisdictions outside your country of residence.</p>
        <p>These may include locations where we or our service providers operate, including but not limited to the United Arab Emirates, India, Zimbabwe, the United States, or other jurisdictions.</p>
        <p>We take reasonable steps to ensure that appropriate safeguards are in place to protect such data.</p>
      </div>
    ),
  },
  {
    title: "Data Security",
    content: (
      <div className="space-y-4">
        <p>We implement appropriate technical and organizational measures to safeguard personal data against:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>unauthorized access</li>
          <li>disclosure</li>
          <li>alteration</li>
          <li>destruction</li>
        </ul>
        <p>However, no method of transmission over the internet can be guaranteed to be completely secure.</p>
      </div>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <div className="space-y-4">
        <p>We retain personal data only for as long as necessary to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>fulfill the purposes described in this policy</li>
          <li>comply with legal and regulatory obligations</li>
          <li>resolve disputes</li>
          <li>enforce agreements</li>
        </ul>
        <p>Investor compliance records may be retained for longer periods as required by law.</p>
      </div>
    ),
  },
  {
    title: "Cookies and Tracking Technologies",
    content: (
      <div className="space-y-4">
        <p>Our website may use cookies and similar technologies to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>analyze website traffic</li>
          <li>improve user experience</li>
          <li>understand visitor behavior</li>
        </ul>
        <p>Users may control cookie preferences through browser settings.</p>
      </div>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <div className="space-y-4">
        <p>Depending on your jurisdiction, you may have rights including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>access to your personal data</li>
          <li>correction of inaccurate data</li>
          <li>deletion of personal information</li>
          <li>restriction of processing</li>
          <li>withdrawal of consent</li>
        </ul>
        <p>Requests may be submitted using the contact details below.</p>
      </div>
    ),
  },
  {
    title: "Third-Party Links",
    content: (
      <div className="space-y-4">
        <p>Our website may contain links to third-party websites.</p>
        <p>We are not responsible for the privacy practices or content of those external websites.</p>
      </div>
    ),
  },
  {
    title: "Updates to This Policy",
    content: (
      <div className="space-y-4">
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.</p>
      </div>
    ),
  },
  {
    title: "Contact",
    content: (
      <div className="space-y-4">
        <p>For questions regarding this Privacy Policy, please contact:</p>
        <p className="font-semibold text-[#1C5244]">All Terra Global</p>
        <p>
          Email: <a href="mailto:investments@allterraglobal.com" className="hover:text-[#F8AB1D] transition-colors">investments@allterraglobal.com</a>
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information."
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Privacy and security"
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Last Updated */}
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
                All Terra Global (&quot;All Terra Global&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or interact with our services.
              </p>
              <p>
                This policy applies to information collected through our website and related services.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1C5244] text-white font-bold text-sm shrink-0 font-heading">
                    {idx + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading">
                    {section.title}
                  </h2>
                </div>

                <div className="ml-14 space-y-6">
                  <div className="border-l-2 border-[#F8AB1D]/40 pl-5 text-gray-600 leading-relaxed text-sm">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 p-8 bg-[#1C5244] rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-3 font-heading">
              Have Questions About Your Privacy?
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Our team is here to help you understand how your data is used and
              protected.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F8AB1D] text-[#333333] font-semibold px-6 py-3 rounded-lg hover:bg-[#d99310] transition-colors"
            >
              Contact Us
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
