import { GeneralNavbar } from "../components/General/general-nav";
import { CareerPathwayHero } from "../components/Career-Pathway-Comps/hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career";

export default function Page() {
  return (
    <div>
      <GeneralNavbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
