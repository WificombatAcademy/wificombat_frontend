import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "../components/Home/faq";
import { FeaturesHero } from "../components/FeaturesComps/hero";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <FeaturesHero/>
      <FAQ noSpace={true}/>
      <Footer />
    </div>
  );
}