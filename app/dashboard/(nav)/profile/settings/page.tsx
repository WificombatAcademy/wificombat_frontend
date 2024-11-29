

"use client";

import { useMain } from "@/app/context/MainContext";
import { useDashboardStore } from "@/app/context/useDashboardStore";
import { raleway } from "@/app/fonts";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";






const Page = () => {
    const { dashboardData } = useDashboardStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {toggleSidebar} = useMain();

    const [setting, setSetting] = useState(1);
    function nextSetting(){
        setSetting(2);
    }


    function prevSetting(){
        setSetting(1);
    }

    return (
        
        <>    
      { setting === 1 && (
          <div className="ml-96 mt-32">
             <div className="flex">
            <IoChevronBackOutline className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
               <p>Settings</p> 
             </div>
          <div className="flex">
            <div>
            <p>Change Password</p>
            <p>You can make changes to your password or create a new password.</p>
        </div>
        <IoChevronBackOutline
        onClick={nextSetting}
        className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
           </div>
           <div className="flex">
            <div>
             <p>Notification</p>
             <p>You can make changes to how you get your notification.</p>
            </div>
            <IoChevronBackOutline className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
           </div>
          </div>
          )}
          { setting === 2 && (
            <div className="ml-80 mt-32">
            <div className="flex">
             <IoChevronBackOutline 
             onClick={prevSetting}
             className="max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm" />
             <p>Chaning password</p> 
          </div>

          <div className="mx-auto w-full bg-[#F2F2F3] rounded-lg">
           <div className="mt-32 py-6 px-6">
             <div>
              <p className="mb-7">Change passowrd</p>
               <form className="space-y-6">
                 <>
               
                 <div className="w-full">
                     <label
                       htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900"
                     >
                      Curret password
                     </label>
                     <div className="mt-2">
                       <input
                         type="text"
                         placeholder="*********"
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
                       New Password
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="*********"
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
                       Confirm New Password
                     </label>
                     <div className="mt-2 relative">
                       <div
                         className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"                    >
                        
                       </div>
 
                       <input
                         type="email"
                         placeholder="*********"
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
          )}
        </>
    )
}

export default Page

