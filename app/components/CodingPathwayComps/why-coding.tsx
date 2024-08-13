import Image from "next/image"

const pathwayImages = [
    "/assets/pathway/coding-pathway-1.png",
    "/assets/pathway/coding-pathway-2.png",
    "/assets/pathway/coding-pathway-3.png",
]

export const WhyCodingPathway = () => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-16">
                <h3 className="mt-12 md:mt-16 font-semibold text-2xl md:text-3xl lg:text-4xl">Why Coding Pathway?</h3>
                <p className="mt-8">Duis vitae placerat leo tincidunt pellentesque dui ultricies turpis phasellus. 
                Ullamcorper mollis sit amet sit lorem nam imperdiet in. Orci pharetra integer egestas non pharetra quis. 
                Mauris tortor suspendisse pellentesque elementum amet non mus ipsum egestas. Enim sodales nibh quam sed 
                non odio sollicitudin viverra.</p>
                <p className="mt-8">Vestibulum morbi turpis facilisi fringilla pretium venenatis purus cursus sit. 
                    Et amet nibh eget elit. Lacus ante lorem vulputate sollicitudin nunc viverra tortor. Quis gravida 
                    quam erat amet amet velit. Velit tortor vivamus aliquam at imperdiet commodo.</p>

                 <div className="mt-9 md:mt-16 flex flex-col md:flex-row justify-center gap-9 xl:gap-12">
                    {pathwayImages.map((image, index) => (
                        <div
                        key={index}
                        className="relative w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem] lg:w-[19rem] lg:h-[22rem]">
                            <div className="polygon w-full h-full">
                                <Image 
                                src={image}
                                alt="skill"
                                width={414}
                                height={427}
                                className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}