import Footer from "./components/general/footer";
import Navbar from "./components/general/navbar";
import { Benefits } from "./components/home/benefits";
import { CareerPath } from "./components/home/career-path";
import { CareerPathway } from "./components/home/career-pathway";
import { CareerRoadmap } from "./components/home/career-roadmap";
import { Courses } from "./components/home/courses";
import { Community } from "./components/home/elearn-community";
import { FAQ } from "./components/home/faq";
import { Hero } from "./components/home/hero";
import Impact from "./components/home/Impact";
import { SchoolCurriculum } from "./components/home/school-curriculum";
import { Testimonials } from "./components/home/testimonials";

export default function Home() {
  return (
    <div className="mx-auto relative container w-full max-w-[2000px]">
      <Navbar />
      <Hero />
      <CareerPathway />
      <CareerPath />
      <CareerRoadmap />
      <Benefits />
      <SchoolCurriculum />
      <Courses />
      <Impact />
      <Testimonials />
      <Community />
      <FAQ />
      <Footer />
    </div>
  );
}
