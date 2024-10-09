"use client"
import { useEffect, useState } from "react";
import { API_VERSION_ONE, CurriculumLevel, PathCurriculumType, pathsCurriculum, Pathways } from "@/app/utils/types-and-links";
import HeadingDesign from "../../general/HeaderDesign";
import CareerCard from "../../Home/career-card";
import axiosInstance from "@/app/utils/auth-interceptor";
import Link from "next/link";

type CareerPathwayCurriculumProps = {
  schoolCurriculum?: boolean;
};

// const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const CareerPathwayCurriculum = ({schoolCurriculum}: CareerPathwayCurriculumProps) => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel>("Beginner");
  const [pathways, setPathways] = useState([]);
  const [courses, setCourses] = useState<any[]>([]);
  const headingText = schoolCurriculum ? "school curriculum" : "career pathway curriculum";

  const activePath: PathCurriculumType = pathsCurriculum[activePathIndex];

  useEffect(() => {
    const fetchPathways = async () => {
      try {
        const response = await axiosInstance.get(`${API_VERSION_ONE}/career-pathways`);
        setPathways(response.data); // Set fetched pathways to state
        if (response.data.length > 0) {
          fetchCourses(response.data[5].pathway_id); // Fetch courses for the first pathway by default
        }
      } catch (error) {
        console.error("Error fetching pathways:", error);
      }
    };

    fetchPathways();
  }, []);

  // Fetch courses by pathway ID
  const fetchCourses = async (pathwayId: string) => {
    try {
      const response = await axiosInstance.get(`${API_VERSION_ONE}/career-pathway/${pathwayId}/courses`);
      setCourses(response.data); // Set fetched courses to state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handlePathwayClick = (index: number, pathwayId: string) => {
    setActivePathIndex(index);
    fetchCourses(pathwayId); // Fetch courses when a pathway is clicked
  };


  const levelNames = schoolCurriculum
  ? { Beginner: "Elementary", Intermediate: "Junior High School", Advanced: "Senior High School" }
  : { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" };

  const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advanced"];
  

  return (
    <section>
      <HeadingDesign heading={headingText}/>

      <div className="mt-8 md:mt-10 lg:mt-20 mb-20">
        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">

          <div className="w-full flex gap-4 md:gap-7 items-center justify-center font-semibold text-xl md:text-3xl">
            {levels.map((level) => (
                <h2
                  key={level}
                  className={`cursor-pointer ${selectedLevel === level ? 
                  "text-purple-500 border-b-4 border-purple-500" : ""}`}
                  onClick={() => setSelectedLevel(level)}
                >
                 {levelNames[level]}
                </h2>
              ))}
          </div>

          <div className="mt-10 md:mt-16 flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-between">
            <div
             
            className="w-full lg:basis-[13%] py-3 px-2 md:px-3 flex flex-wrap 
            lg:flex-col items-center max-sm:justify-between rounded shadow-xl max-lg:px-4 border">
               {[...pathways].reverse().map((pathway:any, index) => (
                  <div
                  key={pathway.id}
                  onClick={() => handlePathwayClick(index, pathway.pathway_id)}
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    width: "120px",  // Adjust this value to the desired width
                    height: "120px", // Adjust this value to the desired height
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={`px-2 lg:px-7 lg:leading-[24.5px] text-center font-medium break-words cursor-pointer text-sm
                    ${index === activePathIndex ? 
                    `bg-purple-500 text-white` : `transition-colors duration-500 hover:bg-gray-200`}`}
                >
                  {pathway.subject} <br /> Pathway
                </div>
                ))}
            </div>

            <div className="w-full lg:basis-[87%]">
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                  {courses
                    .filter((course) => course.level === selectedLevel)
                    .map((course, index) => (
                      <CareerCard
                      curriculum={true}
                      image={`https://wificombatacademy.com/${course.image}`}
                      linkTo="/coding-pathway/course"
                      key={index}
                      pathway={course.subject}
                      subject={course.subject}
                      level={course.level}
                      desc="neienei"
                      />
                    ))}
                </div>
              ) : (
                <p>No courses available for this level.</p>
              )}
            </div>
            
          </div>


          {/* 
          <div className="mt-10 w-full flex items-center justify-center">
            <Link 
              href={`/registration`}
              className="px-12 py-3 font-medium text-white text-lg shadow-sm bg-black-500 
              rounded-lg transition duration-300 hover:bg-opacity-90">
                View All
            </Link>
          </div> */}

        </div>
      </div>
    </section>
  );
};
