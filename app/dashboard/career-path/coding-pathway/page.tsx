"use client";

import Header from "@/app/components/Dashboard/Header";
import SideBar from "@/app/components/Dashboard/SideBar";
import { raleway } from "@/app/fonts";
import { Courses, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`lg:pl-64 ${raleway.className}`}>
          <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-white sm:gap-x-6">
          <button
              type="button"
              className="p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiBars3 size={30} className="h-8 w-8" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <Header />
          </div>

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
                                outline-none sm:text-sm sm:leading-6 py-3 px-5 font-medium
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
                    {Courses.map((course, index) => (
                        <div 
                        key={index}
                        className="flex flex-col gap-8">
                            {/* TITLE */}
                            <div className="flex items-center justify-between gap-6">
                                <h6 className="text-[#131314] text-xl md:text-[28px] font-bold">
                                    {course.title}
                                </h6>

                                <div>
                                    <Link href={``}>
                                        <button 
                                        disabled={!course.reportCard}
                                        className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-black-500 text-white 
                                            py-2 md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
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
                                       `/dashboard/career-path/coding-pathway/${index+1}` : ""}>
                                            <div className="relative w-full h-[150px] md:h-[190px] lg:h-[215px]">
                                                    {!module.unlocked && <div className="absolute inset-0 bg-[#B1B1B4]/30 rounded-2xl"></div>}
                                                    <Image 
                                                    src={module.thumbnail}
                                                    alt={module.thumbnail}
                                                    width={282}
                                                    height={215}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                    />
                                            </div>
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
                                            <div className="mt-2 flex flex-wrap gap-5 text-black-600">
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

const coursesApi = [
  {
    id: 1,
    title: "UI/UX course",
    thumbnail: "https://source.unsplash.com/random/400x300",
    completedPercentage: 80,
    lessonCompleted: 20,
    lessonRemaining: 14,
  },
  {
    id: 2,
    title: "Gaming",
    thumbnail: "https://source.unsplash.com/random/400x300",
    completedPercentage: 67,
    lessonCompleted: 20,
    lessonRemaining: 14,
  },
];
