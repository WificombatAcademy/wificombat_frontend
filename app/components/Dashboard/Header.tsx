import { classNames } from "@/app/utils";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { HiOutlineBell, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Boy from "@/app/utils/boy";

interface StudentProfile {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  class: string;
  is_verified: boolean;
  parent: string;
  createdAt: string;
  updatedAt: string;
}

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

const Header = () => {

  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center py-7 lg:px-10 max-lg:pr-2.5 border-b border-black-50">
      <div className="text-lg lg:items-center font-semibold leading-6 text-gray-900 hidden lg:flex">
        <Boy />
        <div>
          <p>Hi, User</p>
          <p className="font-normal text-sm text-[#4B4B4E]">
            Please continue learning
          </p>
        </div>
      </div>

      <form className="max-w-xl ml-auto flex-1 flex items-center">
        <label
          htmlFor="search-field"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiOutlineMagnifyingGlass
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            id="search-field"
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search for courses, lessons, assignment...."
          />
        </div>
      </form>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-[#636369] bg-[#E6F6FE] rounded-lg hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <div
              style={{
                border: "1px solid",
                padding: "1px",
                background:
                  "#0784C3",
                borderRadius: "50%",
                display: "inline-block",
              }}
            >
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover aspect-auto bg-gray-50"
                src="/dashboard-logo.png"
                alt=""
              />
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
