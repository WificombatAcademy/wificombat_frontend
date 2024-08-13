import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { DesignedAndBuilt } from "@/app/components/SchoolsComps/Curriculum/designed-built";
import { ExplorePricingPlan } from "@/app/components/SchoolsComps/Curriculum/explore-pricing";
import { LearningOutcomes } from "@/app/components/StudentsComps/Curriculum/learning-outcomes";
import { CareerPathwayCurriculum } from "@/app/components/StudentsComps/Curriculum/pathway-curriculum";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
       headerOne="Lorem ipsum dolor sit amet consectetur."
       headerTwo="Lorem ipsum dolor sit amet consectetur. A integer viverra libero sit. Adipiscing vel 
       at non platea posuere massa porttitor. Viverra purus luctus posuere massa neque laoreet sed viverra."
      bgColor={true}/>
      <CareerPathwayCurriculum schoolCurriculum/>
      <LearningOutcomes/>
      <DesignedAndBuilt />
      <ExplorePricingPlan />
      <Footer />
    </div>
  );
}
