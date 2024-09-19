import { useMain } from '@/app/context/MainContext';
import React, { FormEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';

type Props = {
    register:any;
    errors: any;
    isLoading:boolean;
    submitRegister: (e: FormEvent, paymentOption: string) => Promise<void>; 
    isFormFilled: boolean;
    countries: Array<{ name: string }>;
    countryStates: Array<{ name: string; state_code: string }>;
    pathway: string[];
    stage: string[];

}

const StudentInfo = ({
    register,
    errors,
    isLoading,
    submitRegister,
    isFormFilled,
    countries,
    countryStates,
    pathway,
    stage
  }: Props) => {
    const {setPaymentOption} = useMain();
  return (
    <>
        <div className="w-full">
        <label
            htmlFor="student.fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Full Name
        </label>
        <div className="mt-2">
            <input
            id="student.fullname"
            type="text"
            placeholder="Grace Adeboye"
            disabled={isLoading}
            {...register("student.fullname", {
                required: true,
            })}
            className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.fullname
                ? "border-[#F00101]"
                : "border-neutral-300"
            }
            ${
                errors.student?.fullname
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            />
            {errors.student?.fullname && (
            <p className="text-[#F00101]">
                {errors.student.fullname.message}
            </p>
            )}
        </div>
        </div>

        <div className="w-full">
        <label
            htmlFor="student.age"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Age
        </label>
        <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
            <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
            id="student.age"
            {...register("student.age", {
                required: true,
                valueAsNumber: true,
            })}
            className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.age
                ? "border-[#F00101]"
                : "border-neutral-300"
            }
            ${
                errors.student?.age
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
            <option value="0" disabled>
                Select an age
            </option>
            {Array.from({ length: 11 }, (_, i) => i + 8).map(
                (age) => (
                <option
                    key={age}
                    value={age}
                    className="text-gray-700"
                >
                    {age}
                </option>
                )
            )}
            </select>
            {errors.student?.age && (
            <p className="h-[1rem] text-[#F00101]">
                {errors.student.age.message}
            </p>
            )}
        </div>
        </div>

        <div className="flex gap-6">
        <div className="w-1/2">
            <label
            htmlFor="student.country"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Country
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.country"
                disabled={isLoading}
                {...register("student.country", {
                required: true,
                })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border 
                border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 
                focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.country
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.country
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="">Select Country</option>
                {countries.length > 0 &&
                countries.map((country: any) => (
                    <option
                    key={country.name}
                    value={country.name}
                    >
                    {country.name}
                    </option>
                ))}
            </select>
            {errors.student?.country && (
                <p className="text-[#F00101]">
                {errors.student.country.message}
                </p>
            )}
            </div>
        </div>

        <div className="w-1/2">
            <label
            htmlFor="student.state"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            State
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.state"
                disabled={isLoading}
                {...register("student.state", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.state
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.state
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="" className="text-gray-600">
                Select State
                </option>
                {countryStates.length > 0 &&
                countryStates.map((state: any) => (
                    <option
                    key={state.state_code}
                    value={state.name}
                    >
                    {state.name}
                    </option>
                ))}
            </select>
            {errors.student?.state && (
                <p className="text-[#F00101]">
                {errors.student.state.message}
                </p>
            )}
            </div>
        </div>
        </div>

        <div className="flex gap-6">
        <div className="w-1/2">
            <label
            htmlFor="student.pathway"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Career Pathway
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.pathway"
                disabled={isLoading}
                {...register("student.pathway", {
                required: true,
                })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.pathway
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.pathway
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="">Select Pathway</option>
                {pathway.map((pathway, index) => (
                <option key={index} value={pathway}>
                    {pathway}
                </option>
                ))}
            </select>
            {errors.student?.pathway && (
                <p className="text-[#F00101]">
                {errors.student.pathway.message}
                </p>
            )}
            </div>
        </div>

        <div className="w-1/2">
            <label
            htmlFor="student.state"
            className="block text-sm font-medium leading-6 text-gray-900"
            >
            Stages
            </label>
            <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-end">
                <IoIosArrowDown className="text-black-500 relative right-4" />
            </div>
            <select
                id="student.stage"
                disabled={isLoading}
                {...register("student.stage", { required: true })}
                className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.student?.stage
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.stage
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
                <option value="" className="text-gray-600">
                Select Stage
                </option>
                {stage.map((stage, index) => (
                <option key={index} value={stage}>
                    {stage}
                </option>
                ))}
            </select>
            {errors.student?.stage && (
                <p className="text-[#F00101]">
                {errors.student.stage.message}
                </p>
            )}
            </div>
        </div>
        </div>

        <div className="w-full">
        <label
            htmlFor="student.course"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Course
        </label>
        <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
            <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
            id="student.course"
            disabled
            value={"coding"}
            {...register("student.course")}
            className={`relative appearance-none bg-stone-200 block outline-none w-full bg-transparent rounded-md border 
                border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 
                focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.student?.course
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.student?.course
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            >
            <option value="Coding">Nil</option>
            {/* <option value="TeenTechpreneurship">TeenTechpreneurship</option> */}
            </select>
            {errors.student?.course && (
            <p className="text-[#F00101]">
                {errors.student.course.message}
            </p>
            )}
        </div>
        </div>

        <div className="mt-10 lg:mt-14 flex items-center justify-between gap-8">
        {/* <button
            type="submit"
            onClick={(e) => submitRegister(e, 'payLater')}
            disabled={!isFormFilled}
            className="flex w-full items-center justify-center text-center rounded-md disabled:border-[#B1B1B4]
            disabled:bg-[#fff] text-[#131314] border border-[#131314] p-4 text-sm font-semibold leading-6 
            shadow-sm hover:bg-purple-50 focus-visible:outline disabled:text-[#B1B1B4]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
            {isLoading? 
            <div className="flex items-center gap-1">
            Registering
            <RiLoader4Fill size={24} className="animate-spin"/>
            </div> : 
            "Register"}
        </button> */}

        <button
            type="submit"
            onClick={(e) => submitRegister(e, 'payNow')}
            disabled={!isFormFilled}
            className="flex w-full items-center justify-center text-center rounded-md disabled:bg-[#B1B1B4] 
            active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 
            text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
            {isLoading? 
            <div className="flex items-center gap-1">
            Registering
            <RiLoader4Fill size={24} className="animate-spin"/>
            </div> : 
            "Register"}
        </button>
        </div>
    </>
  )
}

export default StudentInfo