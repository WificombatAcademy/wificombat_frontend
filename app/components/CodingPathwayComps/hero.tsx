import { merriweather } from "@/app/fonts"
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import Cart from "@/app/utils/cart";
import Image from "next/image"
import Link from "next/link"

type Props = {
    bgColor: string;
    image?: string;
    header: string;
    desc: string;
    buttonWhite?:boolean;
    widthStyle?: string;
}

export const PathwayHero = ({bgColor, image, desc, header, buttonWhite, widthStyle}: Props) => {
    return (
        <section 
        id="home"
        className="text-white">
            <div className={`relative isolate overflow-hidden pb-[2rem] lg:pb-[7rem] 
                md:py-[7rem] lg:py-[10rem] ${bgColor}`}>
                <Cart/>
                <div className="relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto 
                max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] flex flex-col md:flex-row md:items-center gap-10">
                    <div className="w-full md:basis-[50%] relative">
                        <Breadcrumbs homeLabel="Home" />
                        <h1 className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:mt-8`}>
                            {header}
                        </h1>

                        <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                        {desc} 
                        </p>
                        
                        <div className="mt-10 lg:mt-16"> 
                            <>
                            <Link 
                            href={`/registration`}
                            className={`${buttonWhite ? "bg-white text-black-500" :
                                "bg-[#131314] text-white focus-visible:outline-black"} 
                                rounded-lg px-16 py-5 font-medium  shadow-sm 
                               hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                               focus-visible:outline-offset-2 `}
                            >
                                Register
                            </Link>
                            </>
                        </div>
                    </div>

                    <div className="w-full md:basis-[50%] max-md:h-[350px]
                        max-md:flex max-md:items-center max-md:justify-center">
                        {image && 
                        <Image 
                        src={image ?? ""}
                        alt={image ?? ""}
                        width={500}
                        height={500}
                        className={`object-contain ${widthStyle ?? "w-full h-full"} border-none`}
                        />}
                    </div>
                </div>
            </div>
        </section>
    )
}