"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { API_VERSION_ONE, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";

const Page = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { toggleSidebar } = useMain();
    const dashboardData = useDashboardStore((state) => state.dashboardData);
    const [courses, setCourses] = useState<any[]>([]); // State to hold courses
    const [modules, setModules] = useState<{ [key: string]: any[] }>({}); // State to hold modules
    const [selectedLevel, setSelectedLevel] = useState<string>("All"); // State for selected level
    
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const fetchedCourses = await fetchCourses();
                setCourses(fetchedCourses);

                // Fetch modules for each course after loading courses
                const modulesPromises = fetchedCourses.map(async (course: any) => {
                    const fetchedModules = await fetchModules(course.course_id);
                    return { courseId: course.course_id, modules: fetchedModules };
                });

                const modulesArray = await Promise.all(modulesPromises);
                const modulesMap = modulesArray.reduce((acc, { courseId, modules }) => {
                    acc[courseId] = modules;
                    return acc;
                }, {} as { [key: string]: any[] });

                setModules(modulesMap);
            } catch (error) {
                console.error('Error fetching courses or modules:', error);
            }
        };

        loadCourses();
    }, []);

    if (!dashboardData || !courses.length || !Object.keys(modules).length) 
        return <div className="overflow-hidden"> <Loader noDesign loadingCourses/></div>;
    

    // Filter courses based on selected level
    const filteredCourses = selectedLevel === "All" 
        ? courses 
        : courses.filter(course => course.level === selectedLevel);

    return (
        <>
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className={`${raleway.className} relative`}>
                <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"} transition-all duration-500 ease-in-out`}>
                    <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username} />

                    <main className="pb-10 mt-2">
                        <div className="px-4 sm:px-6 lg:px-8 space-y-10">
                            <div className="flex items-center gap-3">
                                <div className="z-10 relative w-fit bg-purple-50 border-purple-100 
                                rounded-md shadow-sm cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-end">
                                        <IoMdArrowDropdown size={22} className="text-black-500 relative right-2" />    
                                    </div>
                                    <select 
                                        className={`relative appearance-none w-full block bg-transparent 
                                        outline-none sm:text-sm sm:leading-6 py-3 px-7 font-medium`}
                                        onChange={(e) => setSelectedLevel(e.target.value)}
                                    >
                                        <option value="All">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-9">
                                {filteredCourses.map((course, ind) => (
                                    <div key={ind} className="flex flex-col gap-8">
                                        <div className="flex items-center justify-between gap-6">
                                            <h6 className="text-[#131314] text-xl md:text-[28px] font-bold">
                                                {course.subject}</h6>
                                            <div>
                                                <Link href={`/dashboard/report-card/course_${ind + 1}`}>
                                                    <button 
                                                        disabled={!course.reportCard}
                                                        className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed 
                                                        bg-purple-500 text-white max-md:text-sm max-md:w-20 
                                                        py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                                                        transition duration-300 hover:bg-opacity-90 rounded-lg`}>
                                                        Report Card
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex h-auto items-stretch gap-5 overflow-x-scroll">
                                            {modules[course.course_id] 
                                            && modules[course.course_id].map((module: any, index: number) => (
                                                <div key={module.id} 
                                                className="w-[60%] md:w-[50%] lg:w-[25%] flex-shrink-0 h-full flex flex-col mb-5
                                                rounded-2xl">

                                                    <Link href={!(module.unlocked) ? 
                                                        `/dashboard/career-path/coding-pathway/${course.course_id}/${module.id}` 
                                                        : ""} className="rounded-2xl">
                                                        <button disabled={module.unlocked} className="relative w-full
                                                        h-[150px] md:h-[190px] lg:h-[215px] flex items-center justify-center overflow-hidden bg-blue-500
                                                         rounded-2xl disabled:cursor-not-allowed">
                                                            {module.unlocked &&  <div className="absolute
                                                            bg-[#B1B1B4]/30 border-4 border-black rounded-2xl"></div>}
                                                            <div className="">
                                                            <Image 
                                                                src={(module.cimage !== "") ? 
                                                                    module.cimage :
                                                                     `/assets/dashboard/course.png`}
                                                                alt={module.thumbnail}
                                                                width={400}
                                                                height={400}
                                                                className="w-full object-cover bg-cover bg-no-repeat"
                                                            />
                                                            </div>
                                                        </button>
                                                    </Link>

                                                    <div className="px-1 flex-grow">
                                                        <div className="mt-3 flex items-center justify-between">
                                                            <h3 className="font-semibold text-lg">
                                                                {module.title}
                                                            </h3>
                                                            {module.unlocked && <SlLock size={20} 
                                                            className="flex-shrink-600 text-black-700"/>}
                                                        </div>
                                                        <div className="mt-2 font-medium">
                                                            <h3>{module.desc}</h3>
                                                        </div>
                                                        <div className="mt-2 flex text-xs lg:text-sm gap-3 md:gap-5 text-black-600">
                                                            <div>{module.num_lessons} {module.lessons > 1 ? "Lessons" : "Lesson"}</div>
                                                            <div>{module.num_quizzes} Quiz</div>
                                                            <div>1 {module.num_assignments > 1 ? "Assignments" : "Assignment"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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

// Fetch functions
 const fetchCourses = async () => {
    const response = await axiosInstance.get(`${API_VERSION_ONE}/career-pathway/20/courses`);
    return response.data;
};

// Function to fetch modules by course ID
 const fetchModules = async (courseId: string) => {
    const response = await axiosInstance.get(`${API_VERSION_ONE}/course/${courseId}/modules`);
    return response.data;
};


