import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { CurriculumCertification } from "@/app/components/StudentsComps/Curriculum/certification";
import { LearningOutcomes } from "@/app/components/StudentsComps/Curriculum/learning-outcomes";
import { CareerPathwayCurriculum } from "@/app/components/StudentsComps/Curriculum/pathway-curriculum";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero />
      <CareerPathwayCurriculum />
      <LearningOutcomes/>
      <CurriculumCertification />
      <Footer />
    </div>
  );
}
