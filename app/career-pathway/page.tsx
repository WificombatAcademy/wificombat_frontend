import { CareerPathwayHero } from "../components/Career-Pathway-Comps/hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career";
import Navbar from "../components/General/general-navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
