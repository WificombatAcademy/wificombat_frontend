import HeadingDesign from "../general/HeaderDesign"

const outcomes = [
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
    {title: "lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet consectetur. Sed non tristique mi vulp"},
]


export const Outcomes = () => {
    return (
        <section>
            <HeadingDesign heading="learning outcomes" />
            <div className="mt-10 md:mt-16 mb-20 md:mb-28 w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex flex-col gap-10 lg:gap-16 xl:gap-24 md:flex-row md:items-center md:justify-between">

                <div className="w-full md:basis-[50%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="w-full md:basis-[50%]">
                    <div className="w-full h-[300px] rounded-2xl bg-primary-gray"></div>
                </div>
            </div>
        </section>
    )
}