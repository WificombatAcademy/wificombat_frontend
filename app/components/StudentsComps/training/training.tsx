import Image from "next/image"
import HeadingDesign from "../../general/HeaderDesign"

const training =  [
    "Access to engaging and interactive lessons",
    "Teachers can track student progress",
    "Students can explore a variety of career pathways",
    "Learn from experienced educators",
    "Engage in interactive learning activities",
    "Access personalized support"
  ]

export const Training = () => {
    return (
        <section>
            <HeadingDesign heading="WIFICOMBAT E-LEARN FOR TEACHERS"/>

            <div className="mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex flex-col 
            lg:flex-row lg:items-center lg:justify-center gap-10 md:gap-14 xl:gap-32">
                <div className="flex flex-col items-center justify-center">

                    <div className="relative md:top-8 w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem]">
                        <div className="polygon w-full h-full">
                            <Image 
                            src={`/teach-and-learn-1.png`}
                            alt="skill"
                            width={414}
                            height={427}
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex gap-7 items-center justify-center">
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <h4 className="font-semibold mb-2 whitespace-nowrap text-black-500 text-2xl md:text-3xl">Collaborative Learning Experience</h4>
                    {training.map((list, index) => (
                      <div key={index} className="flex whitespace-nowrap gap-2 list-none">
            
                        <p className="md:w-[80%] text-black-500 md:text-lg ml-4">{list}</p>
                      </div>
                    ))}
                </div>
            </div>
        </section>
    )
}