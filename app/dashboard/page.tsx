"use client";

import { useState } from "react";
import SideBar from "../components/Dashboard/SideBar";
import { HiBars3 } from "react-icons/hi2";
import Header from "../components/Dashboard/Header";
import Main from "../components/Dashboard/Main";
import { GoChevronDown } from "react-icons/go";
import SimpleLineChart from "../components/Dashboard/Graph";
import Piechart from "../components/Dashboard/Piechart";
import Image from "next/image";
import { raleway } from "../fonts";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import { useMain } from "../context/MainContext";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <>
     <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>

          <DashboardHeader setSidebarOpen={setSidebarOpen} />
          
          <main className="pb-10 lg:pb-10">
            <div className="px-4 sm:px-6 lg:px-8 lg:py-6 space-y-10">
              <Main  numberOfCourses={9} numberOfCoursesInProgress={2}/>

              <div className="flex w-full gap-6 min-h-[390px] max-lg:flex-col">
                <div className="w-full lg:basis-[60%] shadow-md overflow-x-scroll">
                  <div className="w-full flex-1 py-4 px-5">
                    <h6 className="font-bold text-xl">Career Pathway Streak</h6>
                    <div className="flex items-center mt-2 text-[#4F4F4F]">
                      <p className="text-sm">This Week</p>
                      <span>
                        <GoChevronDown />
                      </span>
                    </div>
                  </div>
                  <hr className="mt-4" />
                  <SimpleLineChart />
                </div>

                <div className="w-full lg:basis-[40%] shadow-md">
                  <div className="w-full flex-1 py-4 px-5">
                    <h6 className="font-bold text-xl">
                    Career Pathway Progress
                    </h6>
                    {/* <div className="flex items-center mt-2 text-[#4F4F4F]">
                      <p className="text-sm">This Week</p>
                      <span>
                        <GoChevronDown />
                      </span>
                    </div> */}
                  </div>
                  <hr className="mt-4" />
                  <div className="flex items-center flex-col h-full gap-8 mt-8 mb-8">
                    <Piechart />

                    <div className="flex gap-2 self-start ml-5">
                      <div className="text-[#131314] text-xs flex items-center gap-[7px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#0784C3] flex"></div>
                        <h6>Completed</h6>
                      </div>
                      <div className="text-[#131314] text-xs flex items-center gap-[7px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#E5E5E6]"></div>
                        <h6>Uncompleted</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses section */}
              <div className="space-y-6">
                <h6 className="text-[#131314] font-bold text-2xl">Continue Learning</h6>
                <div className="flex flex-col gap-6">
                  {courseData.map((course) => (
                    <div key={course.id} className="flex gap-7">
                      {/* {/* <div className="rounded-full w-24 h-24 overflow-hidden bg-cover"> */}
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={96}
                        height={96}
                        className="w-20 h-20 rounded-full"
                      />
                      {/* </div> */}
                      {/* <div
                        className="rounded-full w-20 h-20 overflow-hidden bg-center bg-cover bg-red-500"
                        style={{ backgroundImage: `url(${course.thumbnail})` }}
                      /> */}
                      <div className="w-full flex justify-between flex-col">
                        <div className="flex justify-between">
                          <h6 className="text-[#131314] font-semibold text-lg">
                            {course.title}
                          </h6>
                          <p className="text-[#0784C3] text-xl">
                            <span className="font-semibold">
                              {Math.round(course.completedPercentage)}
                            </span>
                            %
                          </p>
                        </div>
                        <div className="text-[#636369] text-sm space-x-4">
                          <span>
                            Module {course.module}
                          </span>

                          <span>
                             Lesson {course.lesson}
                          </span>

                        </div>
                        <div className="h-2 bg-[#D9D9D9] rounded w-full">
                          <div
                            style={{ width: `${course.completedPercentage}%` }}
                            // style={{ width: `${0}%` }}
                            className="h-full bg-[#0784C3] rounded"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Courses section */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const courseData = [
    {
      id: 1,
      title: "Coding Fundamental 1",
      thumbnail: "/assets/dashboard/course.png",
      completedPercentage: 67,
      module: 20,
      lesson: 14,
    },
];