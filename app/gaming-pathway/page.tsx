import { PathwayHero } from "../components/CodingPathwayComps/hero";
import { Outcomes } from "../components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../components/CodingPathwayComps/why-coding";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import { gamingOutcomes, gamingPathwayImages } from "../utils/types-and-links";
import { GamingOnboarding } from "../components/OnboardingComps/gaming-onboarding";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero image="/hero-2.png" bgColor="bg-blue-300" 
      header="Shape Your Gaming Career Pathway"
      desc="Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway"/>
      <WhyCodingPathway
        images={gamingPathwayImages}
        headerOne="Why Gaming Pathway?"
        pOne="Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
        Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
        Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
        non odio sollicitudin viverra."
        pTwo="Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. Et amet nibh eget elit. 
      Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida quam erat amet amet velit. Velit 
      tortor vivamus aliquam at imperdiet commodo."
      />
      <PathwayRoadmap title="Gaming"/>
      <Outcomes outcomes={gamingOutcomes} />
      <GamingOnboarding />
      <TodayComp 
      desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis." 
      header="Start Building Your Own Games Today!" 
      linkto="/schools/pricing-plan" />
      <Footer />
    </div>
  );
}
