import { PathwayHero } from "@/app/components/CodingPathwayComps/hero";
import { Outcomes } from "@/app/components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "@/app/components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "@/app/components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "@/app/components/CodingPathwayComps/why-coding";
import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { AIOnboarding } from "@/app/components/OnboardingComps/ai-onboarding";
import { outcomes } from "@/app/utils/types-and-links";


export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
      desc="Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway."
      header="Navigate the AI Career Pathway"
       bgColor="bg-black-500" 
       buttonWhite/>
      <WhyCodingPathway
      images={["", "", ""]}
        headerOne="Why Artifical Intelligence Pathway?"
        pOne="Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
        Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
        Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
        non odio sollicitudin viverra."
        pTwo="Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. Et amet nibh eget elit. 
      Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida quam erat amet amet velit. Velit 
      tortor vivamus aliquam at imperdiet commodo."
      />
      <PathwayRoadmap title="Artifical Intelligence"/>
      <Outcomes outcomes={outcomes} />
      <AIOnboarding />
      <TodayComp 
      desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis." 
      header="Start Learning Artifical Intelligence Today!" 
      linkto="/schools/pricing-plan" />
      <Footer />
    </div>
  );
}
