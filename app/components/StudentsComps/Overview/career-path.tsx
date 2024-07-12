import HeadingDesign from "../../general/headingDesign"
import { CurriculumCard } from "../../Home/curriculum-card"

export const IntroducingCareerPath = () => {
    return (
        <section>
            <HeadingDesign heading="introducing career path" />

            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
                <p className="md:w-[88%] mx-auto mt-6 md:mt-9 lg:mt-12 md:text-2xl text-center font-medium">
                Lorem ipsum dolor sit amet consectetur. A ornare rhoncus ipsum
                consequat facilisis maecenas bibendum euismod velit. Purus com
                </p>

                <div className="mt-14 md:mt-24 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-9">
                    <CurriculumCard
                        borderColor="border-purple-500"
                        bgColor="bg-purple-50"
                        title="Begineer (Level 1)"
                    />
                    <CurriculumCard
                        borderColor="border-blue-500"
                        bgColor="bg-blue-50"
                        title="Begineer (Level 2)"
                    />
                    <CurriculumCard
                        borderColor="border-yellow-500"
                        bgColor="bg-yellow-50"
                        title="Intermediate"
                    />
                </div>
            </div>
        </section>
    )
}