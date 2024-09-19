import { OnboardingCard } from "../Home/onboarding-card"

export const FeaturesOnboarding = () => {
    return (
        <div className="w-[93%] md:w-[80%] lg:w-[85%] mx-auto mt-20 mb-24 space-y-9 md:space-y-32 lg:space-y-40">
            <OnboardingCard
            pinkBg={true}
            title="Gamification Elements"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            image="/gamification-element.png"
            imageWidth={412}
            imageHeight={303}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Portfolio Support Platform"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            reverse={true}
            image="/portfolio-support.png"
            imageWidth={393}
            imageHeight={291}/>

            <OnboardingCard
            pinkBg={true}
            title="Cutting Edge Curriculum"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            image="/diverse-edge-curriculum.png"
            imageWidth={446}
            imageHeight={328}
            />

            <OnboardingCard
            pinkBg={true} 
            title="Techprenuership Mentorship"
            desc="Massa cursus at mauris in. Blandit scelerisque at varius enim turpis. Felis diam morbi tellus ut eget. 
            Risus commodo et nisi lobortis ipsum in metus ullamcorper. Vestibulum lacus consectetur aliquam sit dignissim 
            mattis eleifend facilisis laoreet."
            reverse={true}
            image="/teen-girl.png"
            imageWidth={192}
            imageHeight={460}
            widthStyle="max-md:h-[100%]"/>

        </div>
    )
}