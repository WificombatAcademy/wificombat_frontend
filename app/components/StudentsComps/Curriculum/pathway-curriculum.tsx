import HeadingDesign from "../../general/HeaderDesign";

const paths = [
  {path: "Gaming", active: true,},
  {path: "Coding", active: false,},
  {path: "Robotics & IOT", active: false,},
  {path: "AI", active: false,},
  {path: "Multimedia", active: false,},
  {path: "Techpreneurship", active: false,},
]

export const CareerPathwayCurriculum = () => {
  return (
    <section>
      <HeadingDesign heading="career pathway curriculum" />

      <div className="mt-8 md:mt-10 lg:mt-20 mb-20">
        <div className="w-[93%] md:w-[90%] lg:w-[88%] mx-auto">

          <div className="w-full flex gap-4 md:gap-7 items-center justify-center font-semibold text-xl md:text-3xl">
            <h2 className="text-purple-500 border-b-4 border-purple-500">
              Beginner
            </h2>
            <h2 className="">Intermediate</h2>
            <h2 className="">Advance</h2>
          </div>

          <div className="mt-10 md:mt-16 flex flex-col lg:flex-row items-center lg:items-start justify-between">
            <div 
            className="w-full lg:basis-[13%] py-3 px-2 md:px-3 flex flex-wrap lg:flex-col items-center justify-between rounded shadow-xl max-lg:px-4 border">
                {paths.map((path,index) => (
                  <div 
                  key={index}
                  style={{ 
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }
                  }
                className={`w-[33%] lg:w-[85%] py-7 md:py-14 lg:py- px-2 text-center font-medium ${path.active && `bg-purple-500 text-white`}`}>{path.path} Path</div>
                ))}
            </div>

             <div className="w-full lg:basis-[87%]">

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
