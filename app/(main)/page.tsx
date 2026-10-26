import Contact from "@/components/homepage/Contact";
import GlobalPresence from "@/components/homepage/GlobalPresence";
import Hero from "@/components/homepage/HeroSection";
import InvestmentJourneySplitView from "@/components/homepage/InvestmentJourneyV4";
import Opportunities from "@/components/homepage/Opportunities";
import AllTerrasEdge from "@/components/homepage/OurEdgeV3";
import Sectors from "@/components/homepage/Sectors_old";
import Statistics from "@/components/homepage/Statistics";
import TeamSection from "@/components/homepage/TeamSection";
import WhatWeDo from "@/components/homepage/WhatWeDo";
import WhyZimbabwe from "@/components/homepage/WhyZimbabwe";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Sectors />
      <Statistics />
      <WhyZimbabwe />
      <InvestmentJourneySplitView />
      <AllTerrasEdge />
      <GlobalPresence />
      <Opportunities />
      <TeamSection />

      <Contact />
    </>
  );
}
