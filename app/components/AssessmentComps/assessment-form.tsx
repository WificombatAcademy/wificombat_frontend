"use client"
import { useRouter } from "next/navigation";
import { IoCheckmark, IoChevronBackOutline } from "react-icons/io5"
import AssessmentDesign from "./assessment-design";
import {useEffect, useState } from "react";
import { API, assessmentAges, assessmentGender, assessmentImages, getAnswerText } from "@/app/utils/types-and-links";
import Image from "next/image";
import Loader from "@/app/utils/loader";
import axiosInstance from "@/app/utils/auth-interceptor";
import toast, { Toaster } from "react-hot-toast";
import { merriweather } from "@/app/fonts";
import { RiLoader4Fill } from "react-icons/ri";

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

const AssessmentForm = () => {
    const router = useRouter();
    const [recommendation, setRecommendation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [name, setName] = useState("");
    const [selectedAge, setSelectedAge] = useState<String | null>(null);
    const [selectedGender, setSelectedGender] = useState<String | null>(null);
    const handleSelectAge = (age: string) => setSelectedAge(age);
    const handleSelectGender = (gender: string) => setSelectedGender(gender);
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [responses, setResponses] = useState<Response[]>([]);
     const [validationErrors, setValidationErrors] = useState<String []>([]);

    const updateResponse = (questionId: number, questionText: string, answer: string) => {
        setResponses(prev => {
            const existingResponseIndex = prev.findIndex(r => r.question_id === questionId);
            if (existingResponseIndex > -1) {
                const updatedResponses = [...prev];
                updatedResponses[existingResponseIndex] = { question_id: questionId, question: questionText, answer };
                return updatedResponses;
            } else {
                return [...prev, { question_id: questionId, question: questionText, answer }];
            }
        });
    };

    const submitResponses = async () => {
        if (validateCurrentStep()) { // Only proceed if validation is successful
            try {
            setSubmitting(true);
                const response = await axiosInstance.post(`${API}/assessment/ai/`, { responses, age: selectedAge });
                setRecommendation(response.data);
                const queryParams = new URLSearchParams({
                    data: JSON.stringify(response.data),
                }).toString();
    
                // Navigate to the recommendation page with query parameters
                router.push(`/recommendation?${queryParams}`);
                setSubmitting(false);       
                console.log('Career Pathway Recommendation:', response.data);
            } catch (error:any) {
                toast.error('Error submitting responses:', error);
                setSubmitting(false);
            }
        }
    };
    

    const validateCurrentStep = () => {
        const errors: string[] = [];
        if (currentStep === 0 && !name) {
            errors.push("Name is required.");
            toast.error("Name is required!");
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
                                onClick={submitResponses}
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
    

    useEffect(() => { []
        const fetchAssessments = async () => {
            try {
            const response = await axiosInstance.get(`${API}/assessment/`);
            setAssessments(response.data); 
            setLoading(false);
          }
          catch (error) {    
          }
        } 
    
        fetchAssessments()
      }, [])

      if(loading) {
        return <Loader />
      }

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
                className="z-20 relative text-black-500">
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
                                <label className="font-medium">Name</label>

                                <input 
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="outline-none w-full p-3 border border-black-300 rounded-lg placeholder:text-[#656765]"
                                />
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
                                        required
                                        type="radio"
                                        name={`activities`} 
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 0 && response.answer === optionKey)}
                                        onChange={() => updateResponse(0, assessments[0].question, optionKey)}
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
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 1 && response.answer === optionKey)}
                                        onChange={() => updateResponse(1, assessments[1].question, optionKey)}
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
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 2 && response.answer === optionKey)}
                                        onChange={() => updateResponse(2, assessments[2].question, optionKey)}
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
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 3 && response.answer === optionKey)}
                                        onChange={() => updateResponse(3, assessments[3].question, optionKey)}
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
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 4 && response.answer === optionKey)}
                                        onChange={() => updateResponse(4, assessments[4].question, optionKey)}
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

                    {currentStep === 8 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[5].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">

                                {Object.keys(assessments[5]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 5 && response.answer === optionKey)}
                                        onChange={() => updateResponse(5, assessments[5].question, optionKey)}
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
                                         {getAnswerText(assessments[5]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 9 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-yellow-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[6].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">

                                {Object.keys(assessments[6]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-yellow-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 6 && response.answer === optionKey)}
                                        onChange={() => updateResponse(6, assessments[6].question, optionKey)}
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
                                         {getAnswerText(assessments[6]?.options[optionKey])}
                                        </div>
                                   </div>
                                ))}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 10 && (
                        <div className="form-box max-md:mt-32 md:mt-12 lg:mt-14 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl overflow-y-auto">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-purple-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                {assessments[7].question}
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">

                                {Object.keys(assessments[7]?.options || {}).map((optionKey, index) => (
                                    <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-purple-50 flex items-center gap-2 rounded-lg">
                                        <input
                                        required
                                        type="radio"
                                        name={`activities`}
                                        value={optionKey}
                                        checked={responses.some(response => response.question_id === 7 && response.answer === optionKey)}
                                        onChange={() => updateResponse(7, assessments[7].question, optionKey)}
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
                                         {getAnswerText(assessments[7]?.options[optionKey])}
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