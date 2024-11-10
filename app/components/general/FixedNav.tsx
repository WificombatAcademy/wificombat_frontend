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
import { getCookie } from "cookies-next";
import { FaUserCircle } from "react-icons/fa";

type Props = {};

const FixedNav = (props: Props) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [schoolsPopupVisible, setSchoolsPopupVisible] = useState(false);
const [studentsPopupVisible, setStudentsPopupVisible] = useState(false);
  const scrollToView = useScrollToView();
  const { isVisible } = useNavbarVisibility();

  const controls = useAnimation();
  const session = getCookie('session_id') || getCookie('user_id');

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
      {/* <ul className="mx-auto p-4 flex lg:w-fit items-center justify-between 
      lg:justify-center gap-4 max-lg:pr-4 lg:pr-44 min-[1200px]:pr-32"> */}
        <div className="mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/E-learn_logo.png"
                alt="homepage"
                width={150}
                height={150}
                className="max-w-[120px] md:max-w-[150px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/features"
              onClick={() => scrollToView("features")}
              className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                text-white hover:text-[#0784C3] ${
                pathname === "/features" ? "border-b-4 border-blue-500" : ""
              }`}
            >
              Features
            </Link>

            <div
              className="relative list-none"
              onMouseEnter={() => setStudentsPopupVisible(true)}
              onMouseLeave={() => setStudentsPopupVisible(false)}
              onClick={() => setStudentsPopupVisible(!studentsPopupVisible)}
            >
              <li
                className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                  text-white hover:text-[#0784C3] cursor-pointer ${
                  pathname.startsWith("/students") ? "border-b-4 border-blue-500" : ""
                }`}
              >
                Students
              </li>
              {studentsPopupVisible && <Popup links={studentLinks} />}
            </div>

            <div
              className="relative list-none"
              onMouseEnter={() => setSchoolsPopupVisible(true)}
              onMouseLeave={() => setSchoolsPopupVisible(false)}
              onClick={() => setSchoolsPopupVisible(!schoolsPopupVisible)}
            >
              <li
                className={`px-2.5 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                  text-white hover:text-[#0784C3] cursor-pointer ${
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
                text-white hover:text-[#0784C3] ${
                pathname === "/portfolio-and-projects" ? "border-b-4 border-blue-500" : ""
              }`}
            >
              Portfolio & Projects
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/assessment"
              className="px-4 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                border border-white text-white font-bold rounded-lg 
                transition-colors duration-300 hover:bg-slate-50/20"
            >
              Take Assessment
            </Link>

            <Link
              href={"/login"}
              className={`px-8 py-2 text-sm min-[1200px]:text-base min-[1400px]:text-lg capitalize
                ${session ? "bg-white font-bold flex items-center gap-2" : "bg-white font-bold"}
                rounded-lg transition-colors duration-300 hover:bg-opacity-90`}
            >
              {/* {session ?  "Login"  : <> Dashboard <FaUserCircle /></>} */}
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            {/* <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            > */}
              <RiMenu2Line size={25}
                 onClick={() => setSidebarOpen(true)}
                 className="text-gray-300 lg:hidden"
              />
            {/* </button> */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default FixedNav;
