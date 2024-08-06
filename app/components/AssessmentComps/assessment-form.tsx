"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";

const AssessmentForm = () => {
    const router = useRouter();
    return (
        <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-y-scroll">
            <AssessmentDesign />
            
            <div className="w-[90%] md:w-[85%] mx-auto">
               <div className="">                 
                    <IoChevronBackOutline
                        size={24}
                        onClick={() => router.back()}
                        className="absolute left-3 lg:left-[5rem] top-3 lg:top-8 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
                    />
               </div>
            </div>

            
        </section>
    )
}


export default AssessmentForm