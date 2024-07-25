import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
import Impact from "@/app/components/Home/Impact";
import { IntroducingCareerPath } from "@/app/components/StudentsComps/Overview/career-path";
import { EmpowerLearningJourney } from "@/app/components/StudentsComps/Overview/empower-journey";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";
import { TechSkill } from "@/app/components/StudentsComps/Overview/learn-tech-skill";
import { PricingPlan } from "@/app/components/StudentsComps/Overview/pricing";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero />
      <TechSkill />
      <EmpowerLearningJourney />
      <IntroducingCareerPath />
      <PricingPlan/>
      <Impact />
      <FAQ noSpace={true}/>
      <Footer />
    </div>
  );
}