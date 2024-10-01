"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import Header from "./Header";

type Props = {
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
    name?: string;
}

const DashboardHeader = ({setSidebarOpen, name}: Props) => {
  return (
    <div className="sticky top-0 z-40 flex shrink-0 items-center gap-x-4 bg-white sm:gap-x-6">
        <button
            type="button"
            className="p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
        >
            <span className="sr-only">Open sidebar</span>
            <HiBars3 size={30} className="h-8 w-8" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
        />

        <Header name={name}/>
    </div>
  )
}

export default DashboardHeader