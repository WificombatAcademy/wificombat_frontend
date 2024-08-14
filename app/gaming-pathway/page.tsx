import { PathwayHero } from "../components/CodingPathwayComps/hero";
import { CodingOnboarding } from "../components/CodingPathwayComps/onboarding";
import { Outcomes } from "../components/CodingPathwayComps/outcomes";
import { CodingPathwayRoadmap } from "../components/CodingPathwayComps/pathway-roadmap";
import { StartCodingToday } from "../components/CodingPathwayComps/start-coding";
import { WhyCodingPathway } from "../components/CodingPathwayComps/why-coding";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import { gamingOutcomes, gamingPathwayImages } from "../utils/types-and-links";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PathwayHero image="/hero-2.png"  bgColor="bg-blue-300"/>
      <WhyCodingPathway images={gamingPathwayImages}
      headerOne="Why Gaming Pathway?"
      pOne="Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
        Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
        Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
        non odio sollicitudin viverra."
      pTwo="Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. Et amet nibh eget elit. 
      Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida quam erat amet amet velit. Velit 
      tortor vivamus aliquam at imperdiet commodo."/>
      <CodingPathwayRoadmap />
      <Outcomes outcomes={gamingOutcomes}/>
      <CodingOnboarding />
      <StartCodingToday/>
      <Footer />
    </div>
  );
}
