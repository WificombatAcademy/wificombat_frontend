"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import Image from "next/image";
import { useState } from "react";
import { TbJewishStarFilled } from "react-icons/tb";
import { BiSolidEdit } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";
import ProfileInfo from "@/app/components/Dashboard/Profile/profile-info";

const Page = () => {
  const { dashboardData } = useDashboardStore();
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

                  <div className="absolute left-9 lg:left-14 bottom-[-3rem] lg:bottom-[-5rem] 
                  w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full">
                  <Image 
                  width={1110}
                  height={252}
                  alt="profile"
                  src={`/profile-bg.jpeg`}
                  className="w-full h-full object-cover rounded-full rotate-[-120deg]"
                  />

                  <div className="z-[3] top-[25%] lg:top-[23%] left-[17%] lg:left-[15%] absolute 
                  w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-full">
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

                <div className="w-full max-lg:pt-3 lg:pl-[7%]">
                  <div className="lg:ml-[16%] flex items-center justify-between gap-3">

                    <div className="flex items-center gap-2">
                      <TbJewishStarFilled size={23} className="text-purple-500" />
                      <p className="text-xl font-semibold">3,001 p</p>
                    </div>

                    <div className="flex gap-2">
                      <a href="/dashboard/profile/edit"
                       className="border border-black-200 p-2 rounded-lg">
                        <BiSolidEdit size={23}/>
                      </a>

                      <a href="/dashboard/profile/settings"
                      className="border border-black-200 p-2 rounded-lg">
                        <SlSettings size={23}/>
                      </a>
                    </div>

                  </div>

                  <ProfileInfo />
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;