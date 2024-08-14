import { merriweather } from "@/app/fonts";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import Link from "next/link"

type Props = {
    bgColor ?: boolean;
    headerOne: string;
    headerTwo: string;
    whiteButton?: boolean;
}

export const StudentsHero = ({bgColor, headerOne, headerTwo, whiteButton}: Props) => {
    return (
        <section 
        id="home"
        className="text-white">
            <div className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] ${bgColor ?  "bg-blue-500" : "bg-purple-500"}`}>
                <div className={`relative max-lg:mt-[5rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                    flex flex-col md:flex-row md:items-center md:justify-between gap-10`}>
                    <div className="w-full md:basis-[50%] relative">
                        <Breadcrumbs homeLabel="Home"/>
                        <h1 className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:pt-3`}>
                            {headerOne}
                        </h1>

                        <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                            {headerTwo}
                        </p>
                        
                        <div className="mt-10 lg:mt-16"> 
                            <>
                            <Link 
                            href={`/registration`}
                            className="px-16 py-5 font-medium text-white shadow-sm bg-black-500 rounded-lg 
                            transition duration-300 hover:bg-opacity-90">
                                Register
                            </Link>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}