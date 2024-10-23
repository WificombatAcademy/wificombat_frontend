"use client"
import { useRouter } from "next/navigation";
import { IoCheckmark, IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";
import {useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/app/utils/loader";
import axiosInstance from "@/app/utils/auth-interceptor";
import toast, { Toaster } from "react-hot-toast";
import { merriweather } from "@/app/fonts";
import { RiLoader4Fill } from "react-icons/ri";
import { useMain } from "@/app/context/MainContext";
import { API, assessmentAges, assessmentGender, 
    assessmentImages, getAnswerText } from "@/app/utils/types-and-links";
import axios from "axios";

type Option = {
    [key: string]: number;
  };
  

type Assessment = {
    id: number;
    question: string;
    category: string;
    options: Option;
}

type Response = {
    question_id: number;
    question: string;
    answer: string;
};

const getQuestionsEndpoint = (age: string) => {
    if (age === "5-7 years old" || age === "8-10 years old") return "https://wificombatacademy.com/api/v2/assessment/junior";
    if (age >= "11-14 years old" || age === "15-18 years old") return "https://wificombatacademy.com/api/v2/assessment/senior";
    return null;
  };

const AssessmentForm = () => {
    const router = useRouter();
    const {setUsername} = useMain();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedGender, setSelectedGender] = useState<String | null>(null);
    const handleSelectAge = (age: string) => setSelectedAge(age);
    const handleSelectGender = (gender: string) => setSelectedGender(gender);
    const [responses, setResponses] = useState<Response[]>([]);
    const [validationErrors, setValidationErrors] = useState<String []>([]);


    console.log(selectedAge)

    useEffect(() => {
        const fetchQuestions = async () => {
          const endpoint = getQuestionsEndpoint(selectedAge);
          if (!endpoint) return;
    
          try {
            const response = await axios.get(endpoint)
            setQuestions(response.data.quiz || []);
          } catch (error) {
            console.error("Failed to fetch questions:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchQuestions();
      }, [selectedAge]);

    const validateCurrentStep = () => {
        const errors: string[] = [];
        if (currentStep === 0 && !name) {
            errors.push("Name is required.");
            toast.error("Name is required!");
        }
        if (currentStep === 0 && (!email && name)) {
            errors.push("Email is required.");
            toast.error("Email is required!");
        }
        if (currentStep === 1 && !selectedGender) {
            errors.push("Gender is required.");
            toast.error("Gender is required.");
        }
        if (currentStep === 2 && !selectedAge) {
            errors.push("Age is required.");
            toast.error("Age is required.");
        }
        if (currentStep >= 3 && currentStep <= 10) {
            const questionIndex = currentStep - 3;
            const answered = responses.some(response => response.question_id === questionIndex);
            if (!answered) {
                errors.push(`Please answer the question for step ${currentStep + 1}.`);
                toast.error(`Please answer the question for step ${currentStep + 1}.`);
            }
        }
        setValidationErrors(errors);
        return errors.length === 0;
    };

    // NAVIGATIONS
    const Navigations = () => {
        const prev = () => {
            if (currentStep !== 0) {
                setCurrentStep(currentStep - 1);
            }
        };

        const next = () => {
            if (validateCurrentStep()) {
                setCurrentStep(currentStep + 1);
            }
        };

        return (
            <div>
                {
                currentStep === 10 ? 
                <>
                    <div className="mt-16 flex items-center justify-center">
                        <div>
                            <div
                                onClick={() => {}}
                                className={`bg-[#131314] xl:text-lg text-white focus-visible:outline-black 
                                    rounded-lg px-16 py-5 font-medium flex items-center justify-center text-center 
                                    shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                    focus-visible:outline-offset-2disabled:bg-gray-400 disabled:cursor-not-allowed `}
                            >
                                {submitting ? 
                                <div className="flex items-center gap-1">
                                Submitting
                                <RiLoader4Fill className="animate-spin"/>
                                </div> : 
                                "Submit"}
                            </div>
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
                            {currentStep + 1} of 11
                        </div>

                        <button
                        disabled={currentStep >= 10}
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


    return (
        <section className="relative w-full h-screen bg-white pb-20 flex justify-center overflow-y-auto">
            <AssessmentDesign />
            <Toaster/>
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
                className="z-20 relative text-black-500 pb-12">
                    {validationErrors.length > 0 && (
                        <div className="text-red-500 mb-4 text-center">
                            {/* {validationErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))} */}
                        </div>
                    )}

                    {currentStep === 0 && (
                        <div className="form-box max-md:mt-32 md:mt-48 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-8 space-y-4">
                               <div>
                                 <label className="font-medium">Name</label>

                                <input 
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="outline-none w-full p-3 border border-black-300 
                                rounded-lg placeholder:text-[#656765]"
                                />
                               </div>
                               <div className="mt-3">
                                 <label className="font-medium">Email</label>

                                <input 
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="outline-none w-full p-3 border border-black-300 
                                rounded-lg placeholder:text-[#656765]"
                                />
                               </div>
                               <div className="mt-3">
                                 <label className="font-medium">Mobile Number (Optional)</label>

                                <input 
                                required
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="e.g 07012345678"
                                className="outline-none w-full p-3 border border-black-300 rounded-lg 
                                placeholder:text-[#656765]"
                                />
                               </div>
                            </div>


                            <Navigations />
                        </div>
                    )}

                    {currentStep === 1 && (
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
                                    onClick={() => handleSelectGender(gender.sex)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        required
                                        type="radio"
                                        value={gender.sex}
                                        checked={selectedGender === gender.sex}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[150px] md:h-[250px]">
                                        <Image 
                                        src={gender.image}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{gender.sex}</div>

                                    {selectedGender === gender.sex && (
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
                                {assessmentAges.map((AgeType) => (
                                    <div
                                    key={AgeType.id}
                                    onClick={() => handleSelectAge(AgeType.age)}
                                    className={`relative w-full text-center rounded-lg cursor-pointer`}
                                    >
                                    <input
                                        required
                                        type="radio"
                                        value={AgeType.age}
                                        checked={selectedAge === AgeType.age}
                                        className="hidden" // Hide the radio input
                                    />

                                    <div className="w-full h-[150px] md:h-[250px]">
                                        <Image 
                                        src={selectedGender === "Male" ? AgeType.maleImage : AgeType.femaleImage}
                                        alt="Age-Type"
                                        width={180}
                                        height={180}
                                        className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="mt-4 font-medium">{AgeType.age}</div>

                                    {selectedAge === AgeType.age && (
                                        <div className="absolute top-[-0.3rem] right-0 
                                        bg-green-500 text-white rounded-full">
                                            <IoCheckmark />
                                        </div>
                                    )}
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