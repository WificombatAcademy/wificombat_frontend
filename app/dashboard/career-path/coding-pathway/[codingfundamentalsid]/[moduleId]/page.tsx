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
import toast, { Toaster } from "react-hot-toast";
import QuizContent from "@/app/components/Dashboard/CareerPathway/quiz-content";

const Page = ({ params }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toggleSidebar } = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [moduleDetails, setModuleDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<any[]>([]); 
  const [activeLessonIndex, setActiveLessonIndex] = useState(0); // Track active lesson by index
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [isLessonMode, setIsLessonMode] = useState(true);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);


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

  //Fetch Quiz
  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.get(moduleDetails[activeLessonIndex].quiz_url);
      setQuizLoading(true)
      setQuizData(response.data); // Store quiz data
      setIsLessonMode(false);
      setIsQuizMode(true); // Enable quiz mode
      setQuizLoading(false)
    } catch (error:any) {
      console.error("Error fetching quiz:", error);
      toast.error("Error fetching quiz", error);
      setQuizLoading(false); // Enable quiz mode
    }
  };

  // Handle lesson click and split content
  const handleLessonClick = (index: number, content: string) => {
    setIsQuizMode(false);
    setIsLessonMode(true);
    const splitContent = content.split('***'); // Split content into slides
    setSelectedContent(splitContent); // Store slides in state
    setCurrentSlide(0); // Reset to first slide
    setActiveLessonIndex(index);
  };

  // Handle slide navigation
  const handleNextSlide = () => {
    if (currentSlide < selectedContent.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (moduleDetails[activeLessonIndex].quiz_url) {
      setIsQuizMode(true); // Show the quiz button
    }
  };
  

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

   // Handle quiz submission
   const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    console.log("Submitted quiz answers:", quizAnswers);
    // Add logic to handle the quiz results
  };

  if (loading) return <div className="overflow-hidden"> <Loader noDesign />;</div>;
  if (moduleDetails.length === 0) return <div className="overflow-hidden"> <Loader isError  noDesign/> </div>;

  const moduleTitle = moduleDetails.length > 0 ? moduleDetails[0].module : "";
  const numberOfLessons = moduleDetails.length;
  const numberOfQuizzes = moduleDetails.filter((detail) => detail.quiz_url).length;
  const numberOfAssignments = moduleDetails.filter((detail) => detail.assignment).length;

  return (
    <>
    <Toaster />
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
                      <p>1 Assignment</p>
                    </div>
                  </div>
                  {/* Module Info */}

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
                                  className={`mt-5 cursor-pointer
                                  ${activeLessonIndex === index && !isQuizMode ? "text-purple-500" : ""}`}
                                  onClick={() => handleLessonClick(index, details.content)}
                                >
                                  Lesson note
                                </p>
                                <p className="text-sm text-black-600">Reading : 3:00 mins</p>
                              </div>

                              <div>
                                <p 
                                onClick={fetchQuiz}
                                className={`font-medium cursor-pointer
                                 ${activeLessonIndex === index && isQuizMode ? "text-purple-500" : ""}`}
                                >Quiz</p>
                                <p className="text-sm text-black-600">1:00 mins</p>
                              </div>

                              {/* <div>
                                <p className="font-medium cursor-pointer">Assignment</p>
                              </div> */}
                            </div>
                          )}
                        </div>

                      </div>

                      <div>
                        <SlLockOpen size={20} className="" />
                      </div>

                    </div>
                  ))}
                  {/* Lessons List */}

                  {/* Assignment */}
                  <div className="w-full flex items-stretch justify-between overflow-hidden">

                    <div className="w-full flex items-start gap-2">
                      <div
                        className="flex-shrink-0 cursor-pointer">
                        {numberOfAssignments ? <IoMdArrowDropright size={25} /> :
                        <IoMdArrowDropdown size={25} />}
                      </div>

                      <div className="ml-[5%]">
                        <h2 className={`text-lg font-medium`}>Assignment</h2>      
                      </div>
                    </div>

                    <div>
                      <SlLockOpen size={20} className="" />
                    </div>

                  </div>
                  {/* Assignment */}

                </div>

                {/* Content Section */}
                <div className={`relative w-full lg:h-screen overflow-y-hidden lg:w-[60%] xl:w-[65%] 
                bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4 overflow-hidden`}
                >

                  {/* LESSON CONTENT */}
                 {isLessonMode && <LessonContent 
                  currentSlide={currentSlide}
                  handleNextSlide={handleNextSlide}
                  handlePrevSlide={handlePrevSlide}
                  selectedContent={selectedContent}
                  fetchQuiz={fetchQuiz}
                  isQuizMode={isQuizMode}
                  loadingQuiz={quizLoading}
                  lessonTitle={moduleDetails[activeLessonIndex].title} // Pass the lesson title
                  lessonIndex={activeLessonIndex + 1} // Pass the lesson number (1-based index)
                  totalSlides={selectedContent.length}
                  />}
                  {/* LESSON CONTENT */}

                  {/* QUIZ CONTENT */}
                  {isQuizMode && 
                  <QuizContent
                  quizData={quizData}
                  handleSubmitQuiz={handleSubmitQuiz}
                  />

                  }
                  {/* QUIZ CONTENT */}


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