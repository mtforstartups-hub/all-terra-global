import Contact from "@/components/homepage/Contact";
import GlobalPresence from "@/components/homepage/GlobalPresence";
import Hero from "@/components/homepage/HeroSection";
// import InvestmentJourneyV2 from "@/components/homepage/InvestmentJourneyV2";
import InvestmentJourneyV3 from "@/components/homepage/InvestmentJourneyV3";
import InvestmentJourneySplitView from "@/components/homepage/InvestmentJourneyV4";
import Opportunities from "@/components/homepage/Opportunities";
// import OurEdgeV2 from "@/components/homepage/OurEdgeV2";
import AllTerrasEdge from "@/components/homepage/OurEdgeV3";
import Sectors from "@/components/homepage/Sectors_old";
import Statistics from "@/components/homepage/Statistics";
import TeamSection from "@/components/homepage/TeamSection";
// import TestimonialsMarquee from "@/components/homepage/TestimonialsMarquee";
import WhatWeDo from "@/components/homepage/WhatWeDo";
// import WhyZim from "@/components/homepage/WhyZim";
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
      {/* <InvestmentJourneyV3 /> */}
      {/* <InvestmentJourneyV2 /> */}
      {/* <OurEdgeV2 /> */}
      <AllTerrasEdge />
      <GlobalPresence />
      {/* <TestimonialsMarquee /> */}
      <Opportunities />
      <TeamSection />

      <Contact />
    </>
  );
}
