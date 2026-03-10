import PageHero from "@/components/shared/PageHero";
import PageCta from "@/components/shared/PageCta";
import Mission from "@/components/about/Mission";
import Values from "@/components/about/Values";
import Timeline from "@/components/about/Timeline";
import GlobalPresence from "@/components/about/GlobalPresence";

export default function About() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Bridging Global Capital with African Opportunity"
        description="All Terra is an alternative investment and financing firm focused on deploying structured capital into asset-backed, high-yield opportunities across Africa."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern architecture"
      />
      <Mission />
      <Values />
      {/* <Timeline /> */}
      <GlobalPresence />
      <PageCta
        title="Ready to Explore Investment Opportunities?"
        description="Join us in unlocking high-yield opportunities across African markets."
        variant="green"
        primaryButton={{ text: "View Opportunities", href: "/opportunities" }}
        secondaryButton={{ text: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
