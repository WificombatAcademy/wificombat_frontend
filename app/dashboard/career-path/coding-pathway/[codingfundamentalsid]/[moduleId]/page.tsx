"use client";

import Header from "@/app/components/Dashboard/Header";
import SideBar from "@/app/components/Dashboard/SideBar";
import { raleway } from "@/app/fonts";
import { Courses, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { SlLock } from "react-icons/sl";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div>
        {/* Static sidebar for desktop */}

        {/* header/ MAIN SECTION Start */}
        <div className={`lg:pl-64 ${raleway.className}`}>
          <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-white sm:gap-x-6">
          <button
              type="button"
              className="p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiBars3 size={30} className="h-8 w-8" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <Header />
          </div>

          <main className="pb-10 mt-2">
            <div className="px-4 sm:px-6 lg:px-8 space-y-10">
                module
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;