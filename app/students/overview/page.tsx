import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import Impact from "@/app/components/Home/Impact";
import { StudentsHero } from "@/app/components/StudentsComps/hero";
import { TechSkill } from "@/app/components/StudentsComps/learn-tech-skill";


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