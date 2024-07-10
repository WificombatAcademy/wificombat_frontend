import { CareerPathwayHero } from "../components/career-pathway-comps/career-pathway-hero";
import { WhyCareerPathway } from "../components/career-pathway-comps/why-career-pathway";
import Navbar from "../components/general/navbar";

export default function Page () {
    return (
        <div>
            <Navbar />
            <CareerPathwayHero />
            <WhyCareerPathway />
        </div>
    )
}