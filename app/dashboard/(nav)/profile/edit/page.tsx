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

           <div className="mx-auto w-full bg-[#F2F2F3] rounded-lg">
           <div className="mt-32 py-6 px-6">
             <div>
              <p className="mb-7">My Infomation</p>
               <form className="space-y-6">
                 <>
               
                 <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                      Full Name
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Johnson Annabel"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                   <div className="flex flex-col lg:flex-row lg:gap-x-4">
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Email Adress
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="Email"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                  
                   <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Age
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="12"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                       />
                 
                         <p className="text-[#F00101]">
                         </p>
         
                     </div>
                   </div>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-x-4">
                   <div className="w-full">
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Country
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="chrisland@gmail.com"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div className="w-full">
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       State
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="text"
                         placeholder="Lagos"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   </div>

                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Interest
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="Dancing, Singing"
                         className="block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                       Description
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="A little about yourself"
                         className="block outline-none w-full rounded-md border border-gray-600 py-8 px-8 shadow-sm ring-1 
                           ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                           focus:ring-[#B1B1B4] sm:text-sm sm:leading-6"
                         
                       />
                         <p className="text-[#F00101]">
                     
                         </p>
                     </div>
                   </div>
                   <div className="mt-14 flex justify-end">
                     <button
                       type="submit"
                       className="flex w-48 justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                       p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#B1B1B4] focus-visible:outline 
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B1B1B4]"
                     >
                    Save Changes
                     </button>
                   </div>
 
                   
                 </>
               </form>
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