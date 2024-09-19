"use client"
import { useEffect, useState } from "react";
import { API, CurriculumLevel, PathCurriculumType, pathsCurriculum, Pathways } from "@/app/utils/types-and-links";
import HeadingDesign from "../../general/HeaderDesign";
import CareerCard from "../../Home/career-card";
import axios from "axios";

type CareerPathwayCurriculumProps = {
  schoolCurriculum?: boolean;
};

const levels: CurriculumLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const CareerPathwayCurriculum = ({schoolCurriculum}: CareerPathwayCurriculumProps) => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel>("Beginner");
  const [pathways, setPathways] = useState([]);
  const headingText = schoolCurriculum ? "school curriculum" : "career pathway curriculum";

  const activePath: PathCurriculumType = pathsCurriculum[activePathIndex];

  useEffect(() => { []
    const fetchPathways = async () => {
        try {
        const response = await axios.get(`${API}/pathways/`);
        setPathways(response.data); 
      }
      catch (error) {    
      }
    } 

    fetchPathways();
  }, [])
  

  return (
    <section>
      <HeadingDesign heading={headingText}/>

      <div className="mt-8 md:mt-10 lg:mt-20 mb-20">
        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">

          <div className="w-full flex gap-4 md:gap-7 items-center justify-center font-semibold text-xl md:text-3xl">
            {levels.map((level) => (
                <h2
                  key={level}
                  className={`cursor-pointer ${selectedLevel === level ? "text-purple-500 border-b-4 border-purple-500" : ""}`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </h2>
              ))}
          </div>

          <div className="mt-10 md:mt-16 flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-between">
            <div
             
            className="w-full lg:basis-[13%] py-3 px-2 md:px-3 flex flex-wrap lg:flex-col items-center max-sm:justify-between rounded shadow-xl max-lg:px-4 border">
                {pathsCurriculum.map((curriculum,index) => (
                  <div
                  key={index}
                  onClick={() => setActivePathIndex(index)}
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
                    ${index === activePathIndex ? `bg-purple-500 text-white` : `transition-colors duration-500 hover:bg-gray-200`}`}
                >
                  {curriculum.module} Path
                </div>
                ))}
            </div>

             <div className="w-full lg:basis-[87%]">
             {activePath && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                  {activePath.curriculum[selectedLevel].map((course, index) => (
                    <CareerCard
                    linkTo="/coding-pathway"
                    key={index}
                    pathway={course.module}
                    subject={course.subject}
                    level={course.level}
                    desc={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, voluptatibus rem. Corporis necessitatibus nostrum adipisci illo`}
                    // image={`https://wificombatacademy.com/${course.imageurl}`}
                    // textWhite 
                    />
                  ))}
               </div>
             )}

             {/* <div className="mt-10 w-full flex items-center justify-center">
                <Link 
                  href={`/registration`}
                  className="px-16 md:px-24 py-5 font-medium text-white shadow-sm bg-black-500 rounded-lg transition duration-300 hover:bg-opacity-90">
                    View All
                </Link>
             </div> */}
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};
