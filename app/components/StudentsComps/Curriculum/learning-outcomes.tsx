import HeadingDesign from "../../general/HeaderDesign"

const outcomes = [
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
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