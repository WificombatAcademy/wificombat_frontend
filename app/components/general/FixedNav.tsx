"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useNavbarVisibility,
  useScrollToView,
} from "../../hooks";
import { RiMenu2Line } from "react-icons/ri";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Popup, { PopupProps } from "./Popup";
import { schoolLinks, studentLinks } from "@/app/utils/types-and-links";
import MobileSideBar from "./SideBar";

type Props = {};

const FixedNav = (props: Props) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schoolsPopupVisible, setSchoolsPopupVisible] = useState(false);
const [studentsPopupVisible, setStudentsPopupVisible] = useState(false);
  const scrollToView = useScrollToView();
  const { isVisible } = useNavbarVisibility();

  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({ y: 0, transition: { duration: 0.3 } });
    } else {
      controls.start({ y: -100 });
    }
  }, [isVisible, controls]);

  return (
    <motion.nav
      className={`max-w-screen z-20 w-full overflow-visible bg-black transition-all duration-300 ease-in-out sm:w-full
      ${isVisible ? "fixed left-0 top-0 min-[2000px]:relative" : "hidden"}
      `}
      animate={controls}
      initial={{ y: -100 }}
    >
      <MobileSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ul className="mx-auto p-4 flex lg:w-fit items-center justify-between 
      lg:justify-center gap-4 max-lg:pr-4 lg:pr-44 min-[1200px]:pr-32">
          <Link href="/">
          <Image
            src="/E-learn_logo.png"
            alt="homepage"
            width={200}
            height={200}
          />
        </Link>
        <div className="flex mr-40 gap-3"> 
        <Link
          href="/features"
          onClick={() => scrollToView("features")}
          className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
             text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/features" ? "border-b-4 border-blue-500" : ""
          }`}
        >
          Features
        </Link>
        <div
          className="relative max-lg:hidden"
          onMouseEnter={() => setStudentsPopupVisible(true)}
          onMouseLeave={() => setStudentsPopupVisible(false)}
          onClick={() => setStudentsPopupVisible(!studentsPopupVisible)}
        >
          <li
            className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
               text-white hover:text-[#0784C3] max-lg:hidden cursor-pointer ${
              pathname.startsWith("/students") ? "border-b-4 border-blue-500" : ""
            }`}
          >
            Students
          </li>
          {studentsPopupVisible && <Popup links={studentLinks} />}
        </div>
        <div 
        className="relative max-lg:hidden"
        onMouseEnter={() => setSchoolsPopupVisible(true)}
        onMouseLeave={() => setSchoolsPopupVisible(false)}
        onClick={() => setSchoolsPopupVisible(!schoolsPopupVisible)}
        >
          <li
            className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
               text-white hover:text-[#0784C3] max-lg:hidden cursor-pointer ${
              pathname.startsWith("/schools") ? "border-b-4 border-blue-500" : ""
            }`}
          >
            Schools
          </li>
          {schoolsPopupVisible && <Popup links={schoolLinks} />}
        </div>
        <Link
          href="/portfolio-and-projects"
          onClick={() => scrollToView("portfolio-and-projects")}
          className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
             text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/portfolio-and-projects"
              ? "border-b-4 border-blue-500"
              : ""
          }`}
        >
          Portfolio & Projects
        </Link>
        {/* <Link
          href="/play-games"
          onClick={() => scrollToView("play-games")}
          className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
             text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/play-games" ? "border-b-4 border-blue-500" : ""
          }`}
        >
          Play Games
        </Link> */}
        </div>
        <div className="flex items-center gap-3 lg:absolute right-[3%] xl:right-[5%] 2xl:right-[7%] ">
          <Link
            href="/assessment"
            className={`px-2 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
               border border-white text-white font-bold 
              rounded-lg max-lg:hidden transition-colors duration-300 hover:bg-slate-50/20 cursor-pointer
            }`}
          >
            Take Assessment
          </Link>

          <Link
            href="/login"
            className={`px-8 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
               bg-white font-bold 
              rounded-lg max-lg:hidden transition-colors duration-300 hover:bg-opacity-90 cursor-pointer
            }`}
          >
            Login
          </Link>
        </div>
        
        <div className="pr-3">
          <RiMenu2Line
            onClick={() => setSidebarOpen(true)}
            size={25}
            className="text-gray-300 lg:hidden"
          />
        </div>
      </ul>
    </motion.nav>
  );
};

export default FixedNav;
