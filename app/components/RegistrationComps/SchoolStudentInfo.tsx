import React, { FormEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { RiLoader4Fill } from 'react-icons/ri';

type Props = {
    register:any;
    errors: any;
    isLoading:boolean;
    submitRegister: (e: FormEvent) => Promise<void>;
    isFormFilled: () => boolean;

}

const SchoolStudentInfo = ({
    register,
    errors,
    isLoading,
    submitRegister,
    isFormFilled,
  }: Props) => {
  return (
    <>
        <div className="w-full">
        <label
            htmlFor="schoolstudent.fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Full Name
        </label>
        <div className="mt-2">
            <input
            id="schoolstudent.fullname"
            type="text"
            placeholder="Grace Adeboye"
            disabled={isLoading}
            {...register("schoolstudent.fullname", {
                required: true,
            })}
            className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolstudent?.fullname
                ? "border-[#F00101]"
                : "border-neutral-300"
            }
            ${
                errors.schoolstudent?.fullname
                ? "focus:border-red-500"
                : "focus:border-black"
            }`}
            />
            {errors.schoolstudent?.fullname && (
            <p className="text-[#F00101]">
                {errors.schoolstudent.fullname.message}
            </p>
            )}
        </div>
        </div>

        <div className="w-full">
        <label
            htmlFor="schoolstudent.age"
            className="block text-sm font-medium leading-6 text-gray-900"
        >
            Age
        </label>
        <div className="mt-2 relative">
            <div className="absolute inset-0 flex items-start justify-end">
            <IoIosArrowDown className="text-black-500 relative top-5 right-4" />
            </div>
            <select
            id="schoolstudent.age"
            {...register("schoolstudent.age", {
                required: true,
                valueAsNumber: true,
            })}
            className={`relative appearance-none block outline-none w-full bg-transparent rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                errors.schoolstudent?.age
                ? "border-[#F00101]"
                : "border-neutral-300"
            }
            ${
                errors.schoolstudent?.age
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
            {errors.schoolstudent?.age && (
            <p className="h-[1rem] text-[#F00101]">
                {errors.schoolstudent.age.message}
            </p>
            )}
        </div>
        </div>

        <div>
            <label
                htmlFor="schoolstudent.class"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                School Name
            </label>
            <div className="mt-2">
                <input
                id="schoolstudent.class"
                type="text"
                placeholder="New Foundation Academy"
                disabled={isLoading}
                {...register("schoolstudent.class", { required: true })}
                className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                    ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                    focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                    errors.schoolstudent?.class
                    ? "border-[#F00101]"
                    : "border-neutral-300"
                }
            ${
                errors.schoolstudent?.class ? "focus:border-red-500" : "focus:border-black"
            }`}
                />
                {errors.schoolstudent?.class && (
                <p className="text-[#F00101]">
                    {errors.schoolstudent.class.message}
                </p>
                )}
            </div>
        </div>

        <div className="mt-10 lg:mt-14">
        <button
            type="submit"
            onClick={submitRegister}
            disabled={isLoading}
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

export default SchoolStudentInfo