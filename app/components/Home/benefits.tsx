// import HeadingDesign from "../General/headingDesign";
import { BenefitCard } from "./benefits-card";
import Image from "next/image";

export const Benefits = () => {
  return (
    <section className="relative">
      <div className="relative">
        <div className="relative flex flex-col gap-5 items-center justify-center">
            <div className="absolute top-0 max-[350px]:top-[-0.6rem] max-sm:top-[-0.75rem] max-md:top-[-1rem]">
                <svg
                // width="122"
                // height="60"
                viewBox="0 0 122 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-[122px] w-10 h-10 lg:h-[60px]"
                >
                <path
                    id="Polygon 1"
                    d="M61 59.9221L0.37822 -0.0778809L121.622 -0.0778809L61 59.9221Z"
                    fill="#BC00DD"
                />
                </svg>
            </div>

            <div className="w-full flex flex-col items-center gap-2 mt-[2.5rem] md:mt-[4rem] lg:mt-[7rem]">
                <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-24 w-14 h-14 lg:h-24"
                >
                <circle cx="50" cy="50" r="50" fill="#FFB600" />
                <path
                    d="M67.5 57.5C67.5 67.175 59.675 75 50 75C40.325 75 32.5 67.175 32.5 57.5C32.5 50.525 36.6 44.5 42.5 41.675V32.5C42.5 31.125 43.625 30 45 30H46.25L43.75 25H56.25L53.75 30H55C56.375 30 57.5 31.125 57.5 32.5V41.675C63.4 44.5 67.5 50.525 67.5 57.5ZM47.5 35V45.25C44.6766 45.8263 42.139 47.3605 40.3167 49.5927C38.4945 51.825 37.4994 54.6184 37.5 57.5L37.7 59.775L42.5 54.825L52.675 65L62.325 55.35C61.8885 52.8756 60.7183 50.5895 58.9663 48.7885C57.2143 46.9874 54.9614 45.7546 52.5 45.25V35H47.5ZM52.675 50C54.05 50 55.175 51.125 55.175 52.5C55.175 53.875 54.05 55 52.675 55C51.25 55 50.175 53.875 50.175 52.5C50.175 51.125 51.25 50 52.675 50Z"
                    fill="white"
                />
                </svg>

                <h2 className="mt-2 text-center md:text-3xl text-2xl lg:text-5xl uppercase font-medium">
                    benefits
                </h2>
            </div>
        </div>


        <div className="absolute inset-0">
            <div className="absolute top-0 right-0">
                <Image 
                src={`/assets/folder.png`}
                alt="design-bg"
                width={200}
                height={201} 
                className="w-12 md:w-20 lg:w-40 object-contain"/>
            </div>
        </div>
    </div>

      <div className="mt-12 md:mt-16 mb-20 w-[93%] md:w-[90] lg:w-[88%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <BenefitCard
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            desc="Gain in-depth knowledge and practical skills in high-demand tech fields like coding, 
                robotics, multimedia design, IoT, and AI. Our courses are designed to build a strong foundation 
                and advance your expertise."
            title="Comprehensive Skill Development "
          />

          <BenefitCard
            borderColor="border-purple-200"
            bgColor="bg-purple-200"
            desc="Our pathways are structured to cater to different learning stages, from beginners 
                to advanced learners. Personalized assessments help you find the right starting point 
                and progress at your own pace."
            title="Tailored Learning Experience"
          />

          <BenefitCard
            borderColor="border-yellow-300"
            bgColor="bg-yellow-300"
            desc="Engage in interactive, hands-on projects that simulate real-world scenarios. This practical 
                approach ensures you not only understand the concepts but also know how to apply them effectively."
            title="Hands-On Learning"
          />

          <BenefitCard
            borderColor="border-blue-200"
            bgColor="bg-blue-200"
            desc="Prepare for future career opportunities with industry-relevant skills and certifications. 
                Our pathways are aligned with current market trends and demands, ensuring you're ready to meet 
                employer expectations."
            title="Career Readiness"
          />

          <BenefitCard
            borderColor="border-purple-500"
            bgColor="bg-purple-500"
            desc="Utilize cutting-edge learning tools and resources, including solar-powered tablets for sustainable 
                learning, advanced software, and state-of-the-art labs to enhance your educational experience."
            title="Innovative Learning Tools"
          />

          <BenefitCard
            borderColor="border-yellow-500"
            bgColor="bg-yellow-500"
            desc="We assist children in building their portfolios tailored to their chosen career pathway. By showcasing 
                relevant skills, projects, and achievements, we help them create a compelling portfolio that aligns with their 
                future career goals. "
            title="Portfolio Building"
          />
        </div>
      </div>
    </section>
  );
};
