import Image from "next/image";
import HeadingDesign from "../general/HeaderDesign";

export const CareerRoadmap = () => {
  return (
    <section className="relative">
      <HeadingDesign heading="Career Roadmap" />

      <div className="">
        <Image 
        width={1440}
        height={2015}
        src={`/CAREER-ROADMAP.png`}
        alt={`roadmap`}
        className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};
