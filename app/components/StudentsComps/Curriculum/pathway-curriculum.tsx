"use client"
import { useEffect, useState } from "react";
import { API_VERSION_ONE, CurriculumLevel, formatPrice } from "@/app/utils/types-and-links";
import HeadingDesign from "../../general/HeaderDesign";
import CareerCard from "../../Home/career-card";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { RiLoader4Fill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

type CareerPathwayCurriculumProps = {
  schoolCurriculum?: boolean;
};

// const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const CareerPathwayCurriculum = ({schoolCurriculum}: CareerPathwayCurriculumProps) => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel>("Beginner");
  const [pathways, setPathways] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [pathwaysLoading, setPathwaysLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const headingText = schoolCurriculum ? "school curriculum" : "career pathway curriculum";
  const activePath = pathways[activePathIndex];


  useEffect(() => {
    const fetchPathways = async () => {
      setPathwaysLoading(true);
      try {
        const response = await axiosInstance.get(`${API_VERSION_ONE}/career-pathways`);
        setPathways(response.data); // Set fetched pathways to state
        if (response.data.length > 0) {
          fetchCourses(response.data[5].pathway_id); // Fetch courses for the first pathway by default
        }
      } catch (error) {
        console.error("Error fetching pathways:", error);
      } finally {
        setPathwaysLoading(false); // Done loading
      }
    };

    fetchPathways();
  }, []);

  // Fetch courses by pathway ID
  const fetchCourses = async (pathwayId: string) => {
      setCoursesLoading(true); // loading courses
      try {
      const response = await axiosInstance.get(`${API_VERSION_ONE}/career-pathway/${pathwayId}/courses`);
      setCourses(response.data); // Set fetched courses to state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }finally {
      setCoursesLoading(false); // Done loading
    }
  };

  // Truncate description to 15 words, stripping HTML tags first
  const truncateDescription = (htmlString: string) => {
    // Create a DOMParser to parse the HTML string
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(htmlString, "text/html");
    const plainText = parsedDocument.body.textContent || ""; // Extract plain text from the HTML

    const words = plainText.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return plainText;
  };

  const handlePathwayClick = (index: number, pathwayId: string) => {
    setActivePathIndex(index);
    fetchCourses(pathwayId); // Fetch courses when a pathway is clicked
  };


  const levelNames = schoolCurriculum
  ? { Beginner: "Elementary", Intermediate: "Junior High School", Advanced: "Senior High School" }
  : { Beginner: "Beginner", Intermediate: "Intermediate", Advanced: "Advanced" };

  const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advanced"];

  if(pathwaysLoading) {
    return (
      <div className="overflow-hidden">
        <Loader curriculum={true}/>
      </div>
    )
  }
  

  return (
    <section>
      <HeadingDesign heading={headingText}/>
      <Toaster />

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

            {coursesLoading ? (
                <div className="w-full h-[20rem] flex items-center justify-center">
                  <RiLoader4Fill size={145} className="animate-spin text-purple-500" />
                </div>
              ) :
              
              ( <div className="w-full lg:basis-[87%]">
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 min-[1250px]:grid-cols-3 gap-9">
                {courses
                  .filter((course) => course.level === selectedLevel)
                  .map((course, index) => (
                      <CareerCard
                        key={index}
                        curriculum={true}
                        pathway={course.subject}
                        // price={formatPrice(course.price)}
                        subject={course.subject}
                        image={`https://wificombatacademy.com/${course.image}`}
                      
                        level={course.level}
                        desc={`Our courses provide interactive lessons, expert guidance, and flexible learning options`} 
                        // desc={truncateDescription(course.note)} 
                        linkTo={`/course/${course.course_id}`}
                        item={{ ...course, id: course.course_id,}}
                        viewCourse={true}
                      />
                    // </Link>
                  ))}
              </div>
              
              ) : (
                <p className="w-full m-auto text-center">No courses available for this level.</p>
              )}
            </div>)}
            
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