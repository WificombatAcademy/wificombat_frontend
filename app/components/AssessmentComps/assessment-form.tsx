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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Link from "next/link";

type Inputs = z.infer<typeof FormDataSchema>

const initialActivities = [
    'Playing games on a tablet or computer',
    'Drawing pictures or coloring',
    'Building with blocks or LEGOs',
    'Solving simple puzzles',
  ];

const AssessmentForm = () => {
    const router = useRouter();
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep
    const [activities, setActivities] = useState(initialActivities);

    const onDragEnd = (result:any) => {
      if (!result.destination) return;
  
      const reorderedActivities = Array.from(activities);
      const [removed] = reorderedActivities.splice(result.source.index, 1);
      reorderedActivities.splice(result.destination.index, 0, removed);
  
      setActivities(reorderedActivities);
    };

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
                onSubmit={handleSubmit(processForm)}
                className="z-20 relative text-black-500">

                    {currentStep === 0 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-8 space-y-4">
                                <label className="font-medium">Name</label>

                                <input 
                                type="text"
                                placeholder="Enter your name"
                                {...register("name")}
                                className="outline-none w-full p-3 border border-black-300 rounded-lg placeholder:text-[#656765]"
                                />
                            </div>

                            <div className="h-4">
                             {errors.name && <p className="text-red-500 h-fit">{errors.name.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your age?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.age._def.values.map((age,index) => (
                                   <div 
                                       key={index}
                                       className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="radio"
                                        value={age}
                                        {...register("age")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{age}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.age && <p className="text-red-500 h-fit">{errors.age.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 1: Introductory Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What is your gender?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.gender._def.values.map((gender, index) => (
                                   <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="radio"
                                        value={gender}
                                        {...register("gender")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{gender}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.gender && <p className="text-red-500 h-fit">{errors.gender.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                     {currentStep === 3 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                            Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                Arrange these activities based on your choice
                            </div>

                           
                            <div className="mt-5 w-full p-3 rounded-lg space-y-4">
                                {FormDataSchema.shape.activities._def.values.map((activities, index) => (
                                   <div 
                                    key={index}
                                   className="flex items-center gap-4"
                                   >
                                        <div className="py-4 px-6 bg-blue-50 text-blue-500 text-lg font-bold rounded-lg">
                                            {index + 1}
                                        </div>

                                        <label 
                                        className="w-full py-4 px-5 bg-blue-50 rounded-lg font-medium"
                                        >{activities}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.activities && <p className="text-red-500 h-fit">{errors.activities.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What do you like to do when you play games?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.gamePreference._def.values.map((gamePreference, index) => (
                                   <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="checkbox"
                                        value={gamePreference}
                                        {...register("gamePreference")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{gamePreference}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.gamePreference && <p className="text-red-500 h-fit">{errors.gamePreference.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                If you could make a toy do something, what would you chose?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.toyAction._def.values.map((toyAction, index) => (
                                   <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="checkbox"
                                        value={toyAction}
                                        {...register("toyAction")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{toyAction}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.toyAction && <p className="text-red-500 h-fit">{errors.toyAction.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 6 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What do you like to do when you draw or colour?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.drawingPreference._def.values.map((drawingPreference, index) => (
                                   <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="checkbox"
                                        value={drawingPreference}
                                        {...register("drawingPreference")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{drawingPreference}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.drawingPreference && <p className="text-red-500 h-fit">{errors.drawingPreference.message}</p>}
                            </div>

                            <Navigations />
                        </div>
                    )}

                    {currentStep === 7 && (
                        <div className="form-box max-md:mt-32 md:w-[70%] lg:w-[50%] mx-auto 
                        py-10 px-5 md:px-8 rounded-3xl">
                            <h1 className={`${merriweather.className} font-bold text-lg md:text-2xl text-center`}>
                                Part 2: Scenario-Based Questions
                            </h1>

                            <div className="mt-6 w-full bg-blue-500 text-white 
                            font-bold text-lg md:text-xl 2xl:text-2xl py-6 px-[10px] text-center rounded-2xl">
                                What would you like a robot to do for you?
                            </div>

                            <div className="mt-5 w-full p-3 rounded-lg
                            space-y-4">
                                {FormDataSchema.shape.robotTask._def.values.map((robotTask, index) => (
                                   <div 
                                    key={index}
                                   className="w-full py-4 px-5 bg-blue-50 rounded-lg">
                                        <input
                                        type="checkbox"
                                        value={robotTask}
                                        {...register("robotTask")}
                                        className="mr-2 border-none border-transparent rounded-full"
                                        />
                                        <label className="font-medium">{robotTask}</label>
                                   </div>
                                ))}
                            </div>

                            <div className="h-4">
                            {errors.robotTask && <p className="text-red-500 h-fit">{errors.robotTask.message}</p>}
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
