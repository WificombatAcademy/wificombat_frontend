import CareerCard from "./career-card";
import HeadingDesign from "../general/HeaderDesign";

export const CareerPath = () => {
  return (
    <section className="relative">
      <HeadingDesign heading="career path" />

      <div className="mt-12 md:mt-16 mb-20 w-[93%] md:w-[90] lg:w-[88%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <CareerCard
            linkTo="/register"
            pathway="Gaming"
            desc="This pathway covers everything from concept art and storytelling to coding and game mechanics."
          />

          <CareerCard
            linkTo="/register"
            pathway="Coding"
            desc="This pathway emphasizes problem-solving, algorithm development, and mastering various programming languages."
          />

          <CareerCard
            linkTo="/register"
            pathway="Robotics/IOT"
            desc="This pathway combines mechanical engineering, electronics, and computer science to create innovative solutions."
          />

          <CareerCard
            linkTo="/register"
            pathway="AI"
            desc="This pathway focuses on building algorithms that enable computers to perform tasks that typically require human intelligence."
          />

          <CareerCard
            linkTo="/register"
            pathway="Multimedia"
            desc="This pathway provides the tools and techniques to produce captivating content across various digital platforms."
          />

          <CareerCard
            linkTo="/register"
            pathway="Techpreneurship"
            desc="This pathway teaches you how to develop, market, and manage tech-based startups and ventures."
          />
        </div>
      </div>
    </section>
  );
};
