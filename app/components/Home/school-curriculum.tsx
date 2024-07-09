import { Design } from "../general/header-design"
import { CurriculumCard } from "./curriculum-card"
import { Onboarding } from "./onboarding"

export const SchoolCurriculum = () => {
    return (
        <section  className="relative">
           <Design title={"CAREER PATHWAY SCHOOL CURRICULUM"}/>


           <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
                <p className="md:w-[80%] lg:w-[70%] mx-auto mt-6 md:mt-9 lg:mt-12 text-center font-medium">
                Lorem ipsum dolor sit amet consectetur. Facilisis arcu adipiscing mi ullamcorper. A aliquet non pellentesque 
                vulputate. Malesuada ac lacus commodo orci nunc nascetur ac sapien. Dignissim ut fames eros est volutpat. 
                Eu in euismod elit dui. Arcu aliquet nunc ali.
                </p>

                <div className="mt-14 md:mt-24 mb-20 md:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-9">
                    <CurriculumCard borderColor="border-purple-500" bgColor="bg-purple-50" title="Elementary"/>
                    <CurriculumCard borderColor="border-blue-500" bgColor="bg-blue-50" title="Junior High School"/>
                    <CurriculumCard borderColor="border-yellow-500" bgColor="bg-yellow-50" title="Senior High School"/>
                </div>

                <div className="md:w-[90%] mx-auto">
                    <Onboarding />
                </div>
           </div>

        </section>
    )
}