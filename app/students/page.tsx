import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Impact from "../components/Home/Impact";
import { StudentsHero } from "../components/StudentsComps/hero";
import { TechSkill } from "../components/StudentsComps/learn-tech-skill";

export default function Page () {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            <GeneralNavbar />
            <StudentsHero />
            <TechSkill />
            <Impact />
            <Footer />
        </div>
    )
}