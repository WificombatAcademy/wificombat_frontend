import CareerCard from "./career-card";
import HeadingDesign from "../general/HeaderDesign";

export const CareerPath = () => {
  return (
    <section className="relative">
      <HeadingDesign heading="career path" />

      <div className="mt-12 md:mt-16 mb-20 w-[93%] md:w-[90%] lg:w-[88%] 2xl:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 lg:gap-12 2xl:gap-16">

            <CareerCard
            linkTo="/coding-pathway"
            pathway="Coding"
            desc="This pathway emphasizes problem-solving, algorithm development, and mastering various programming languages."
            bgColor="bg-blue-500"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/gaming-pathway"
            pathway="Gaming"
            desc="This pathway covers everything from concept art and storytelling to coding and game mechanics."
            bgColor="bg-blue-300"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/robotics-pathway"
            pathway="Robotics/IOT"
            desc="This pathway combines mechanical engineering, electronics, and computer science to create innovative solutions."
            bgColor="bg-purple-500"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/ai-pathway"
            pathway="AI"
            desc="This pathway focuses on building algorithms that enable computers to perform tasks that typically require human intelligence."
            bgColor="bg-black-500"
            textWhite={true}
             pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/multimedia-pathway"
            pathway="Multimedia"
            desc="This pathway provides the tools and techniques to produce captivating content across various digital platforms."
            bgColor="bg-blue-500"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />

          <CareerCard
            linkTo="/techpreneurship-pathway"
            pathway="Techpreneurship"
            desc="This pathway teaches you how to develop, market, and manage tech-based startups and ventures."
            bgColor="bg-yellow-500"
            pathways={["software developer", "web developer", "system analyst", "mobile app developer", "database administrator",]}
          />
        </div>
      </div>
    </section>
  );
};
