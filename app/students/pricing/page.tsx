import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { FAQ } from "@/app/components/Home/faq";
import { PricingFeatures } from "@/app/components/PricingComps/pricing-features";
import { PricingPlan } from "@/app/components/StudentsComps/Overview/pricing";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />
      <PricingPlan pricingPage={true}/>
      <PricingFeatures />
      <FAQ noSpace={true}/>
      <Footer />
    </div>
    </Suspense>
  );
}