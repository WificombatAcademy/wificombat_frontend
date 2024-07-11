import { CareerPathwayHero } from "../components/Career-Pathway-Comps/hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career";
import GeneralNav from "../components/General/general-nav"

export default function Page() {
  return (
    <div>
      <GeneralNav />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
