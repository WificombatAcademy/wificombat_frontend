// import { GeneralNavbar } from "../components/General/general-nav";
import { CareerPathwayHero } from "../components/CareerPathwayComps/hero";
import { WhyCareerPathway } from "../components/CareerPathwayComps/why-career";
import FixedNav from "../components/General/FixedNav";
import StaticNav from "../components/General/StaticNav";

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
