"use client";
import DashboardHeader from "@/app/components/Dashboard/DashboardHeader";
import { PortfolioCard } from "@/app/components/Dashboard/PortfolioCard";
import SideBar from "@/app/components/Dashboard/SideBar";
import { useMain } from "@/app/context/MainContext";
import { raleway } from "@/app/fonts";
import { sections } from "@/app/utils/types-and-links";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {toggleSidebar} = useMain();
  const [selectedSection, setSelectedSection] = useState("Student Portfolio");

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
              <div className="w-[95%] mx-auto mt-5 flex items-center justify-between">
                <div className="flex gap-4 md:gap-7 items-center justify-between text-black-500 text-xl">
                {sections.map((level) => (
                    <h2
                      key={level}
                      className={`cursor-pointer 
                      ${selectedSection === level ? "text-black-500 border-b-2 border-black-500 font-semibold" : ""}`}
                      onClick={() => setSelectedSection(level)}
                    >
                      {level}
                    </h2>
                ))}
                </div>

                <div>
                  <button 
                  className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-black-500 text-white 
                      py-2 md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                      transition duration-300 hover:bg-opacity-90 rounded-lg`}>
                      Add
                  </button>
                </div>
              </div>
                {selectedSection === "Student Portfolio" &&  <PortfolioCard />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;