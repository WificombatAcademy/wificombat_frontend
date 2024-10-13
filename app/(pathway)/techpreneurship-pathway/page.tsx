"use client"

import { PathwayHero } from "../../components/CodingPathwayComps/hero";
import { Outcomes } from "../../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../../components/CodingPathwayComps/why-coding";
import Footer from "../../components/general/Footer";
import GeneralNavbar from "../../components/general/GeneralNavbar";
import { outcomes, techpreneurshipSteps } from "../../utils/types-and-links";
import { TechprenuershipOnboarding } from "../../components/OnboardingComps/techpreneurship-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
      image="/hero-6.png"
      widthStyle="w-full object-contain"
      desc="Lorem ipsum dolor sit amet consectetur. Nunc et aenean imperdiet dignissim suspendisse in. Pretium ante adipiscing sed amet eget sed in. Parturient"
      header="Navigate the Techprenuership Career Pathway"
       bgColor="bg-yellow-500" 
       />
      <WhyCodingPathway
      // images={["", "", ""]}
      pathwayImage="/assets/pathway/tech-pathway.png"
        headerOne="Why Techprenuership Pathway?"
        pOne="The Techpreneurship Pathway on our WiFiCombat eLearn platform equips students 
        with the skills and mindset needed to become innovators and entrepreneurs in the 
        tech industry. Through this pathway, students learn how to identify market opportunities, 
        develop tech-based solutions, and build sustainable business models. "

        pTwo="They also gain practical knowledge in areas such as product development, 
        digital marketing, and startup management. By combining technology with entrepreneurship, 
        this pathway empowers students to not only create new tech products but also to understand 
        the business strategies behind successful ventures. It fosters creativity, leadership, and 
        resilience, preparing students to launch their own tech startups and shape the future of innovation "
      />
      <PathwayRoadmap title="Techprenuership" steps={techpreneurshipSteps}/>
      <Outcomes outcomes={outcomes} />
      <TechprenuershipOnboarding />
      <TodayComp 
      desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis." 
      header="Start Learning About Techprenuership Today!" 
      linkto="/schools/pricing-plan" />
      <Footer />
    </div>
  );
}
