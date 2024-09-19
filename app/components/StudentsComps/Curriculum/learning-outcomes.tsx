import Image from "next/image";
import HeadingDesign from "../../general/HeaderDesign";

const outcomes = [
    {title: "Proficiency in Programming Languages", desc: "Develop strong coding skills in at least one major programming language.", bgImage: "/skill-1.png"},
    {title: "Game Development Skills", desc: "Understand game design principles and gain experience with game engines like Unity or Unreal Engine.", bgImage: "/images/game-development.png"},
    {title: "Multimedia Design Expertise", desc: "Master multimedia tools such as Adobe Creative Suite to create and edit digital content.", bgImage: "/images/multimedia-design.png"},
    {title: "AI Application and Ethics", desc: "Apply AI techniques to real-world problems and understand the ethical implications of AI.", bgImage: "/images/ai-application.png"},
    {title: "IoT Systems Knowledge", desc: "Design and program IoT devices, focusing on hardware interfacing and data analysis.", bgImage: "/images/iot-systems.png"},
    {title: "Robotics Programming and Integration", desc: "Learn to program robots and integrate sensors for autonomous systems.", bgImage: "/images/robotics-programming.png"},
    {title: "Project-Based Learning", desc: "Apply interdisciplinary knowledge to complete real-world tech projects.", bgImage: "/images/project-based-learning.png"},
    {title: "Critical Thinking and Innovation", desc: "Develop critical thinking skills to solve complex problems across various tech domains.", bgImage: "/images/critical-thinking.png"},
];
;

export const LearningOutcomes = () => {
    return (
        <section>
            <HeadingDesign heading="Learning Outcomes" />

            <div className="mt-8 w-[93%] md:w-[90%] lg:w-[88%] mx-auto md:mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {outcomes.map((outcome, index) => (
                    <div 
                    key={index}
                    className="w-full text-center"
                    >
                        <div 
                            className="w-16 h-16 mx-auto bg-black-50 flex items-center justify-center
                            rounded-full bg-cover bg-center"
                        >
                            <Image 
                                src={outcome.bgImage}
                                alt={outcome.title}
                                width={64}
                                height={64}
                                className="w-8 object-cover aspect-auto"
                            />
                        </div>

                        <h3 className="mt-4 font-semibold text-lg md:text-2xl">{outcome.title}</h3>
                        <p className="mt-4">{outcome.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}