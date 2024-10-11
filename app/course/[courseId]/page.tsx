"use client"

import { PathwayHero } from '@/app/components/CodingPathwayComps/hero'
import GeneralNavbar from '@/app/components/general/GeneralNavbar'
import axiosInstance from '@/app/utils/auth-interceptor'
import { API_VERSION_ONE } from '@/app/utils/types-and-links'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const page = ({ params }: any) => {
  const { courseId } = params;
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const courseTitle = searchParams.get("title");
  const courseSubject = searchParams.get("subject");
  const courseImage = searchParams.get("image");
  const courseDescription = searchParams.get("description");
  const courseLevel = searchParams.get("level");

  useEffect(() => {
    if (courseId) {
      fetchCourseData(courseId); // Fetch both course details and modules
    }
  }, [courseId]);

  // Fetch the course details and modules together
  const fetchCourseData = async (id: string) => {
    setLoading(true);
    try {
      const [courseResponse, modulesResponse] = await Promise.all([
        axiosInstance.get(`${API_VERSION_ONE}/career-pathway/20/courses`),
        axiosInstance.get(`${API_VERSION_ONE}/course/${id}/modules`)
      ]);
      setCourse(courseResponse.data); // Assume response contains course details
      setModules(modulesResponse.data); // Set modules
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false); // Done loading both requests
    }
  };
  

  if(!loading) {
    return (
      <div className="mx-auto relative container w-full max-w-[4000px]">
          <GeneralNavbar />
          <PathwayHero 
          coursePage={true}
          bgColor='bg-blue-500'
          desc='Turn your passion for technology into a thriving career 
          in software engineering or DevOps. Begin your path with us'
          header={`${courseSubject}`}
          level={`${courseLevel}`}
          image={`${courseImage ? `https://wificombatacademy.com/${courseImage}` : `` }`}
          />
      </div>
  
    )
  }
}

export default page