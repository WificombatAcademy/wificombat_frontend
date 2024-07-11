// import { GeneralNavbar } from "../components/General/general-nav";
import { CareerPathwayHero } from "../components/Career-Pathway-Comps/hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career";
import FixedNav from "../components/general/FixedNav";
import StaticNav from "../components/general/StaticNav";

export default function Page() {
  return (
    <div>
      <FixedNav />
      <StaticNav />
      <CareerPathwayHero />
      <WhyCareerPathway />
    </div>
  );
}
