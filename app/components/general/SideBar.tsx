"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

export const navigation = [
  { name: "Career Pathway", href: "/career-pathway" },
  { name: "Students", href: "/students" },
  { name: "Schools", href: "/schools" },
  { name: "Portfolio & Projects", href: "/portfolio-and-projects" },
  { name: "Play Games", href: "/play-games" },
  { name: "Login", href: "/login" },
];

type Props  ={
    sidebarOpen: boolean;
    setSidebarOpen : Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ sidebarOpen, setSidebarOpen }: Props) => {
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

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative mk-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
               <div className="absolute">
                  
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0C0C0D] px-8 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  {/* <Logo /> */}
                  <Image
                    src="/wificombat.svg"
                    alt="homepage"
                    className="mt-6 md:h-24 w-24 px-2.5 py-2 object-contain"
                    width={"96"}
                    height={"96"}
                />
                </div>
                <nav className="mt-4 flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-5 text-lg">
                        {navigation.map((item) => (
                          <li
                            key={item.name}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <a href={item.href} className={`${item.href === "/login" ? "text-[#0784C3]" : "text-white"}`}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
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
