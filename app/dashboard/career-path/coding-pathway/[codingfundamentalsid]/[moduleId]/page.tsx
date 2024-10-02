"use client";

import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { useState } from "react";

const Page = () => {
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
          
          <DashboardHeader setSidebarOpen={setSidebarOpen}/>

          <main className="pb-10">
            <div className="space-y-10">
              <div className="flex max-lg:flex-col-reverse max-lg:gap-6">
                <div className="w-full h-screen lg:w-[40%] xl:w-[35%] px-4 sm:px-6 lg:px-8 space-y-5 overflow-y-auto">
                  {/* module */}
                  module
                  {/* module */}
                </div>
                

                <div className="w-full h-screen lg:w-[60%] xl:w-[65%] bg-[#F9F9FF] px-4 pb-16 sm:px-6 lg:px-8 space-y-4">
                  {/* content */}
                   content
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