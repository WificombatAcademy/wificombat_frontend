"use client"

import { PathwayHero } from "@/app/components/CodingPathwayComps/hero";
import { Outcomes } from "@/app/components/CodingPathwayComps/outcomes";
import { PathwayRoadmap } from "@/app/components/CodingPathwayComps/pathway-roadmap";
import { TodayComp } from "@/app/components/CodingPathwayComps/today-comp";
import { WhyCodingPathway } from "@/app/components/CodingPathwayComps/why-coding";
import Footer from "@/app/components/general/Footer";
import GeneralNavbar from "@/app/components/general/GeneralNavbar";
import { AIOnboarding } from "@/app/components/OnboardingComps/ai-onboarding";
import { aiSteps, outcomes } from "@/app/utils/types-and-links";
import { Suspense } from 'react'


export default function Page() {
  return (
   <Suspense>
     <div className="mx-auto relative container w-full max-w-[2000px]">
      <GeneralNavbar />

      <PathwayHero
      image="/hero-4.png"
      widthStyle="w-[450px] object-contain"
      desc="Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway."
      header="Navigate the AI Career Pathway"
       bgColor="bg-black-500" 
       buttonWhite/>

      <WhyCodingPathway
      pathwayImage="/assets/pathway/ai-pathway.png"
        headerOne="Why Artifical Intelligence Pathway?"
        pOne="The AI Pathway on our WiFiCombat eLearn platform offers students a deep dive into the world of artificial 
        intelligence, empowering them to understand and create intelligent systems. By exploring machine learning, 
        data science, and natural language processing, students gain the skills to build AI models that can analyze 
        data, make decisions, and solve complex problems. "
        pTwo="This pathway encourages critical thinking, creativity, and problem-solving, preparing students for 
        careers in cutting-edge fields like automation, predictive analytics, and AI-driven technology. As AI 
        continues to shape the future, this pathway equips learners with the knowledge and tools to ead and 
        innovate in a rapidly evolving digital world."
      />
      
      <PathwayRoadmap title="Artifical Intelligence" steps={aiSteps}/>

      <Outcomes outcomes={outcomes} />

      <AIOnboarding />

      <TodayComp 
      desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas 
      faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis." 
      header="Start Learning Artifical Intelligence Today!" 
      linkto="/schools/pricing-plan" />

      <Footer />
      
    </div>
   </Suspense>
  );
}
