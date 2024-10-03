"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import Header from "@/app/components/Dashboard/Header";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import { Courses, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";
import { TbJewishStarFilled } from "react-icons/tb";

const Page = () => {
  const { dashboardData, setDashboardData } = useDashboardStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${raleway.className} relative`}>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`${toggleSidebar ? "lg:pl-36" : "lg:pl-64"}
        transition-all duration-500 ease-in-out`}>
          
          <DashboardHeader setSidebarOpen={setSidebarOpen} name={dashboardData?.username}/>

          <main className="pb-10">
            <div className="px-4 sm:px-6 lg:px-8 lg:py-6 space-y-10">
                <div className="z-[1] relative w-full h-[12rem] lg:h-[14rem]">

                  <Image 
                  width={1110}
                  height={252}
                  alt="profile"
                  src={`/profile-bg.jpeg`}
                  className="z-[1] relative w-full h-full object-cover rounded-2xl"
                  />

                  <div className="absolute border-4 left-9 md:left-14 bottom-[-3rem] md:bottom-[-5rem] 
                  w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full">
                  <Image 
                  width={1110}
                  height={252}
                  alt="profile"
                  src={`/profile-bg.jpeg`}
                  className="w-full h-full object-cover rounded-full rotate-[-120deg]"
                  />

                  <div className="z-[3] top-[25%] left-[17%] md:left-[15%] absolute 
                  w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full">
                    <Image 
                    src={`/dashboard-logo.png`}
                    alt="profile"
                    width={381}
                    height={480}
                    className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  </div>

                </div>

                <div className="w-full max-lg:mt-3 lg:pl-[7%] border-2">
                  <div className="lg:pl-[7%] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <TbJewishStarFilled size={23} className="text-purple-500" />
                    </div>
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