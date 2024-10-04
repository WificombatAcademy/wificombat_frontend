"use client"

import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { SlLockOpen } from "react-icons/sl";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { API_VERSION_ONE } from "@/app/utils/types-and-links";
import LessonContent from "@/app/components/Dashboard/CareerPathway/lesson-content";

const Page = ({ params }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [moduleDetails, setModuleDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any[]>([]); // Store array of split content
  const [modulePlan, setModulePlan] = useState(true);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number | null>(0); // Track active lesson by index
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  // Fetch module details
  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_VERSION_ONE}/module/${params.moduleId}/lessons`
        );
        setModuleDetails(response.data);
        setLoading(false);

        if (response.data.length > 0) {
          // Automatically select the first lesson's content and split into slides
          const content = response.data[0].content;
          const splitContent = content.split('***');
          setSelectedContent(splitContent);
        }
      } catch (error) {
        console.error("Error fetching moduleDetails:", error);
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [params.moduleId]);

  // Handle lesson click and split content
  const handleLessonClick = (index: number, content: string) => {
    const splitContent = content.split('***'); // Split content into slides
    setSelectedContent(splitContent); // Store slides in state
    setCurrentSlide(0); // Reset to first slide
    setActiveLessonIndex(index);
  };

  // Handle slide navigation
  const handleNextSlide = () => {
    if (currentSlide < selectedContent.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (loading) return <div className="overflow-hidden"> <Loader noDesign />;</div>;
  if (!moduleDetails) return <div className="overflow-hidden"> <Loader isError /> </div>;

  const moduleTitle = moduleDetails.length > 0 ? moduleDetails[0].module : "";
  const numberOfLessons = moduleDetails.length;
  const numberOfQuizzes = moduleDetails.filter((detail) => detail.quiz_url).length;
  const numberOfAssignments = moduleDetails.filter((detail) => detail.assignment).length;

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Main Section */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"} transition-all duration-500 ease-in-out`}>
          <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username} />

          <main className="">
            <div className="space-y-10">
              <div className="flex max-lg:flex-col-reverse max-lg:gap-6">

                {/* Sidebar Lessons */}
                <div className="w-full h-screen lg:w-[40%] xl:w-[35%] px-4 sm:px-6 lg:px-8 space-y-5 overflow-y-auto">
                  {/* Module Info */}
                  <div className="lg:ml-[12%]">
                    <h1 className="mt-5 text-xl font-medium">{moduleTitle}</h1>
                    <div className="mt-1 text-sm flex gap-3 items-center">
                      <p>{numberOfLessons} Lessons</p>
                      <p>{numberOfQuizzes} Quiz</p>
                      <p>{numberOfAssignments} Assignments</p>
                    </div>
                  </div>

                  {/* Lessons List */}
                  {moduleDetails.map((details, index) => (
                    <div key={index} className="w-full flex items-stretch justify-between overflow-hidden">
                      <div className="w-full flex items-start gap-2">
                        <div
                          className="flex-shrink-0 cursor-pointer"
                          onClick={() => handleLessonClick(index, details.content)}>
                          {details.locked ? <IoMdArrowDropright size={25} /> : <IoMdArrowDropdown size={25} />}
                        </div>

                        <div className="ml-[5%]">
                          <h2 className={`text-lg font-medium`}>Lesson {index + 1}</h2>
                          {!details.locked && (
                            <div className="space-y-5 font-medium">
                              <div>
                                <p
                                  className={`mt-5 cursor-pointer ${activeLessonIndex === index ? "text-purple-500" : ""}`}
                                  onClick={() => handleLessonClick(index, details.content)}
                                >
                                  {details.title}
                                </p>
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
                          )}
                        </div>
                      </div>
                      <div>
                        <SlLockOpen size={20} className="" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Section */}
                <div className="relative w-full lg:h-screen  overflow-y-hidden lg:w-[60%] xl:w-[65%] 
                bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4 overflow-hidden">

                  {/* LESSON CONTENT */}
                  <LessonContent 
                  currentSlide={currentSlide}
                  handleNextSlide={handleNextSlide}
                  handlePrevSlide={handlePrevSlide}
                  selectedContent={selectedContent}
                  />
                  {/* LESSON CONTENT */}

                </div>
                {/* Content Section */}

              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;