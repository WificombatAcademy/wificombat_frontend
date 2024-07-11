
import { Catalog } from "../components/CareerPathwayComps/catalog";
import { CareerPathwayHero } from "../components/CareerPathwayComps/hero";
import { CareerPathwayCourses } from "../components/CareerPathwayComps/pathway-courses";
import { WhyCareerPathway } from "../components/CareerPathwayComps/why-career";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <CareerPathwayHero />
      <WhyCareerPathway />
      <CareerPathwayCourses />
      <Catalog />
      <Footer />
    </div>
  );
}
