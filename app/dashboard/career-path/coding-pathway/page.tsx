"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import axios from "axios";
import { API_VERSION_ONE, stage } from "@/app/utils/types-and-links";
import Loader from "@/app/utils/loader";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!dashboardData || !dashboardData.course_ids) return;

      try {
        // Fetch course details for each course ID
        const coursePromises = dashboardData.course_ids.map((id: string) =>
          axios.get(`${API_VERSION_ONE}/career-pathway/${id}/courses`) // Fetching course titles
        );

        const courseResults = await Promise.all(coursePromises);
        const courseData = courseResults.map((result) => result.data); // Extract the data

        // Now fetch modules for each course
        const modulePromises = courseData.map((course: any) =>
          axios.get(`${API_VERSION_ONE}/course/${course.id}/modules/`) // Fetching course modules
        );

        const moduleResults = await Promise.all(modulePromises);
        const coursesWithModules = courseData.map((course: any, index: number) => ({
          ...course,
          modules: moduleResults[index].data, // Attach modules to each course
        }));

        setCourses(coursesWithModules);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dashboardData]);

  if (loading) {
    return <div className="overflow-hidden"><Loader noDesign /></div>;
  }

  console.log(courses)
  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"} transition-all duration-500 ease-in-out`}>
          <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username} />

          <main className="pb-10 mt-2">
            <div className="px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="flex items-center gap-3">
                <div className="z-10 relative w-fit bg-purple-50 border-purple-100 rounded-md shadow-sm cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-end">
                    <IoMdArrowDropdown size={22} className="text-black-500 relative right-2" />
                  </div>

                  <select className={`relative appearance-none w-full block bg-transparent outline-none sm:text-sm sm:leading-6 py-3 px-7 font-medium`}>
                    {stage.map((stage, index) => (
                      <option key={index}>{stage}</option>
                    ))}
                  </select>
                </div>

                <div className="z-10 relative w-fit bg-blue-50 border-blue-100 rounded-md shadow-sm cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-end">
                    <IoMdArrowDropdown size={22} className="text-black-500 relative right-2" />
                  </div>

                  <select className={`relative appearance-none w-full block bg-transparent outline-none sm:text-sm sm:leading-6 py-3 px-5 pr-10 font-medium`}>
                    <option>Level 1</option>
                  </select>
                </div>
              </div>      

              {/* Course List */}
              <div className="flex flex-col gap-9">
                {courses.map((course, ind) => (
                  <div key={ind} className="flex flex-col gap-8">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-6">
                      <h6 className="text-black-500 text-xl md:text-[28px] font-bold">
                        {course.title}
                      </h6>

                      <div>
                        <Link href={`/dashboard/report-card/course_${course.id}`}>
                          <button className="bg-purple-500 text-white py-3 2xl:py-4 px-3 md:px-4 lg:px-6 transition duration-300 hover:bg-opacity-90 rounded-lg">
                            Report Card
                          </button>
                        </Link>
                      </div>
                    </div>
                    {/* MODULES */}
                    <div className="flex flex-col gap-4">
                      {course.modules.map((module: any, index: number) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                          <p>{module.body}</p>
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