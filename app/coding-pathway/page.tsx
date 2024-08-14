import { PathwayHero } from "../components/CodingPathwayComps/hero";
import { CodingOnboarding } from "../components/CodingPathwayComps/onboarding";
import { Outcomes } from "../components/CodingPathwayComps/outcomes";
import { CodingPathwayRoadmap } from "../components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "../components/CodingPathwayComps/why-coding";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import { codingOutcomes, codingPathwayImages } from "../utils/types-and-links";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero image="/hero-1.png" bgColor="bg-blue-500" />
      <WhyCodingPathway
        images={codingPathwayImages}
        headerOne="Why Coding Pathway?"
        pOne="Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
        Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
        Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
        non odio sollicitudin viverra."
        pTwo="Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. Et amet nibh eget elit. 
      Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida quam erat amet amet velit. Velit 
      tortor vivamus aliquam at imperdiet commodo."
      />
      <CodingPathwayRoadmap />
      <Outcomes outcomes={codingOutcomes} />
      <CodingOnboarding />
      <TodayComp 
      header="Start Coding Today"
      desc="Lorem ipsum dolor sit amet consectetur. Senectus in 
           consequat egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis."
      linkto="/schools/pricing-plan"/>
      <Footer />
    </div>
  );
}
