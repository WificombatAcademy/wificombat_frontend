import { CareerPathwayHero } from "../components/Career-Pathway-Comps/career-pathway-hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career-pathway";
import Navbar from "../components/General/navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
