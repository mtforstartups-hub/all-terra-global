import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy | All Terra Global",
  description: "Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Scope",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">This Privacy Policy applies to personal data processed through our website, investor onboarding processes, KYC and compliance activities, investment-related interactions, account functions, and associated business operations.</p>
        <p className="mb-4">Our services are intended for persons aged <strong>18 years or older</strong>.</p>
        <p className="mb-4">This Privacy Policy does not by itself govern the commercial terms, risks, rights, repayment obligations, returns, or other terms applicable to a particular investment opportunity. Those matters are governed by the documentation applicable to the relevant opportunity.</p>
      </div>
    ),
  },
  {
    title: "Personal Data We Collect",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Depending on your interaction with us, we may collect the following categories of personal data.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Identity and contact information</h3>
        <p className="mb-4">This may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>full name;</li>
        <li>email address;</li>
        <li>telephone number;</li>
        <li>residential or business address;</li>
        <li>date of birth;</li>
        <li>nationality; and</li>
        <li>other contact or identification information you provide.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Identity verification and KYC information</h3>
        <p className="mb-4">This may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>passport or national identity documents;</li>
        <li>photographs and selfies;</li>
        <li>proof of address;</li>
        <li>tax identification information;</li>
        <li>KYC documentation;</li>
        <li>information used for identity verification; and</li>
        <li>verification and screening results generated through our compliance processes.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Financial and investor information</h3>
        <p className="mb-4">This may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>bank details;</li>
        <li>income and wealth information;</li>
        <li>source-of-funds information and supporting documents;</li>
        <li>investment history;</li>
        <li>proposed investment information;</li>
        <li>investor classification information;</li>
        <li>suitability or appropriateness information; and</li>
        <li>risk acknowledgements.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Corporate and beneficial ownership information</h3>
        <p className="mb-4">Where an investor or prospective investor is an organisation, we may collect:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>corporate records and supporting documents;</li>
        <li>information about directors, officers, authorised representatives, and signatories;</li>
        <li>beneficial ownership information; and</li>
        <li>identity and KYC information relating to relevant individuals.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Account and communication information</h3>
        <p className="mb-4">This may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>account identifiers;</li>
        <li>login credentials or authentication information;</li>
        <li>enquiries and messages submitted through the website;</li>
        <li>records of communications with us; and</li>
        <li>information associated with an investor application or account.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Technical and usage information</h3>
        <p className="mb-4">When you use our website, we may collect technical information such as:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>IP address;</li>
        <li>device information;</li>
        <li>browser information;</li>
        <li>operating system information;</li>
        <li>website usage and interaction data; and</li>
        <li>analytics information.</li>
        </ul>
        <p className="mb-4">We use Google Analytics subject to the consent controls described below.</p>
      </div>
    ),
  },
  {
    title: "Biometric Identity Verification",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">As part of our KYC and identity-verification procedures, All Terra may use <strong>automated facial or biometric matching</strong>.</p>
        <p className="mb-4">The biometric matching system is operated internally by All Terra Global. A photograph or selfie may be technically processed and compared for the purpose of verifying a person's identity.</p>
        <p className="mb-4">We do <strong>not retain the biometric template or facial-match data after the verification process is completed</strong>.</p>
        <p className="mb-4">A photograph or identity image that forms part of the underlying KYC record may be retained separately where necessary for identity verification, compliance, recordkeeping, dispute resolution, or other applicable legal purposes.</p>
        <p className="mb-4">Where biometric information is subject to laws that provide enhanced protection for biometric or special-category personal data, we process such information only where an appropriate lawful basis and any additional condition, consent, safeguard, or other requirement under applicable law is satisfied.</p>
      </div>
    ),
  },
  {
    title: "How We Obtain Personal Data",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We primarily obtain personal data <strong>directly from you</strong>, including when you:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>create an account;</li>
        <li>make an enquiry;</li>
        <li>provide information about an investment;</li>
        <li>complete investor onboarding;</li>
        <li>provide KYC documents;</li>
        <li>complete identity verification;</li>
        <li>provide source-of-funds information;</li>
        <li>complete investor classification or suitability procedures; or</li>
        <li>otherwise communicate with us.</li>
        </ul>
        <p className="mb-4">We may also generate compliance, verification, screening, suitability, classification, fraud-prevention, and similar results through our internal processes using information supplied by you.</p>
      </div>
    ),
  },
  {
    title: "How We Use Personal Data",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We may process personal data for the following purposes.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Account creation and administration</h3>
        <p className="mb-4">To establish, authenticate, maintain, and administer website or investor accounts.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Investor enquiries and onboarding</h3>
        <p className="mb-4">To respond to enquiries, assess prospective investor relationships, communicate about relevant opportunities, and carry out steps requested in connection with a potential investment relationship.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Identity and KYC verification</h3>
        <p className="mb-4">To verify identity and conduct know-your-customer procedures.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">AML and sanctions compliance</h3>
        <p className="mb-4">To conduct anti-money laundering, sanctions screening, and related compliance procedures.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Source-of-funds verification</h3>
        <p className="mb-4">To assess and document the source of funds and related information where required for investor onboarding, compliance, risk management, or an investment transaction.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Investor classification</h3>
        <p className="mb-4">To assess whether an investor falls within an applicable retail, accredited, professional, qualified, institutional, corporate, HNI, family office, or other investor category.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Suitability and appropriateness</h3>
        <p className="mb-4">To undertake suitability or appropriateness assessments where applicable to the relevant investor, jurisdiction, transaction, or investment opportunity.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Risk acknowledgement</h3>
        <p className="mb-4">To provide, obtain, and maintain appropriate risk disclosures and acknowledgements.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Investment administration</h3>
        <p className="mb-4">To administer investor relationships and activities associated with relevant investment opportunities.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Security and fraud prevention</h3>
        <p className="mb-4">To protect our systems, website, accounts, investors, records, and business operations and to detect or prevent misuse, fraud, unauthorised access, or other security incidents.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Legal and regulatory compliance</h3>
        <p className="mb-4">To comply with legal, regulatory, judicial, governmental, compliance, audit, recordkeeping, and enforcement requirements that apply to us or to a particular transaction.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Website analytics</h3>
        <p className="mb-4">To understand how visitors interact with our website, measure website performance, and improve website functionality.</p>
      </div>
    ),
  },
  {
    title: "Lawful Bases for Processing",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Where the EU GDPR or UK GDPR applies, we rely on one or more lawful bases depending on the specific processing activity.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Contract and pre-contractual steps</h3>
        <p className="mb-4">We may process personal data where processing is necessary:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>to take steps at your request before entering into a contractual relationship; or</li>
        <li>to perform a contract with you.</li>
        </ul>
        <p className="mb-4">This may apply to account creation, investor onboarding, enquiries directly connected with a proposed relationship, and investment administration.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Legal obligations</h3>
        <p className="mb-4">We may process personal data where necessary to comply with legal or regulatory obligations applicable to us.</p>
        <p className="mb-4">Depending on the relevant circumstances, this may include KYC, AML and sanctions compliance, source-of-funds verification, investor classification, suitability or appropriateness procedures, recordkeeping, and regulatory compliance.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Legitimate interests</h3>
        <p className="mb-4">We may process personal data where necessary for our legitimate interests or those of another person, provided those interests are not overridden by your rights and interests.</p>
        <p className="mb-4">These interests may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>responding to and administering investor enquiries;</li>
        <li>preventing fraud and misuse;</li>
        <li>maintaining the security and integrity of our systems;</li>
        <li>establishing, exercising, or defending legal claims;</li>
        <li>maintaining appropriate business and compliance records; and</li>
        <li>protecting All Terra, investors, and relevant business counterparties.</li>
        </ul>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Consent</h3>
        <p className="mb-4">Where required, we rely on consent for specific processing activities.</p>
        <p className="mb-4">In particular, Google Analytics is subject to consent for visitors in jurisdictions where prior consent is required for analytics technologies.</p>
        <p className="mb-4">You may withdraw consent through the relevant website privacy or cookie controls. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Biometric information</h3>
        <p className="mb-4">Where biometric matching constitutes biometric or special-category processing under applicable law, All Terra will identify and document the applicable lawful basis and any separate special-category condition or other legal requirement before relying on that processing in the relevant jurisdiction.</p>
      </div>
    ),
  },
  {
    title: "Cookies and Analytics",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Our website uses Google Analytics to obtain information about website usage and performance.</p>
        <p className="mb-4">For visitors in the EU/EEA and United Kingdom, Google Analytics is configured so that analytics processing does not begin until the visitor has provided the required consent.</p>
        <p className="mb-4">Where applicable, users can reject non-essential technologies and subsequently change or withdraw their preferences.</p>
        <p className="mb-4">Strictly necessary technologies may operate without optional consent where they are required to provide a service requested by the user, maintain security, authenticate users, or perform other functions permitted by applicable law.</p>
        <p className="mb-4">Additional information about technologies used on the website and available controls may be provided through our cookie notice, consent banner, or preference interface.</p>
      </div>
    ),
  },
  {
    title: "How We Share Personal Data",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We limit access to personal data to persons and organisations that require it for legitimate business, operational, compliance, or legal purposes.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Internal access</h3>
        <p className="mb-4">Investor and KYC records may be accessed by authorised:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>directors;</li>
        <li>compliance personnel; and</li>
        <li>KYC personnel.</li>
        </ul>
        <p className="mb-4">Access is subject to role and access controls.</p>
        <p className="mb-4">Because All Terra operates internationally, authorised personnel may access relevant information from our operations in the UAE, Zimbabwe, United States, and India.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Website and database hosting</h3>
        <p className="mb-4">Our website database is hosted by <strong>MASTERMATICS</strong> in the <strong>United Arab Emirates</strong>.</p>
        <p className="mb-4">MASTERMATICS provides website/database hosting services to All Terra Global under a written service or data-protection arrangement requiring appropriate protection of investor data.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Legal and regulatory disclosures</h3>
        <p className="mb-4">We may disclose personal data where reasonably necessary to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>comply with applicable law or regulation;</li>
        <li>respond to a lawful request or legal process;</li>
        <li>cooperate with courts, regulators, law-enforcement bodies, or competent authorities;</li>
        <li>investigate suspected fraud or unlawful conduct;</li>
        <li>establish, exercise, or defend legal claims; or</li>
        <li>protect the rights, security, property, or legitimate interests of All Terra, investors, or others.</li>
        </ul>
        <p className="mb-4">We do not currently use an external KYC provider for the KYC process described in this Privacy Policy.</p>
      </div>
    ),
  },
  {
    title: "International Transfers and Cross-Border Access",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra operates internationally, and personal data may therefore be accessed or processed across jurisdictions.</p>
        <p className="mb-4">Our principal website database is hosted in the UAE. Authorised personnel may access investor information from the UAE, Zimbabwe, United States, and India.</p>
        <p className="mb-4">Where applicable data protection law regulates international transfers, we use appropriate safeguards for relevant transfers and cross-border access.</p>
        <p className="mb-4">The particular safeguard may depend on the jurisdictions, recipient, circumstances of the transfer, and applicable legal framework.</p>
        <p className="mb-4">Where required, additional information about safeguards applicable to your personal data may be requested by contacting <strong><a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></strong>.</p>
      </div>
    ),
  },
  {
    title: "Data Retention",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We retain personal data only for as long as reasonably necessary for the purposes for which it was collected and for applicable legal, regulatory, compliance, contractual, security, dispute-resolution, and recordkeeping requirements.</p>
        <p className="mb-4">Our current retention framework includes the following.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">KYC, AML and investor compliance records</h3>
        <p className="mb-4">KYC, customer due diligence, identity documents, proof-of-address information, beneficial-owner records, source-of-funds evidence, AML records, and related investor compliance information are retained for applicable legally or regulatorily required periods.</p>
        <p className="mb-4">Where a relevant UAE AML recordkeeping requirement applies to All Terra or the relevant activity, covered records may be retained for the applicable minimum statutory period.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Biometric matching information</h3>
        <p className="mb-4">Biometric templates or facial-match data generated through our biometric identity-verification process are <strong>not retained after verification is completed</strong>.</p>
        <p className="mb-4">Underlying photographs or identity documents may remain part of the applicable KYC record where their continued retention is required or otherwise justified.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Abandoned investor applications</h3>
        <p className="mb-4">Personal data associated with abandoned applications is generally retained for up to <strong>12 months after the last relevant activity</strong>, unless a longer period is required for legal, regulatory, AML, investigation, dispute, or legal-hold purposes.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Active accounts</h3>
        <p className="mb-4">Account and profile information required to administer an active relationship may be retained while that account or investor relationship remains active.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Closed accounts</h3>
        <p className="mb-4">Account information that is not independently required for KYC, AML, transaction, regulatory, security, dispute, or other legitimate recordkeeping purposes is targeted for deletion or anonymisation within <strong>30 days after account closure</strong>.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Website enquiries</h3>
        <p className="mb-4">Website enquiry information is generally retained for up to <strong>12 months after the last substantive interaction</strong>, unless continued retention is reasonably necessary.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Security records</h3>
        <p className="mb-4">Authentication and general security logs are generally retained for approximately <strong>12 months</strong>.</p>
        <p className="mb-4">KYC database access logs may be retained for approximately <strong>24 months</strong>.</p>
        <p className="mb-4">Longer periods may apply where records relate to an actual or suspected security incident, investigation, dispute, or legal requirement.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Privacy-rights records</h3>
        <p className="mb-4">Records relating to privacy requests and our responses may generally be retained for approximately <strong>three years after the request is closed</strong>, subject to applicable law.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Backups</h3>
        <p className="mb-4">Deleted production data may remain temporarily within protected backups until those backups expire through our normal backup cycle. We target a maximum deletion cycle of approximately <strong>90 days</strong>, except where continued preservation is required under a legal hold or other applicable requirement.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">Legal holds</h3>
        <p className="mb-4">Information subject to litigation, investigation, regulatory enquiry, legal hold, or similar preservation obligation may be retained until that requirement ends. The ordinary retention schedule will then apply.</p>
      </div>
    ),
  },
  {
    title: "Data Security",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We use technical and organisational measures designed to protect personal data against unauthorised access, use, disclosure, alteration, loss, or destruction.</p>
        <p className="mb-4">Measures currently used for the investor database include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>password-protected staff access;</li>
        <li>role-based access controls;</li>
        <li>encryption;</li>
        <li>backups;</li>
        <li>multi-factor authentication;</li>
        <li>access logging; and</li>
        <li>security monitoring.</li>
        </ul>
        <p className="mb-4">No system or transmission method can be guaranteed to be completely secure. We therefore continually apply safeguards appropriate to the nature of the information and the risks associated with its processing.</p>
      </div>
    ),
  },
  {
    title: "Your Privacy Rights",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Depending on where you live and the laws that apply to the relevant processing, you may have rights concerning your personal data.</p>
        <p className="mb-4">These may include the right to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
        <li>request access to personal data we hold about you;</li>
        <li>request correction of inaccurate or incomplete information;</li>
        <li>request deletion of personal data in applicable circumstances;</li>
        <li>request restriction of certain processing;</li>
        <li>object to certain processing;</li>
        <li>request portability of applicable information;</li>
        <li>withdraw consent where processing is based on consent;</li>
        <li>object to certain direct marketing;</li>
        <li>complain to an applicable data protection authority; and</li>
        <li>exercise additional rights available under applicable local law.</li>
        </ul>
        <p className="mb-4">These rights are not absolute and may be subject to legal exceptions, including obligations requiring us to retain KYC, AML, transaction, regulatory, security, or legal records.</p>
        <p className="mb-4">To exercise a privacy right, contact:</p>
        <p className="mb-4"><strong><a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></strong></p>
        <p className="mb-4">We may need to verify your identity before fulfilling a request, particularly where the request concerns investor, financial, identity, or KYC information.</p>
      </div>
    ),
  },
  {
    title: "EU/EEA Privacy Information",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Where the EU GDPR applies to our processing, All Terra Global acts as the controller of personal data covered by this Privacy Policy unless another role is specifically identified for a particular transaction.</p>
        <p className="mb-4">You may have the rights described in Section 12 and may lodge a complaint with the competent supervisory authority in the EEA country in which you live, work, or believe an infringement has occurred.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">EU Representative</h3>
        <p className="mb-4">All Terra Global will appoint a representative in the European Union or EEA where required by Article 27 of the GDPR.</p>
      </div>
    ),
  },
  {
    title: "United Kingdom Privacy Information",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Where the UK GDPR applies to our processing, you may have the rights described in Section 12.</p>
        <p className="mb-4">You also have the right to make a complaint to the UK Information Commissioner's Office where applicable.</p>
        <h3 className="font-semibold text-[#1C5244] mt-6 mb-2 font-heading">UK Representative</h3>
        <p className="mb-4">All Terra Global will appoint a UK representative where required under the UK GDPR.</p>
      </div>
    ),
  },
  {
    title: "United States Privacy Rights",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Individuals in certain US states may have additional privacy rights where the relevant state privacy law applies to All Terra and its processing activities.</p>
        <p className="mb-4">Depending on the applicable law and statutory thresholds, those rights may include rights relating to access, correction, deletion, portability, certain disclosures, and specified opt-out choices.</p>
        <p className="mb-4">Nothing in this Privacy Policy is intended to state that a particular US state privacy statute applies to All Terra where the statutory applicability criteria have not been met.</p>
        <p className="mb-4">Requests may be submitted to <strong><a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></strong>.</p>
      </div>
    ),
  },
  {
    title: "India",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra has operations in India and processes personal data relating to individuals in India.</p>
        <p className="mb-4">We will apply the requirements of India's data protection framework to the extent those requirements are in force and applicable to the relevant processing.</p>
        <p className="mb-4">Individuals may contact <strong><a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></strong> regarding questions, concerns, or available rights concerning their personal data.</p>
      </div>
    ),
  },
  {
    title: "Zimbabwe",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra has operations in Zimbabwe.</p>
        <p className="mb-4">Where Zimbabwe's data protection requirements apply, we process and transfer relevant personal data subject to applicable requirements concerning lawful processing, security, retention, data-subject rights, and transborder data flows.</p>
        <p className="mb-4">Individuals may contact <strong><a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></strong> regarding their personal data.</p>
      </div>
    ),
  },
  {
    title: "Children",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Our investment services are intended only for persons who are <strong>18 years of age or older</strong>.</p>
        <p className="mb-4">We do not intend to onboard persons under 18 as investors.</p>
        <p className="mb-4">If we become aware that personal data has been provided in circumstances inconsistent with this age requirement, we may take appropriate steps to restrict the relevant account or interaction and address the information in accordance with applicable law.</p>
      </div>
    ),
  },
  {
    title: "Automated Processing",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra uses automated biometric matching as part of identity verification.</p>
        <p className="mb-4">The biometric matching process is used for KYC and identity verification. Biometric templates generated for the comparison are not retained after the verification process concludes.</p>
        <p className="mb-4">Except as otherwise specifically disclosed in connection with a particular process, this Privacy Policy does not state that All Terra makes investment eligibility or other decisions producing legal or similarly significant effects solely through automated biometric processing.</p>
      </div>
    ),
  },
  {
    title: "Marketing Communications",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">All Terra does not currently use the personal data covered by this Privacy Policy to send general email newsletters, SMS marketing, WhatsApp marketing, telephone marketing, or LinkedIn marketing communications.</p>
        <p className="mb-4">If our marketing practices materially change, we will assess the applicable notice, consent, opt-out, and policy requirements before implementing those changes and will update this Privacy Policy where appropriate.</p>
        <p className="mb-4">Operational or transaction-related communications are not treated as marketing merely because they relate to an existing enquiry, account, compliance process, or investment relationship.</p>
      </div>
    ),
  },
  {
    title: "Third-Party Websites and Services",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Our website may contain links to third-party websites, services, projects, or resources.</p>
        <p className="mb-4">Those third parties may process personal data under their own privacy practices. All Terra is not responsible for the privacy practices of an independent third party merely because its website or service is linked from our website.</p>
        <p className="mb-4">You should review the privacy information applicable to the relevant third-party service.</p>
      </div>
    ),
  },
  {
    title: "Changes to this Privacy Policy",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">We may update this Privacy Policy when our processing activities, services, technologies, legal requirements, or business operations change.</p>
        <p className="mb-4">When we make changes, we will update the effective date and publish the revised version through an appropriate location on our website.</p>
        <p className="mb-4">Where required by applicable law, we will provide additional notice or obtain a new consent before materially changed processing begins.</p>
      </div>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div className="text-gray-600 leading-relaxed text-sm">
        <p className="mb-4">Questions, requests, or concerns regarding this Privacy Policy or our handling of personal data may be directed to:</p>
        <p className="mb-4"><strong>All Terra Global</strong>\</p>
        <p className="mb-4">Dubai, United Arab Emirates</p>
        <p className="mb-4">Operations also maintained in:\</p>
        <p className="mb-4">Harare, Zimbabwe\</p>
        <p className="mb-4">New Jersey, United States\</p>
        <p className="mb-4">Mumbai, India</p>
        <p className="mb-4"><strong>Privacy Email:</strong> <a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></p>
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
        imageAlt="Privacy Policy"
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
              <p>All Terra Global ("All Terra", "we", "us", or "our") respects your privacy and is committed to handling personal data responsibly and in accordance with applicable data protection laws.</p>
              <p>This Privacy Policy explains how we collect, use, store, disclose, transfer, and protect personal data when you visit <strong>allterraglobal.com</strong>, create or use an account, make an investor enquiry, undergo investor onboarding or verification, access investment opportunities, or otherwise interact with All Terra Global.</p>
              <p>All Terra Global is incorporated in the United Arab Emirates and operates through offices in Dubai, UAE; Harare, Zimbabwe; New Jersey, USA; and Mumbai, India.</p>
              <p>For privacy questions or requests, contact:</p>
              <p><strong>Email:</strong> <a href="mailto:investments@allterraglobal.com" className="text-[#1C5244] hover:text-[#F8AB1D] transition-colors underline">investments@allterraglobal.com</a></p>
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
