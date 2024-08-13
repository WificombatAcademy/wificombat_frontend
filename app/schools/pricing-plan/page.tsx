import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { HaveAccessTo } from "@/app/components/PricingComps/have-access";
import { PricingPlan } from "@/app/components/StudentsComps/Overview/pricing";

export default function Page() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PricingPlan pricingPage={true}/>
      {/* <HaveAccessTo /> */}
      <Footer />
    </div>
  );
}
