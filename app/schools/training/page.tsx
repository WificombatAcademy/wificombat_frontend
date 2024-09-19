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
      <StudentsHero 
      text=""
      headerOne="Lorem ipsum dolor sit amet consectetur."
      headerTwo="Lorem ipsum dolor sit amet consectetur. A integer viverra libero sit. Adipiscing vel 
      at non platea posuere massa porttitor. Viverra purus luctus posuere massa neque laoreet sed viverra."
      bgColor={true}/>
      <Impact />
      <FAQ noSpace/>
      <JoinOtherSchools />
      <Footer />
    </div>
  );
}