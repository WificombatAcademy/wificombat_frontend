"use client"
import { useState } from "react";
import HeadingDesign from "../general/HeaderDesign";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";

type Step = {
    stepNumber: number;
    title: string;
    description: string;
    courseslist: string[];
    image: string;
  };
  
  type Props = {
    title: string;
    steps: Step[];
  };
  

// StepItem component to handle each step in the roadmap
const StepItem = ({ number, title, description, image, courseslist, isLast }: 
    { number: number, title: string, description: string, image: string, courseslist: string[], isLast: boolean }) => {
    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className="w-full flex flex-row gap-4">
            <div className="relative">
                {!isLast && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[5%] border-r-[5px] border-dashed h-full"></div>
                    </div>
                )}
                <div className="relative w-[4rem] h-[5rem] md:w-[6rem] md:h-[7rem] ">
                    <div className="polygon w-full h-full flex items-center justify-center bg-purple-50 border ">
                        <div className="text-2xl font-bold">{number}</div>
                    </div>
                </div>
            </div>

            <div className="relative mb-6 w-full py-6 px-8 bg-white border border-purple-500 rounded-3xl">
                <div onClick={() => setSeeMore(!seeMore)} className="absolute right-3 top-4 cursor-pointer">
                    {seeMore ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
                </div>

                <div className="space-y-3">
                    <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
                    <h2 className="text-xl md:text-2xl">{description}</h2>
                    <h2 className="text-xl md:text-2xl">50 Courses, 120 Lessons, 20 Projects</h2>
                </div>

                {seeMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full flex flex-row items-center gap-7">
                            <div className="w-full md:basis-[60%]">
                                <h4 className="mt-8 md:mt-12 mb-2 font-semibold text-black-500 text-lg md:text-xl">Courses they will learn</h4>
                                <div className="grid grid-cols-2 gap-5">
                                    {courseslist.map((list, index) => (
                                        <ul key={index} className="flex gap-2 list-disc">
                                            <li className="md:w-[80%] text-black-500 md:text-lg ml-4">{list}</li>
                                        </ul>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full md:basis-[40%]">
                                <Image
                                    src={image}
                                    alt={"roadmap"}
                                    width={127}
                                    height={225}
                                    className="w-full h-[225px] object-contain border-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export const PathwayRoadmap = ({ title, steps  }: Props) => {

    return (
        <section>
            <HeadingDesign heading={`${title} pathway roadmap`} />

            <div className="py-20 w-[93%] md:w-[90%] lg:w-[88%] text-black-500 mx-auto">
                <div className="w-full flex flex-col">
                    {steps.map((step, index) => (
                        <StepItem key={index} 
                        number={step.stepNumber} 
                        title={step.title} 
                        description={step.description} 
                        courseslist={step.courseslist}
                        isLast={index === steps.length - 1}
                        image={step.image}  />
                    ))}
                </div>
            </div>
        </section>
    );
};