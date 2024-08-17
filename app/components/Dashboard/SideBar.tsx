"use client";

import { raleway } from "@/app/fonts";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import {
  MdGroups,
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import { navigation } from "./DesktopSidebar";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open:boolean) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideBar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | undefined>();

  const handleExpand = (name: string) => {
    setExpanded(expanded === name ? undefined : name);
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FaXmark
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className={`${raleway.className} 
              flex grow flex-col gap-y-5 overflow-y-auto bg-[#0C0C0D] px-6 pb-4 ring-1 ring-white/10`}>
                <div className="flex h-16 shrink-0 items-center">
                <Image
                  src={`/assets/auth/logo.svg`}
                  alt={`logo`}
                  width={60}
                  height={60}
                  className="object-contain text-neutral-400"
                />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <div
                              onClick={() => {
                                if (item.subNav) handleExpand(item.name);
                              }}
                              className={classNames(
                                pathname === item.href
                                  ? "text-[#F2F2F3]"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 items-center rounded-md p-3 text-lg leading-6 font-semibold cursor-pointer"
                              )}
                              style={
                                pathname === item.href
                                  ? {
                                      background:
                                        "#0784C3",
                                    }
                                  : {}
                              }
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}

                              {item.subNav && 
                              item.subNav.length > 0 && (
                                <div
                                  className={`ml-auto ${expanded === item.name ? "rotate-180" : ""}`}
                                >
                                  {expanded === item.name ? (
                                     <IoMdArrowDropdown size={25} />
                                    ) : (
                                      <IoMdArrowDropup size={25} />
                                  )}
                                </div>
                              )}
                            </div>
                            {item.subNav &&
                            item.subNav.length > 0 && expanded === item.name && (
                              <ul className="pl-8 space-y-2 mt-2">
                                {item.subNav.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className={classNames(
                                        pathname === subItem.href
                                          ? "text-[#F2F2F3]"
                                          : "text-gray-400 hover:text-white hover:bg-gray-800",
                                        "group flex gap-x-3 rounded-md p-2 text-base leading-5 font-medium"
                                      )}
                                      style={
                                        pathname === subItem.href
                                          ? { background: "#0784C3" }
                                          : {}
                                      }
                                    >
                                      {subItem.name}
                                    </Link>
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
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideBar;
