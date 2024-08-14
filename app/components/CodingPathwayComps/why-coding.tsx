import Image from "next/image"

type Props = {
 images?: string[];
 headerOne: string;
 pOne: string;
 pTwo: string;
}


export const WhyCodingPathway = ({images, headerOne, pOne, pTwo}:Props) => {
    return (
        <section>
            <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto mb-16">
                <h3 className="mt-12 md:mt-16 font-semibold text-2xl md:text-3xl lg:text-4xl">{headerOne}</h3>
                <p className="mt-8">{pOne}</p>
                <p className="mt-8">{pTwo}</p>

                 <div className="mt-9 md:mt-16 flex flex-col md:flex-row justify-center gap-9 xl:gap-12">
                    {images &&
                    images.map((image, index) => (
                        <div
                        key={index}
                        className={` relative w-[8rem] h-[8rem] md:w-[15rem] md:h-[15rem] lg:w-[19rem] lg:h-[22rem] `}>
                            <div className={` polygon w-full h-full bg-primary-gray `}>
                            {image ? (
                                <Image
                                src={image}
                                alt="skill"
                                width={414}
                                height={427}
                                className="w-full h-full object-cover"
                                />
                            ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}