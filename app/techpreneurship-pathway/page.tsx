import { PathwayHero } from "../components/CodingPathwayComps/hero";
import { Outcomes } from "../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../components/CodingPathwayComps/why-coding";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import { outcomes } from "../utils/types-and-links";
import { TechprenuershipOnboarding } from "../components/OnboardingComps/techpreneurship-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero
      desc="Lorem ipsum dolor sit amet consectetur. Nunc et aenean imperdiet dignissim suspendisse in. Pretium ante adipiscing sed amet eget sed in. Parturient"
      header="Navigate the Techprenuership Career Pathway"
       bgColor="bg-yellow-500" 
       />
      <WhyCodingPathway
      images={["", "", ""]}
        headerOne="Why Techprenuership Pathway?"
        pOne="Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
        Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
        Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
        non odio sollicitudin viverra."
        pTwo="Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. Et amet nibh eget elit. 
      Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida quam erat amet amet velit. Velit 
      tortor vivamus aliquam at imperdiet commodo."
      />
      <PathwayRoadmap title="Techprenuership"/>
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
