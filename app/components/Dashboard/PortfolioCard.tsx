import { merriweather } from "@/app/fonts"
import Image from "next/image"
import { HeaderProps } from "./ReportCard"

const interests = [
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
    "Lorem ipsum dolor sit amet consectetur",
]

const PortoflioHeader = ({ children }: HeaderProps) => {
    return (
     <header className={`mt-9 md:mt-12 w-full py-3 px-4 md:px-6 lg:px-8 bg-blue-500 text-left text-white
      ${merriweather.className} text-lg md:text-xl font-bold capitalize`}>
         {children}
     </header>
    )
 }

export const PortfolioCard = () => {
    return (
        <section>
            <div className="my-8 md:my-10 w-[95%] md:w-[80%] lg:w-[70%] bg-white text-black-500 mx-auto">
                 {/* HEADER */}
                 <header className="w-full py-3 px-4 md:px-6 lg:px-8 bg-blue-500 text-white flex items-center justify-between">
                    <div className="basis-[30%] lg:basis-[35%]">
                        <Image
                            src={`/assets/auth/logo.svg`}
                            alt={`logo`}
                            width={93}
                            height={93}
                            className="w-[60px] my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
                    </div>

                    <div className="basis-[70%] lg:basis-[65%]">
                        <div className="w-fit">
                            <h2 className={`${merriweather.className} font-bold text-2xl lg:text-3xl`}>Grace Johnson</h2>
                            <h2 className="mt-1 font-semibold text-center">johnsongrace@gmail.com</h2>
                        </div>
                    </div>
                </header>
                {/* HEADER */}

                {/* STUDENT INFO */}
                <div className="px-5 lg:px-7">
                    <article>
                        <h2 className={`${merriweather.className} font-bold text-2xl lg:text-3xl mt-8`}>Bio</h2>
                        <p className="mt-3">
                        Lorem ipsum dolor sit amet consectetur. Cum orci potenti sed nisl massa orci. 
                        A amet magna convallis id urna proin pellentesque. Dui vestibulum nullam aliquam 
                        morbi blandit massa. Mattis quis viverra viverra viverra varius proin congue ipsum. 
                        Felis senectus aenean mattis odio.
                        </p>
                    </article>

                    <article>
                        <h2 className={`${merriweather.className} font-bold text-2xl lg:text-3xl mt-8`}>Interest</h2>
                        <ul className="mt-3 space-y-3 list-disc">
                            {interests.map((interest, index) => (
                                <li key={index} className="ml-4">
                                    {interest}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
                {/* STUDENT INFO */}

                {/* STUDENT PROGRESS */}
                <article>
                    <PortoflioHeader>
                        Student Progress
                    </PortoflioHeader>
                </article>
                {/* STUDENT PROGRESS */}
            </div>
        </section>
    )
}