"use client"
import { z } from "zod";
import { useRouter } from "next/navigation";
import { IoCheckmark, IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";
import { act, useEffect, useState } from "react";
import { FormDataSchema } from "@/app/utils/schema";
import { merriweather } from "@/app/fonts";
import Link from "next/link";
import { API, assessmentAges, assessmentGender, assessmentImages, stage } from "@/app/utils/types-and-links";
import Image from "next/image";
import axios from "axios";

type Inputs = z.infer<typeof FormDataSchema>

type Option = {
    [key: string]: number;
  };
  

type Assessment = {
    id: number;
    question: string;
    category: string;
    options: Option;
}

const AssessmentForm = () => {
    const router = useRouter();
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedAge, setSelectedAge] = useState<String | null>(null);
    const [assessments, setAssessments] = useState<Assessment[]>([]);

    const handleSelectAge = (age:string) => {
        setSelectedAge(age);
      };


    //   NAVIGATIONS
    const Navigations = () => {
        const prev = () => {
            if(currentStep !== 0) {
                setCurrentStep(currentStep - 1)
            }
        }

        const next = () => {
            if(currentStep !== 8) {
                setCurrentStep(currentStep + 1)
            }
        }
        return (
            <div>
                {
                currentStep === 7 ? 
                <>
                    <div className="mt-16 flex items-center justify-center">
                        <div>
                            <Link
                                href={"/recommendation"}
                                className={`bg-[#131314] xl:text-lg text-white focus-visible:outline-black 
                                    rounded-lg px-16 py-5 font-medium  shadow-sm hover:bg-opacity-80 
                                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                            >
                                Submit
                            </Link>
                        </div>
                    </div>
                </> : 

                <>
                    <div className="mt-16 w-full flex items-center justify-between text-black-500">
                        <button
                        disabled={currentStep <= 0}
                        onClick={prev}
                        className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                        disabled:text-gray-400 disabled:cursor-not-allowed">
                            Previous
                        </button>  

                        <div>
                            {currentStep + 1} of 8
                        </div>

                        <button
                        disabled={currentStep >= 7}
                        onClick={next}
                        className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
                        disabled:text-gray-400 disabled:cursor-not-allowed">
                            Next
                        </button> 
                    </div>
                </>
                }
            </div>
        )
    }
    // END NAVIGATIONS

    useEffect(() => { []
        const fetchAssessments = async () => {
            try {
            const response = await axios.get(`${API}/assessment/`);
            setAssessments(response.data); 
          }
          catch (error) {    
          }
        } 
    
        fetchAssessments()
      }, [])

    const getAnswerText = (answer: number): string => {
        switch (answer) {
          case 1:
            return 'Yes';
          case 0:
            return 'No';
          case 0.5:
            return 'Maybe';
          default:
            return '';
        }
      };

    return (
        <section className="relative w-full h-screen bg-white pb-20 flex justify-center overflow-y-auto">
            <AssessmentDesign />
            <div className="z-[5] w-[90%] md:w-[85%] mx-auto ">
               <div className="relative">                 
                    <IoChevronBackOutline
                        size={24}
                        onClick={() => router.back()}
                        className="z-50 absolute left-3 lg:left-[5rem] top-3 lg:top-8 max-lg:mb-3 border border-[#5F5F5F1A] 
                        p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-lg"
                    />
               </div>


                <form 
                className="z-20 relative text-black-500">

                    {currentStep === 0 && (
                        <div className="form-box max-md:mt-32 md:mt-48 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-8 space-y-4">
                                <label className="font-medium">Name</label>

                                <input 
                                type="text"
                                placeholder="Enter your name"
                                className="outline-none w-full p-3 border border-black-300 rounded-lg placeholder:text-[#656765]"
                                />
                            </div>


                            <Navigations />
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="z-[5] relative form-box max-md:mt-32 md:mt-6 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your age?
                            </div>

                            <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 gap-4">
                                {assessmentAges.map((AgeTyge) => (
                                    <div
                                    key={AgeTyge.id}
                                    onClick={() => handleSelectAge(AgeTyge.age)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        type="radio"
                                        value={AgeTyge.age}
                                        checked={selectedAge === AgeTyge.age}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[200px] md:h-[250px]">
                                        <Image 
                                        src={AgeTyge.image}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{AgeTyge.age}</div>

                                    {selectedAge === AgeTyge.age && (
                                        <div className="absolute top-[-0.3rem] right-0 bg-green-500 text-white rounded-full">
                                            <IoCheckmark />
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="z-[5] relative form-box max-md:mt-32 md:mt-12 xl:mt-16 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-yellow-400 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your gender?
                            </div>

                            <div className="mt-5 w-full py-3 rounded-lg grid grid-cols-2 gap-4">
                                {assessmentGender.map((gender) => (
                                    <div
                                    key={gender.id}
                                    onClick={() => handleSelectAge(gender.sex)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        type="radio"
                                        value={gender.sex}
                                        checked={selectedAge === gender.sex}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[200px] md:h-[250px]">
                                        <Image 
                                        src={gender.image}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{gender.sex}</div>

                                    {selectedAge === gender.sex && (
                                        <div className="absolute top-[-0.3rem] right-0 bg-green-500 text-white rounded-full">
                                            <IoCheckmark />
                                        </div>
                                    )}
                                    </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                     {currentStep === 3 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[0].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">
                                {Object.keys(assessments[0]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={optionKey}
                                    className="w-full py-4 px-5 bg-blue-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        type="radio"
                                        name={`activities`} 
                                        value={optionKey}
                                        className="mr-2 accent-blue-500 border-none border-transparent rounded-full"
                                        />
                                        <div className="font-medium flex items-center gap-1">
                                            <Image 
                                            src={assessmentImages[index]} 
                                            alt={"activity"} 
                                            width={32}
                                            height={32}
                                            className="object-contain" 
                                        />
                                        {getAnswerText(assessments[0]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-purple-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[1].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">                                
                                {Object.keys(assessments[1]?.options || {}).map((optionKey, index) => (

                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-purple-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        type="radio"
                                        name="activities" 
                                        value={optionKey}
                                        className="mr-2 accent-blue-500 border-none border-transparent rounded-full"
                                        />
                                        <div className="font-medium flex items-center gap-1">
                                            <Image 
                                            src={assessmentImages[index]} 
                                            alt={"activity"} 
                                            width={32}
                                            height={32}
                                            className="object-contain" 
                                        />
                                        {getAnswerText(assessments[1]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-yellow-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[2].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">
                                {Object.keys(assessments[2]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-yellow-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        type="radio"
                                        name="activities" 
                                        value={optionKey}
                                        className="mr-2 accent-blue-500 border-none border-transparent rounded-full"
                                        />
                                        <div className="font-medium flex items-center gap-1">
                                            <Image 
                                            src={assessmentImages[index]} 
                                            alt={"activity"} 
                                            width={32}
                                            height={32}
                                            className="object-contain" 
                                        />
                                         {getAnswerText(assessments[2]?.options[optionKey])}

                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 6 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[3].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">
                                {Object.keys(assessments[3]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        type="radio"
                                        name="activities" 
                                        value={optionKey}
                                        className="mr-2 accent-blue-500 border-none border-transparent rounded-full"
                                        />
                                        <div className="font-medium flex items-center gap-1">
                                            <Image 
                                            src={assessmentImages[index]} 
                                            alt={"activity"} 
                                            width={32}
                                            height={32}
                                            className="object-contain" 
                                        />
                                         {getAnswerText(assessments[3]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 7 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-purple-800 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[4].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">

                                {Object.keys(assessments[4]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-purple-200 flex items-center gap-2 rounded-lg">
                                        <input
                                        type="radio"
                                        name="activities" 
                                        value={optionKey}
                                        className="mr-2 accent-blue-500 border-none border-transparent rounded-full"
                                        />
                                        <div className="font-medium flex items-center gap-1">
                                            <Image 
                                            src={assessmentImages[index]} 
                                            alt={"activity"} 
                                            width={32}
                                            height={32}
                                            className="object-contain" 
                                        />
                                         {getAnswerText(assessments[4]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
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