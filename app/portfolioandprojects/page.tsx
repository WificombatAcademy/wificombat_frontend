import GeneralNavbar from "../components/general/GeneralNavbar";
import Footer from "@/app/components/general/Footer";
import { StudentsHero } from "@/app/components/StudentsComps/Overview/hero";
import { PortfolioBenefit } from "../components/PortfolioProject/keybenefit";
import { PortfolioEnhance } from "../components/PortfolioProject/portfolioEnhance";
import { Prepare } from "../components/PortfolioProject/prepare";
import { PortfolioManagement } from "../components/PortfolioProject/portfolioManagement";
export default function Page() {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            <GeneralNavbar />
            <StudentsHero 
      text="Portfolio_page.png"
      headerOne="Portfolio & Projects"
      headerTwo="The portfolio and project feature is a powerful tool designed to help students actively track, document, and showcase their entire learning and career development journey."
      bgColor="black"
      btnColor={false}
      textColor={false}
      />
      <PortfolioManagement/>
      <PortfolioBenefit/>
      <PortfolioEnhance/>
      <Prepare/>
      <Footer />
        </div>
    )
}