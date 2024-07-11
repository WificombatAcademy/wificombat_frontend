"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigation = [
  { name: "Career Pathway", href: "/career-pathway" },
  { name: "Students", href: "/students" },
  { name: "Schools", href: "/schools" },
  { name: "Portfolio & Projects", href: "/portfolio-and-projects" },
  { name: "Play Games", href: "/play-games" },
  { name: "Login", href: "/login" },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open:boolean) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideBar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const pathname = usePathname();
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
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-full top-0 flex w-16 justify-center pt-5">
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
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#0C0C0D] px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                <Image
                  src="/wificombat.svg"
                  alt="homepage"
                  className="mt-6 md:h-24 w-24 px-2.5 py-2 object-contain"
                  width={"96"}
                  height={"96"} />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={`${item.href}`}
                              className={classNames(
                                pathname === item.href
                                  ? "text-[#F2F2F3]"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 rounded-md p-3 text-lg leading-6 font-semibold"
                              )}
                              style={
                                pathname === item.href
                                  ? {
                                      background:
                                        "conic-gradient(from 173.86deg at 50% 50%, #FFB600 -13.12deg, #BC00DD 120deg, #0784C3 181.87deg, #FFB600 346.88deg, #BC00DD 480deg)",
                                    }
                                  : {}
                              }
                            >
                              {item.name}
                            </Link>
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




{/* <Image
src="/wificombat.svg"
alt="homepage"
className="mt-6 md:h-24 w-24 px-2.5 py-2 object-contain"
width={"96"}
height={"96"}
/> */}