"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { Courses, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
         
         <DashboardHeader setSidebarOpen={setSidebarOpen}/>

          <main className="pb-10 mt-2">
            <div className="px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex items-center gap-3">
                    <div className="z-10 relative w-fit bg-purple-50 border-purple-100 rounded-md shadow-sm cursor-pointer">
                           <div className="absolute inset-0 flex items-center justify-end">
                            <IoMdArrowDropdown 
                            size={22}
                            className="text-black-500 relative right-2" />    
                          </div>

                          <select
                            className={`relative appearance-none w-full block bg-transparent 
                                outline-none sm:text-sm sm:leading-6 py-3 px-7 font-medium
                           `}
                          >{stage.map((stage, index) => (
                            <option
                            key={index}
                            >{stage}</option>
                            ))}
                          </select>
                    </div>

                    <div className="z-10 relative w-fit bg-blue-50 border-blue-100 rounded-md shadow-sm cursor-pointer">
                           <div className="absolute inset-0 flex items-center justify-end">
                            <IoMdArrowDropdown 
                            size={22}
                            className="text-black-500 relative right-2" />    
                          </div>

                          <select
                            className={`relative appearance-none w-full block bg-transparent 
                                outline-none sm:text-sm sm:leading-6 py-3 px-5 pr-10 font-medium
                           `}
                          >
                            <option>Level 1</option>
                          </select>
                    </div>
                </div>              

                <div className="flex flex-col gap-9">
                    {Courses.map((course, ind) => (
                        <div 
                        key={ind}
                        className="flex flex-col gap-8">
                            {/* TITLE */}
                            <div className="flex items-center justify-between gap-6">
                                <h6 className="text-[#131314] text-xl md:text-[28px] font-bold">
                                    {course.title}
                                </h6>

                                <div>
                                    <Link href={`/dashboard/report-card/course_${ind + 1}`}>
                                        <button 
                                        disabled={!course.reportCard}
                                        className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-purple-500 
                                            text-white md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                                            transition duration-300 hover:bg-opacity-90 rounded-lg`}>
                                            Report Card
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            {/* TITLE */}
                            
                            {/* MODULES */}
                            <div className="flex items-center gap-5 overflow-x-scroll">
                                {course.Modules.map((module, index) => (
                                    <div 
                                    key={index}
                                    className="w-[60%] md:w-[50%] lg:w-[25%] flex-shrink-0 mb-5">
                                       <Link href={module.unlocked ?   
                                       `/dashboard/career-path/coding-pathway/fund_${ind+1}/module_${index+1}` : ""}>
                                            <button 
                                            disabled={!module.unlocked}
                                            className="relative w-full h-[150px] md:h-[190px] lg:h-[215px] disabled:cursor-not-allowed">
                                                {!module.unlocked && <div className="absolute inset-0 
                                                bg-[#B1B1B4]/30 rounded-2xl"></div>}
                                                    <Image 
                                                    src={module.thumbnail}
                                                    alt={module.thumbnail}
                                                    width={282}
                                                    height={215}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                    />
                                            </button>
                                       </Link>
                                        <div className="px-1">
                                            <div className="mt-3 flex items-center justify-between">
                                                <h3 className="font-semibold text-lg">
                                                    {module.title}
                                                </h3>

                                                {!module.unlocked &&
                                                <SlLock size={20} className="text-black-700"/>
                                                }
                                            </div>
                                            <div className="mt-2 font-medium">
                                                <h3 className="">
                                                    {module.desc}
                                                </h3>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-3 md:gap-5 text-black-600">
                                                <div>
                                                    {module.lessons} {""} 
                                                    {module.lessons > 1 ? "lessons" : "lesson"}
                                                </div>

                                                <div>
                                                    {module.quiz} {""}
                                                    Quiz
                                                    
                                                </div>

                                                <div>
                                                    {module.assignment} {""}
                                                    {module.assignment > 1 ? "Assignments" : "Assignment"}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* MODULES */}
                        </div>
                    ))}
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;