"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useNavbarVisibility,
  useScrollToView,
} from "../../hooks";
import { RiMenu2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Popup from "./Popup";
import { schoolLinks, studentLinks } from "@/app/utils/types-and-links";
import MobileSideBar from "./SideBar";

type Props = {};

const StaticNav = (props: Props) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schoolsPopupVisible, setSchoolsPopupVisible] = useState(false);
  const [studentsPopupVisible, setStudentsPopupVisible] = useState(false);
  const scrollToView = useScrollToView();
  const { removeNavbar } = useNavbarVisibility();

  return (
    <motion.nav
      className={`max-w-screen z-20 w-full bg-black transition-all duration-300 ease-in-out
      ${removeNavbar ? "hidden" : "relative"}
      `}
    >
      <MobileSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ul className="mx-auto flex max-w-6xl items-center justify-between lg:justify-center gap-4 max-lg:pr-4">
        <Link
          href="/features"
          onClick={() => scrollToView("features")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
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
            className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden cursor-pointer ${
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
            className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden cursor-pointer ${
              pathname.startsWith("/schools") ? "border-b-4 border-blue-500" : ""
            }`}
          >
            Schools
          </li>
          {schoolsPopupVisible && <Popup links={schoolLinks} />}
        </div>
        <Link href="/">
          <Image
            src="/wificombat.svg"
            alt="homepage"
            className="md:h-24 w-24 px-2.5 py-2 object-contain"
            width={"96"}
            height={"96"}
          />
        </Link>
        <Link
          href="/portfolio-and-projects"
          onClick={() => scrollToView("portfolio-and-projects")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/portfolio-and-projects"
              ? "border-b-4 border-blue-500"
              : ""
          }`}
        >
          Portfolio & Projects
        </Link>
        <Link
          href="/play-games"
          onClick={() => scrollToView("play-games")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/play-games" ? "border-b-4 border-blue-500" : ""
          }`}
        >
          Play Games
        </Link>
        <Link
           href="/login"
           className={`xl:absolute right-[7%] 2xl:right-[5%] px-8 py-3 text-lg capitalize bg-white font-bold 
             rounded-lg max-lg:hidden transition-colors duration-300 hover:bg-opacity-90
           }`}
        >
          Login
        </Link>
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

export default StaticNav;
