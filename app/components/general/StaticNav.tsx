"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useActiveSection,
  useNavbarVisibility,
  useScrollToView,
} from "../../hooks";
import { RiMenu2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { useState } from "react";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

type Props = {};

const StaticNav = (props: Props) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const scrollToView = useScrollToView();
  const { removeNavbar } = useNavbarVisibility();
  const activeSection = useActiveSection([
    "career-pathway",
    "students",
    "schools",
    "portfolio-and-projects",
    "play-games",
  ]);

  return (
    <motion.nav
      className={`max-w-screen z-20 w-full overflow-x-hidden bg-black transition-all duration-300 ease-in-out
      ${removeNavbar ? "hidden" : "relative"}
      `}
    >
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ul className="mx-auto flex max-w-6xl items-center justify-between lg:justify-center gap-4 max-lg:pr-4">
        <Link
          href="/career-pathway"
          onClick={() => scrollToView("career-pathway")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/career-pathway" ? "border-b-4 border-blue-500" : ""
          }`}
        >
          Career Pathway
        </Link>
        <Link
          href="/students"
          onClick={() => scrollToView("students")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/students" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          Students
        </Link>
        <Link
          href="/schools"
          onClick={() => scrollToView("schools")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/schools" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          Schools
        </Link>
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
            pathname === "portfolio-and-projects"
              ? "border-t-2 border-blue-500"
              : ""
          }`}
        >
          Portfolio & Projects
        </Link>
        <Link
          href="/play-games"
          onClick={() => scrollToView("play-games")}
          className={`px-2.5 py-2 text-lg capitalize text-white hover:text-[#0784C3] max-lg:hidden ${
            pathname === "/play-games" ? "border-t-2 border-blue-500" : ""
          }`}
        >
          Play Games
        </Link>
        <Link
          href="/login"
          className="px-2.5 py-2 text-lg capitalize text-[#0784C3] hover:text-[#0784C3] max-lg:hidden"
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
