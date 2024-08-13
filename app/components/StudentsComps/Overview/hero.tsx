import { merriweather } from "@/app/fonts";
import Link from "next/link"

type Props = {
    bgColor ?: boolean;
}

export const StudentsHero = ({bgColor}: Props) => {
    return (
        <section 
        id="home"
        className="text-white">
            <div className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] ${bgColor ?  "bg-blue-500" : "bg-purple-500"}`}>
                <div className={`relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                    flex flex-col md:flex-row md:items-center md:justify-between gap-10`}>
                    <div className="w-full md:basis-[50%]">
                        <h1 className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold`}>
                            Empower K-12 Students with Tech Pathways.
                        </h1>

                        <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                        Join a global network of schools offering top-notch education in coding, multimedia design, AI, 
                        gaming, robotics, and IoT. Our platform provides the curriculum, tools, and guidance to help students 
                        apply their skills and thrive in diverse tech industries. 
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