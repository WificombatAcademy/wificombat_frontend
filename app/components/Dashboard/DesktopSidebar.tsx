"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/app/utils"; 
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
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
import { TbFileCertificate } from "react-icons/tb";
import { raleway } from "@/app/fonts";
import Link from "next/link";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdOutlineDashboard,
    current: true,
    comingSoon: false,
  },
  {
    name: "Career Path",
    href: "",
    icon: IoBookOutline,
    current: false,
    comingSoon: false,
    subNav: [
      {
        name: "Coding Pathway",
        href: "/dashboard/career-path/coding-pathway",
      },
    ],
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: HiOutlineTrophy,
    current: false,
    comingSoon: false,
  },
  {
    name: "My Profile",
    href: "/profile",
    icon: MdOutlineAccountCircle,
    current: false,
    comingSoon: false,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: TbFileCertificate,
    current: false,
    comingSoon: false,
  },
  {
    name: "Mentorship",
    href: "/",
    icon: MdGroups,
    current: false,
    comingSoon: false,
  },
];

const DesktopSidebar = () => {
  const pathname = normalizePath(usePathname()); 
  const [showIconsOnly, setShowIconsOnly] = useState(false);
  const [activeLink, setActiveLink] = useState<string | undefined>();
  const [toggleButtonVisible, setToggleButtonVisible] = useState(true);
  const [expanded, setExpanded] = useState<string | undefined>();

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

  const handleToggle = () => {
    if (showIconsOnly) {
      setToggleButtonVisible(false); 
      setTimeout(() => {
        setShowIconsOnly(!showIconsOnly);
        setTimeout(() =>setToggleButtonVisible(true), 300); // Show the button after the sidebar transition
      }, 100)
    } 
    else {
      setShowIconsOnly(!showIconsOnly);
    }
  };

  const handleExpand = (name: string) => {
    setExpanded(expanded === name ? undefined : name);
  };

  const isCareerPathActive = pathname.startsWith("/dashboard/career-path");

  return (
    <div className={`hidden lg:fixed lg:inset-y-0 z-50 lg:flex lg:flex-col 
    transition duration-700 ease-in-out ${showIconsOnly ? "w-fit" : "lg:w-64"}`}>

      <motion.div 
      initial="full"
      animate={showIconsOnly ? "iconsOnly" : "full"}
      variants={sidebarVariants}
      className={` ${raleway.className} flex grow flex-col gap-y-16 overflow-y-auto bg-[#0C0C0D] px-6 pb-4`}>

      {toggleButtonVisible && ( 
        <motion.div
        whileHover={{scale:1.1 }}
          whileTap={{scale:0.9 }}
          transition={{duration:1 }}
          onClick={handleToggle}className="toggle-button hidden z-[53] small-view-arrow-bg absolute h-8 w-8 bg-white lg:flex items-center 
          justify-center rounded-full border border-blue-500 shadow-xl top-8 right-[-1rem] transition 
          duration-300 cursor-pointer"
        >
          {showIconsOnly ? (
            <MdOutlineKeyboardDoubleArrowRight size={14} className="" />
          ) : (
            <MdOutlineKeyboardDoubleArrowLeft size={14}className="" />
          )}
        </motion.div>
      )}

        <div className="flex h-16 shrink-0 items-center">
         <Image
            src={`/assets/auth/logo.svg`}
            alt={`logo`}
            width={60}
            height={60}
            className="mt-5 object-contain text-neutral-400"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-5">
                {navigation.map((item) => (
                  <li key={item.name} className="">

                  <Link href={item.href} 
                    onClick={() => {
                      if (item.subNav) handleExpand(item.name);
                    }}
                    className={classNames(
                      item.comingSoon
                        ? `text-gray-400 pointer-events-none cursor-not-allowed`
                        : normalizePath(pathname) === normalizePath(item.href) ||
                        (isCareerPathActive && item.name === "Career Path")
                        ? `text-[#F2F2F3]`
                        : `text-gray-400 hover:text-white hover:bg-gray-800`,
                      `group flex items-center gap-x-3 rounded-md p-3 text-lg leading-6 
                      font-medium transition duration-700 ease-in-out ${
                        showIconsOnly && "w-fit mx-auto"
                      }`
                    )}
                    style={
                      normalizePath(pathname) === normalizePath(item.href) ||
                       (isCareerPathActive && item.name === "Career Path")
                        ? { background: "#0784C3" }
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

                    {(item.subNav && !showIconsOnly) && (
                    <div className={`ml-1`}>
                      {expanded === item.name ? (
                        <IoMdArrowDropdown size={25} />
                      ) : (
                        <IoMdArrowDropup size={25} />
                      )}
                    </div>
                    )}

                  </Link>

                  {item.subNav && expanded === item.name && !showIconsOnly && (
                    <ul className="pl-8 space-y-2 mt-2">
                      {item.subNav.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            className={classNames(
                              normalizePath(pathname) === normalizePath(subItem.href)
                                ? `text-[#F2F2F3]`
                                : `text-gray-400 hover:text-blue-500`,
                              `group flex gap-x-3 rounded-md p-2 text-base text-center leading-5 font-medium 
                              transition duration-300 ease-in-out`
                            )}
                            style={
                              normalizePath(pathname) === normalizePath(subItem.href)
                                ? { color: "#0784C3" }
                                : {}
                            }
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
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