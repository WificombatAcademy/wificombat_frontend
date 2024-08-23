"use client"
import { merriweather } from "@/app/fonts"
import Image from "next/image"
import { HeaderProps } from "./ReportCard"
import { ProgressCircle } from "@/app/utils/progress-bar"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { LuCalendarDays } from "react-icons/lu";
import { FaLink } from "react-icons/fa6"
import Link from "next/link"

type PortfolioCardProps = {
    title: string;
    desc: string;
}

const names = ["Gladys", "Victoria", "Colleen", "Esther", "Angel", "Philip"]
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

 const Card = ({ title, desc, }: PortfolioCardProps) => {
    return (
        <article className="relative w-full py-8 px-4 md:px-8 flex flex-col
        border border-black-200 rounded-xl">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm mt-3">
                {desc}
            </p>

            <div className="mt-4 text-sm flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                    <HiOutlineUserGroup />
                    <h4>Team Members: {""}</h4>
                </div>  
                <div className="flex flex-wrap gap-2 items-center">
                {names.map((memberName) => (
                     <h3 key={memberName}>
                        {memberName}
                     </h3>
                    ))}
                </div>
            </div>

            <div className="mt-4 text-sm flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                    <LuCalendarDays />
                    <h4>03/06/2024 {""}</h4>
                </div> 

                <div className="flex items-center gap-2">
                    <FaLink />
                    <Link href={`https://grace.project.64.764.com`} className="text-blue-500">
                        https://grace.project.64.764.com
                    </Link>
                </div> 
            </div>
        </article>
    )
}

export const PortfolioCard = () => {
    // const [progress, setProgress] = useState(65);
    return (
        <section>
            <div className="my-8 md:my-10 w-[95%] bg-white text-black-500 mx-auto ">
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
                    {/* STUDENT INFO */}

                    {/* STUDENT PROGRESS */}
                    <article>
                        <PortoflioHeader>
                            Student Progress
                        </PortoflioHeader>

                        <main  className="mt-10 grid grid-cols-2 lg:grid-cols-4">
                            <ProgressCircle title="Quizzes" value={24} progress={40} size={150} strokeWidth={15} />
                            <ProgressCircle title="Assignment" value={12} progress={60} size={150} strokeWidth={15} />
                            <ProgressCircle title="Certificate" value={4} progress={55} size={150} strokeWidth={15} />
                            <ProgressCircle title="Projects" value={6} progress={40} size={150} strokeWidth={15} />
                        </main>
                    </article>
                    {/* STUDENT PROGRESS */}

                    {/* PROJECTS */}
                    <article>
                        <PortoflioHeader>
                            Projects
                        </PortoflioHeader>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="Financial Mobile App"
                            />

                            <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="Financial Mobile App"
                            />
                        </div>
                    </article>
                    {/* PROJECTS */}
                    

                    {/* COMPETITIONS */}
                    <article>
                        <PortoflioHeader>
                            Competitions
                        </PortoflioHeader>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="CONRAD Competition"
                            />

                            <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="MTN Competition"
                            />
                        </div>
                    </article>
                    {/* COMPETITIONS */}

                    {/* SDG AND TECHPRENEURSHIP PROJECTS */}
                    <article>
                        <PortoflioHeader>
                            SDG and Techpreneurship Projects
                        </PortoflioHeader>

                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                           <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="CONRAD Competition"
                            />

                            <Card 
                            desc="Lorem ipsum dolor sit amet consectetur. Eu ultrices volutpat est eu commodo. 
                            Placerat mi id maecenas convallis vulputate est quis. Tincidunt iaculis est massa 
                            non dapibus neque faucibus neque. Enim viverra leo suscipit suspendisse."
                            title="MTN Competition"
                            />
                        </div>
                    </article>
                    {/* SDG AND TECHPRENEURSHIP PROJECTS */}
                </div>
            </div>

             {/* BUTTON */}
             <div className="w-full flex items-center justify-center">
                <Link href={``}>
                    <button 
                    
                    className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-black-500 text-white 
                        py-2 md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                        transition duration-300 hover:bg-opacity-90 rounded-lg`}>
                        Download Report
                    </button>
                </Link>
            </div>
            {/* BUTTON */}
        </section>
    )
}