import { OnboardingCard } from "../Home/onboarding-card"

export const RoboticsOnboarding = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-20 space-y-9 md:space-y-32 lg:space-y-40">
                <OnboardingCard 
                checkmark
                title={"\"Let's Build Something Awesome!\""}
                listdesc={[
                    "Gravida ultrices integer massa eget ut ipsum n.",
                    "Viverra et dui quis interdum eu pulvinar viverra.",
                    "Phasellus eget leo vitae egestas tincidunt vi.",
                    "Lectus mauris enim praesent scelerisque ultr.",]}
                reverse={true}
                />

                <OnboardingCard 
                checkmark
                title="Robotics Tools & Resources"
                listdesc={[
                    "Gravida ultrices integer massa eget ut ipsum n.",
                    "Viverra et dui quis interdum eu pulvinar viverra.",
                    "Phasellus eget leo vitae egestas tincidunt vi.",
                    "Lectus mauris enim praesent scelerisque ultr.",]}
                />
            </div>
        </section>
    )
}