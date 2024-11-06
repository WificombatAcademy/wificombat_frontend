import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
// import { Breadcrumbs } from "@/app/utils/breadcrumb";
import Impact from "@/app/components/Home/Impact";
import { JoinOtherSchools } from "@/app/components/SchoolsComps/Overview/other-schools";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <StudentsHero 
      text="school-training.png"
      headerOne="WiFiCombat eLearn: Empowering Teachers to Transform Education"
      headerTwo="At WiFiCombat eLearn, we believe that teachers are at the heart of the learning experience. Our platform is designed not 
       only to enrich students but also to provide teachers with powerful tools, resources, and support to enhance their teaching journey."
      bgColor={true}
      />
      <Impact />
      <FAQ noSpace/>
      <JoinOtherSchools />
      <Footer />
    </div>
  );
}