"use client"
import { z } from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";
import { useState } from "react";
import { FormDataSchema } from "@/app/utils/schema";
import { merriweather } from "@/app/fonts";

type Inputs = z.infer<typeof FormDataSchema>

const AssessmentForm = () => {
    const router = useRouter();
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
      } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
      })
    
      const processForm: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
      }

    const Navigations = () => {
        return (
            <div className="mt-16 w-full flex items-center justify-between text-black-500">
                <button
                disabled={currentStep <= 0}
                className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                disabled:text-gray-400">
                    Previous
                </button>  

                <div>
                    {currentStep + 1} of 8
                </div>

                <button
                disabled={currentStep >= 8}
                className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                disabled:text-gray-400">
                    Next
                </button> 
            </div>
        )
    }

    return (
        <section className="relative w-full h-screen bg-white flex lg:items-center justify-center overflow-y-scroll">
            <AssessmentDesign />
            <div className="w-[90%] md:w-[85%] mx-auto">
               <div className="">                 
                    <IoChevronBackOutline
                        size={24}
                        onClick={() => router.back()}
                        className="absolute left-3 lg:left-[5rem] top-3 lg:top-8 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
                    />
               </div>


                <form 
                className="z-20 relative text-black-500">
                    {currentStep === 0 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-8 space-y-4">
                                <h3 className="font-medium">Name</h3>

                                <input 
                                type="text"
                                placeholder="Enter your name"
                                required
                                className="outline-none w-full p-3 border border-black-300 rounded-lg placeholder:text-[#656765]"
                                />
                            </div>

                            <Navigations />
                        </div>
                    )}
                </form>
            </div>


        </section>
    )
}


export default AssessmentForm