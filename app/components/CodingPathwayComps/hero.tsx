import { merriweather } from "@/app/fonts"
import Image from "next/image"
import Link from "next/link"

type Props = {
    bgColor: string;
    image?: string;
}

export const PathwayHero = ({bgColor, image}: Props) => {
    return (
        <section 
        id="home"
        className="text-white">
            <div className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] ${bgColor}`}>
                <div className="relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto h-[16rem] xl:h-[20rem] 2xl:h-[24rem] flex flex-col md:flex-row md:items-center gap-10">
                    <div className="w-full md:basis-[50%]">
                        <h1 className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold`}>
                            Discover Your Coding Career Pathway
                        </h1>

                        <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                        Turn your passion for technology into a thriving career in software engineering or DevOps. 
                        Begin your path with us 
                        </p>
                        
                        <div className="mt-10 lg:mt-16"> 
                            <>
                            <Link 
                            href={`/registration`}
                            className="px-16 py-5 font-medium text-white shadow-sm bg-black-500 rounded-lg transition duration-300 hover:bg-opacity-90">
                                Register
                            </Link>
                            </>
                        </div>
                    </div>

                    <div className="w-full md:basis-[50%] max-md:hidden">
                        {image && 
                        <Image 
                        src={image ?? ""}
                        alt={image ?? ""}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover border-none"
                        />}
                    </div>
                </div>
            </div>
        </section>
    )
}