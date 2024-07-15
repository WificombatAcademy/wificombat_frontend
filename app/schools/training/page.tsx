import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
import Impact from "@/app/components/Home/Impact";
import { JoinOtherSchools } from "@/app/components/SchoolsComps/Overview/other-schools";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero bgColor={true}/>
      <Impact />
      <FAQ noSpace/>
      <JoinOtherSchools />
      <Footer />
    </div>
  );
}