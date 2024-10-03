"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { API_VERSION_ONE } from "@/app/utils/types-and-links";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { SlLockOpen } from "react-icons/sl";

const Page = ({params}: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [moduleDetails, setModuleDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [modulePlan, setModulePlan] = useState(true);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number | null>(null); // Track active lesson by index

  useEffect(() => {
    const fetchmoduleDetails = async () => {
      try {
        const response = await axiosInstance.get(`${API_VERSION_ONE}/module/${params.moduleId}/lessons`);
        setModuleDetails(response.data);
        setLoading(false);

        if (response.data.length > 0) {
          setSelectedContent(response.data[0].content); // Set first lesson content by default
        }
      } catch (error) {
        console.error('Error fetching moduleDetails:', error);
        setLoading(false);
      }
    };

    fetchmoduleDetails();
  }, [params.moduleId]);

  if (loading) return <div className="overflow-hidden"> <Loader noDesign />;</div>;
  if (!moduleDetails) return <div className="overflow-hidden"> <Loader isError/> </div>;

  const moduleTitle = moduleDetails.length > 0 ? moduleDetails[0].module : "";
  const numberOfLessons = moduleDetails.length;
  const numberOfQuizzes = moduleDetails.filter((detail) => detail.quiz_url).length;
  const numberOfAssignments = moduleDetails.filter((detail) => detail.assignment).length;

  const handleLessonClick = (index: number, content: string) => {
    setActiveLessonIndex(index);
    setSelectedContent(content);
  };

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
          <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username} />

          <main className="pb-10">
            <div className="space-y-10">
              <div className="flex max-lg:flex-col-reverse max-lg:gap-6">
                
                <div className="w-full h-screen lg:w-[40%] xl:w-[35%] px-4 sm:px-6 lg:px-8 space-y-5 overflow-y-auto">
                  {/* MODULE CONTENT */}

                  {/* MODULE TITLE */}
                  <div className="lg:ml-[12%]">
                    <h1 className="mt-5 text-xl font-medium">
                      {moduleTitle}
                    </h1>

                    <div className="mt-1 text-sm flex gap-3 items-center">
                      <p>{numberOfLessons} Lessons</p>
                      <p>{numberOfQuizzes} Quiz</p>
                      <p>{numberOfAssignments} Assignments</p>
                    </div>
                  </div>
                  {/* MODULE TITLE */}
                      
                  {/* MODULE PLAN */}
                  <div className="py-3">
                    <div className="flex items-center gap-5">
                      <div 
                        onClick={() => setModulePlan(!modulePlan)}
                        className="lg:w-[7%] cursor-pointer">
                          {modulePlan ? <IoMdArrowDropright size={25}/> : <IoMdArrowDropdown size={25}/>}
                      </div>

                      <h1 className="text-lg font-medium">
                        Module Plan
                      </h1>
                    </div>

                    {modulePlan &&
                      <div className="mt-4 ml-[13%] flex flex-col gap-4 font-medium">
                          <p>Objectives</p>
                          <p>Learning Outcome</p>
                      </div>
                    }
                  </div>
                  {/* MODULE PLAN */}

                  {/* Render lessons */}
                  {moduleDetails.map((details, index) => (
                    <div key={index} className="w-full flex items-stretch justify-between overflow-hidden">
                      <div className="w-full flex items-start gap-2">
                        <div 
                          className="flex-shrink-0 cursor-pointer"
                          onClick={() => handleLessonClick(index, details.content)}>
                          {details.locked ? 
                          <IoMdArrowDropright size={25}/> : 
                          <IoMdArrowDropdown size={25}/>}
                        </div>

                        <div className="ml-[5%]">
                          <h2 className={`text-lg font-medium`}>
                            Lesson {index + 1}
                          </h2>
                          {!details.locked &&
                            <div className="space-y-5 font-medium">
                              <div>
                                <p className={`mt-5 cursor-pointer ${activeLessonIndex === index ? 'text-purple-500' : ''}`}
                                  onClick={() => handleLessonClick(index, details.content)}
                                >{details.title}</p>
                                <p className="text-sm text-black-600">Duration : 3:00 mins</p>
                              </div>

                              <div>
                                <p className="font-medium cursor-pointer">Quiz</p>
                                <p className="text-sm text-black-600">1:00 mins</p>
                              </div>

                              <div>
                                <p className="font-medium cursor-pointer">Assignment</p>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                      
                      <div className="">
                        <SlLockOpen size={20} className=""/>
                      </div>
                    </div>
                  ))}
                  {/* Render lessons */}

                </div>

                <div className="w-full lg:h-screen lg:w-[60%] xl:w-[65%] bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4">
                  {/* content */}
                  <div className="mt-5 p-5 h-[40vh] bg-gray-50 overflow-y-auto rounded-3xl border-4">
                    {selectedContent ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedContent }} />
                    ) : (
                      <p>Select a lesson to view its content.</p>
                    )}
                  </div>
                  {/* content */}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;