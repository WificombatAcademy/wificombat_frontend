"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import axiosInstance from "@/app/utils/auth-interceptor";
import Loader from "@/app/utils/loader";
import { API_VERSION_ONE } from "@/app/utils/types-and-links";
import { useEffect, useState } from "react";

const Page = ({params}: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [lessons, setLessons] = useState<any[]>([]); // State to hold lessons
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedContent, setSelectedContent] = useState<any | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
        try {
            const response = await axiosInstance.get(`${API_VERSION_ONE}/module/${params.moduleId}/lessons`);
            setLessons(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching lessons:', error);
            setLoading(false);
        }
        finally {
          setLoading(false);
        }
    };

    fetchLessons();
}, [params.moduleId]);

if (loading) return <div className="overflow-hidden"> <Loader noDesign />;</div>

if (!lessons) return <div className="overflow-hidden"> <Loader isError/> </div>

  console.log(lessons);

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
        <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username} />

          <main className="pb-10">
            <div className="space-y-10">
              <div className="flex max-lg:flex-col-reverse max-lg:gap-6">
                <div className="w-full h-screen lg:w-[40%] xl:w-[35%] px-4 sm:px-6 lg:px-8 space-y-5 overflow-y-auto">
                  {/* module */}
                  
                  {/* module */}
                </div>
                

                <div className="w-full h-screen lg:w-[60%] xl:w-[65%] bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4">
                  {/* content */}
                  <div className="w-full h-screen overflow-y-scroll bg-[#F9F9FF] 
                  px-4 pb-16 sm:px-6 lg:px-8 space-y-4">
                      
                  </div>
                  {/* content */}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;