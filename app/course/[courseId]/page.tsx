"use client"

import { PathwayHero } from '@/app/components/CodingPathwayComps/hero'
import { TodayComp } from '@/app/components/CodingPathwayComps/today-comp'
import CourseOverview from '@/app/components/CourseComps/courseOverview'
import Modules from '@/app/components/CourseComps/modules'
import Footer from '@/app/components/general/Footer'
import GeneralNavbar from '@/app/components/general/GeneralNavbar'
import { FAQ } from '@/app/components/Home/faq'
import Loader from '@/app/utils/loader'
import { API } from '@/app/utils/types-and-links'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

type Props = {}

const Page = ({ params }: any) => {
  const { courseId } = params;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // const courseTitle = searchParams.get("title");
  // const courseSubject = searchParams.get("subject");
  // const courseImage = searchParams.get("image");
  // const courseDescription = searchParams.get("description");
  // const courseLevel = searchParams.get("level");

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Fetch the course details 
  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/course/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false); // Done loading both requests
    }
  };


  if (loading) {
    return <Loader noDesign notCenter/>; // Show loader while data is being fetched
  }

  if (!course) {
    return <div>No course found.</div>; // Handle the case when no course is found
  }

    const totalModules = course.modules.length;
    const pricePerModule = course.price / totalModules;

    return (
      <div className="mx-auto relative container w-full max-w-[4000px]">
          <GeneralNavbar />
          <Toaster />

          <PathwayHero 
          coursePage={true}
          bgColor='bg-blue-500'
          desc='Turn your passion for technology into a thriving career 
          in software engineering or DevOps. Begin your path with us'
          header={`${course.subject}`}
          level={`${course.level}`}
          image={`${course.image ? `https://wificombatacademy.com/${course.image}` : `` }`}
          course={course}
          />

          <CourseOverview 
          desc={course.note ?? ''}
          />

          <Modules 
          modules={course.modules} 
          pricePerModule={pricePerModule}
          courseLevel={course.level}
          />

          <TodayComp 
          desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas 
          faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis." 
          header="Start Coding Today!" 
          linkto="/schools/pricing-plan" />

          <FAQ noSpace/>

          <Footer />
      </div>
    )
   }
export default Page