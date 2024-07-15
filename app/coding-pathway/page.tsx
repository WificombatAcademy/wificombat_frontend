import { CodingPathwayHero } from "../components/CodingPathwayComps/hero";
import { CodingOnboarding } from "../components/CodingPathwayComps/onboarding";
import { Outcomes } from "../components/CodingPathwayComps/outcomes";
import { CodingPathwayRoadmap } from "../components/CodingPathwayComps/pathway-roadmap";
import { StartCodingToday } from "../components/CodingPathwayComps/start-coding";
import { WhyCodingPathway } from "../components/CodingPathwayComps/why-coding";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <CodingPathwayHero />
      <WhyCodingPathway/>
      <CodingPathwayRoadmap />
      <Outcomes />
      <CodingOnboarding />
      <StartCodingToday/>
      <Footer />
    </div>
  );
}
