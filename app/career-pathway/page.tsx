
import { CareerPathwayHero } from "../components/CareerPathwayComps/hero";
import { WhyCareerPathway } from "../components/CareerPathwayComps/why-career";
import GeneralNavbar from "../components/general/GeneralNavbar";

export default function Page() {
  return (
    <div>
      <GeneralNavbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
