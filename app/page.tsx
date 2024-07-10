import Footer from "./components/general/footer";
import Navbar from "./components/general/navbar";
import { Benefits } from "./components/Home/benefits";
import { CareerPath } from "./components/Home/career-path";
import { CareerPathway } from "./components/Home/career-pathway";
import { CareerRoadmap } from "./components/Home/career-roadmap";
import { Courses } from "./components/Home/courses";
import { Community } from "./components/Home/elearn-community";
import { FAQ } from "./components/Home/faq";
import { Hero } from "./components/Home/hero";
import Impact from "./components/Home/Impact";
import { SchoolCurriculum } from "./components/Home/school-curriculum";
import { Testimonials } from "./components/Home/testimonials";

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
