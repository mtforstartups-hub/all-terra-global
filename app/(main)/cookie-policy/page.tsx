import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy | All Terra Global",
  description: "Learn about how we use cookies and similar technologies to improve your experience.",
};

const sections = [
  {
    title: "What Are Cookies and Similar Technologies?",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Cookies are small files or pieces of information that may be stored on or accessed from your browser or device when you visit a website.</p>
        <p className="mb-4">Websites may also use similar technologies, including browser storage, tags, scripts, pixels, identifiers, and related technologies that perform comparable functions.</p>
        <p className="mb-4">These technologies can support functions such as website operation, security, authentication, preferences, and analytics.</p>
      </div>
    ),
  },
  {
    title: "How We Use These Technologies",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra uses technologies necessary to operate and protect its website and account functionality where applicable.</p>
        <p className="mb-4">We also use <strong>Google Analytics</strong> to understand how visitors use our website, measure website performance, and help us improve our online services.</p>
        <p className="mb-4">Google Analytics is treated as a non-essential analytics technology for users in jurisdictions where prior consent is required.</p>
      </div>
    ),
  },
  {
    title: "Strictly Necessary Technologies",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Certain technologies may be necessary for the website to function properly or securely.</p>
        <p className="mb-4">These technologies may support functions such as account authentication, maintaining website security, preserving a user's session, fraud prevention, or delivering a service specifically requested by the user.</p>
        <p className="mb-4">Where applicable law permits strictly necessary technologies to operate without consent, they may remain active because the relevant functionality cannot reasonably be provided without them.</p>
        <p className="mb-4">We do not use the strictly necessary category to place optional analytics technologies.</p>
      </div>
    ),
  },
  {
    title: "Analytics",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra uses <strong>Google Analytics</strong> to obtain information about website usage and performance.</p>
        <p className="mb-4">Analytics information may include information about how visitors interact with pages and features, technical information relating to devices and browsers, and information used to generate website usage statistics.</p>
        <p className="mb-4">For visitors in the European Union, European Economic Area and United Kingdom, Google Analytics is configured not to operate until the visitor has provided the required analytics consent.</p>
        <p className="mb-4">A visitor who rejects analytics cookies should continue to be able to access the website without Google Analytics being activated.</p>
      </div>
    ),
  },
  {
    title: "Your Cookie Choices",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Where consent is required, All Terra provides controls through which you can choose whether non-essential analytics technologies may operate.</p>
        <p className="mb-4">You may:</p>
        <p className="mb-4"><strong>Accept All</strong>, which permits the available optional categories;</p>
        <p className="mb-4"><strong>Reject Non-Essential</strong>, which keeps optional analytics technologies disabled; or</p>
        <p className="mb-4"><strong>Manage Preferences</strong>, which allows you to review and control the available categories.</p>
        <p className="mb-4">Strictly necessary technologies cannot be disabled through our consent interface where they are genuinely necessary for the requested website functionality, although your browser may provide additional controls.</p>
      </div>
    ),
  },
  {
    title: "Changing or Withdrawing Your Choice",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Where our use of a technology is based on your consent, you may change or withdraw that consent at any time through the website's <strong>Cookie Settings</strong> or equivalent privacy-preference control.</p>
        <p className="mb-4">Withdrawing consent will prevent the relevant technology from operating in accordance with your updated preference.</p>
        <p className="mb-4">Withdrawal does not affect processing that occurred lawfully before your preference was changed.</p>
      </div>
    ),
  },
  {
    title: "Google Analytics",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Google Analytics is provided by Google.</p>
        <p className="mb-4">All Terra uses Google Analytics for website measurement and analytics purposes.</p>
        <p className="mb-4">Google may process information generated through the Analytics service in accordance with the configuration of the service and Google's applicable terms and privacy documentation.</p>
        <p className="mb-4">All Terra does not activate Google Analytics for EU/EEA and UK visitors before the required consent has been obtained.</p>
        <p className="mb-4">The precise cookies, identifiers, expiration periods, and technical settings associated with Google Analytics may depend on the configuration implemented on our website.</p>
        <p className="mb-4">Our technical cookie inventory should be treated as the authoritative source for the specific Google Analytics technologies currently deployed.</p>
      </div>
    ),
  },
  {
    title: "Other Technologies",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Our website may require technologies for security, authentication, session management, and core functionality.</p>
        <p className="mb-4">We do not classify a technology as strictly necessary merely because it is useful to All Terra.</p>
        <p className="mb-4">If we introduce additional analytics, advertising, targeting, social-media, session-replay, or other non-essential technologies, we will review their purpose and applicable consent requirements before deployment and update this Cookie Policy and our preference controls where appropriate.</p>
      </div>
    ),
  },
  {
    title: "Browser Controls",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Most browsers allow users to view, restrict, or delete cookies through browser settings.</p>
        <p className="mb-4">Blocking all cookies may affect website functionality, including features that depend on technically necessary cookies or browser storage.</p>
        <p className="mb-4">Browser controls operate separately from the consent choices provided directly by All Terra.</p>
      </div>
    ),
  },
  {
    title: "Changes to this Cookie Policy",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We may update this Cookie Policy when our website technologies, service providers, processing activities, or legal requirements change.</p>
        <p className="mb-4">Where a change introduces a new purpose that requires consent, we will obtain the required choice before activating the relevant technology for affected users.</p>
        <p className="mb-4">The Effective Date above will identify the current version.</p>
      </div>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">If you have questions about our use of cookies or similar technologies, contact:</p>
        <p className="mb-4"><strong>All Terra Global</strong></p>
        <p className="mb-4">Dubai, United Arab Emirates</p>
        <p className="mb-4"><strong>Email:</strong> investments@allterraglobal.com</p>
      </div>
    ),
  },
];


export default function CookiePolicy() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Cookie Policy"
        description="Learn about how we use cookies and similar technologies to improve your experience."
        backgroundImage="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Cookie Policy"
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
              <p>This Cookie Policy explains how All Terra Global ("All Terra", "we", "us", or "our") uses cookies and similar technologies when you visit <strong>allterraglobal.com</strong>.</p>
              <p>This Cookie Policy should be read together with our Privacy Policy.</p>
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
              Have Questions About Our Policies?
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Our team is here to help you understand how your data is used and protected.
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
