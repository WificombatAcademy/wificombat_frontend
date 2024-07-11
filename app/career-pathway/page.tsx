// import { GeneralNavbar } from "../components/General/general-nav";
import { CareerPathwayHero } from "../components/Career-Pathway-Comps/hero";
import { WhyCareerPathway } from "../components/Career-Pathway-Comps/why-career";
import FixedNav from "../components/General/fixed-nav";
import StaticNav from "../components/General/static-nav";

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
