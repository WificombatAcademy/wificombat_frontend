import { OnboardingCard } from "../Home/onboarding-card"

export const FeaturesOnboarding = () => {
    return (
        <div className="w-[93%] md:w-[80%] lg:w-[85%] mx-auto mt-20 mb-24 space-y-9 md:space-y-32 lg:space-y-40">
            <OnboardingCard
            title="Gamification Elements"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            />

            <OnboardingCard 
            title="Portfolio Support Platform"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            reverse={true}/>

            <OnboardingCard
            title="Cutting Edge Curriculum"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            />

            <OnboardingCard 
            title="Techprenuership Mentorship"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            reverse={true}/>

        </div>
    )
}