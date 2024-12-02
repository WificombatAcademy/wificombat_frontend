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

       
        </div>
      </div>
    </>

    )
}

export default Page;