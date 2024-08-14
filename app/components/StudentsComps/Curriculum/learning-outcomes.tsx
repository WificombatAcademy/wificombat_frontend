import HeadingDesign from "../../general/HeaderDesign"

const outcomes = [
    {title: "Proficiency in Programming Languages", desc: "Develop strong coding skills in at least one major programming language."},
    {title: "Game Development Skills", desc: "Understand game design principles and gain experience with game engines like Unity or Unreal Engine."},
    {title: "Multimedia Design Expertise", desc: "Master multimedia tools such as Adobe Creative Suite to create and edit digital content."},
    {title: "AI Application and Ethics", desc: "Apply AI techniques to real-world problems and understand the ethical implications of AI."},
    {title: "IoT Systems Knowledge", desc: "Design and program IoT devices, focusing on hardware interfacing and data analysis."},
    {title: "Robotics Programming and Integration", desc: "Learn to program robots and integrate sensors for autonomous systems."},
    {title: "Project-Based Learning", desc: "Apply interdisciplinary knowledge to complete real-world tech projects."},
    {title: "Critical Thinking and Innovation", desc: "Develop critical thinking skills to solve complex problems across various tech domains."},
]

export const LearningOutcomes = () => {
    return (
        <section>
            <HeadingDesign heading="learning outcomes"/>

            <div className="mt-8 w-[93%] md:w-[90%] lg:w-[88%] mx-auto md:mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {outcomes.map((outcome, index) => (
                    <div 
                    key={index}
                    className="w-full text-center"
                    >
                       <div className="w-full flex items-center">
                            <div className="w-16 h-16 mx-auto bg-black-200 rounded-full"></div>
                        </div> 

                        <h3 className="mt-4 font-semibold text-lg md:text-2xl">{outcome.title}</h3>
                        <p className="mt-4">{outcome.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}