"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/app/utils"; 
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import {
  MdGroups,
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineLogout,
} from "react-icons/md";
import { motion } from "framer-motion";
import { normalizePath } from "@/app/utils/paths";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdOutlineDashboard,
    current: true,
    comingSoon: false,
  },
  {
    name: "My Courses",
    href: "/dashboard/courses",
    icon: IoBookOutline,
    current: false,
    comingSoon: false,
  },
  {
    name: "Mentorship",
    href: "#",
    icon: MdGroups,
    current: false,
    comingSoon: false,
  },
  {
    name: "Leaderboard",
    href: "#",
    icon: HiOutlineTrophy,
    current: false,
    comingSoon: false,
  },
  {
    name: "My Profile",
    href: "#",
    icon: MdOutlineAccountCircle,
    current: false,
    comingSoon: false,
  },
];

const DesktopSidebar = () => {
  const pathname = normalizePath(usePathname()); 
  const [showIconsOnly, setShowIconsOnly] = useState(false);
  const [activeLink, setActiveLink] = useState<string | undefined>();
  const router = useRouter();

  const sidebarVariants = {
    iconsOnly: {
      width: "8rem", // Width when showing icons only
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    full: {
      width: "16rem", // Full width when showing sidebar content
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // if (!pathname.isReady) {
  //   return null;
  // }
  return (
    <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition duration-700 ease-in-out ${showIconsOnly ? "w-fit" : "lg:w-64"}`}>

      <motion.div 
      initial="full"
      animate={showIconsOnly ? "iconsOnly" : "full"}
      variants={sidebarVariants}
      className={`flex grow flex-col gap-y-6 overflow-y-auto bg-[#0C0C0D] px-6 pb-4`}>

        <div className="flex h-16 shrink-0 items-center">
         <Image
            src={`/assets/auth/logo.svg`}
            alt={`logo`}
            width={80}
            height={80}
            className="mt-5 object-contain text-neutral-400"
          />
        </div>

       <div className=" z-[53] w-full hidden lg:flex items-center justify-end mb-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} 
          transition={{ duration: 1 }}
          onClick={() => setShowIconsOnly(!showIconsOnly)}
          className="relative right-[-2rem] small-view-arrow-bg h-8 w-8 bg-white flex items-center justify-center 
          rounded-full border border-blue-500 shadow-xl transition duration-300 cursor-pointer">
            {showIconsOnly ?
            <MdOutlineKeyboardDoubleArrowRight size={14} className=""/> 
            :
            <MdOutlineKeyboardDoubleArrowLeft size={14} className=""/>}
          </motion.div>
       </div>


        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setActiveLink(item.name)}
                      className={classNames(
                        item.comingSoon
                          ? `text-gray-400 pointer-events-none cursor-not-allowed`
                          : normalizePath(pathname) === normalizePath(item.href) || (normalizePath(item.href) === "/dashboard/courses" && pathname.startsWith(normalizePath("/dashboard/courses/TeenTechPreneurship")))
                          ? `text-[#F2F2F3]`
                          : `text-gray-400 hover:text-white hover:bg-gray-800`,
                        `group flex gap-x-3 rounded-md p-3 text-lg leading-6 font-medium transition duration-700 ease-in-out ${showIconsOnly && "w-fit mx-auto"}`
                      )}
                      style={
                        normalizePath(pathname) === normalizePath(item.href) || (normalizePath(item.href) === "/dashboard/courses" && pathname.startsWith(normalizePath("/dashboard/courses/TeenTechPreneurship")))
                          ? {
                              background:
                                "#0784C3",
                            }
                          : {}
                      }
                    >
                      <item.icon
                        className={`h-6 w-6 shrink-0 ${showIconsOnly && "mx-auto"}`}
                        aria-hidden="true"
                      />
                      {!showIconsOnly && item.name}
                      {!showIconsOnly && item.comingSoon && (
                        <span className="basis-[30%] inline-flex items-center text-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          Coming Soon
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <MdOutlineLogout
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default DesktopSidebar;