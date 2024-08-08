"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { z } from "zod";
import OtpModal from "../utils/otp-modal";

const schema = z.object({
  email: z.string().email("Invalid email address")
});

type ForgotPasswordValues = {
  email: string;
};

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<ForgotPasswordValues>({
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(schema),
    });
  
  
    const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
      setIsLoading(true);
      try {
        const response: Response = await fetch(
          "https://teentech-be.onrender.com/api/v1/students/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
            }),
          }
        );
  
        const responseData = await response.json();
        const { success, message, data: loginData } = responseData;
        console.log(responseData, "responseData");
  
        if (!response.ok || !success) {
          throw new Error(message);
        }
        if (success) {
          // handleEmailValue(data.email);
          setOTPModalOpen(true);
          toast.success("Password reset OTP sent successfully");
        }
  
        return responseData;
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className='w-full h-screen bg-white flex'>
        <div className="relative hidden w-0 flex-1 lg:max-w-[655px] lg:block rounded-tr-[100px]">
            <Image
            fill
            className="absolute inset-0 h-screen w-full object-cover rounded-tr-[100px]"
            src="/assets/auth/register.jpg"
            alt=""
            />

            <div className="absolute inset-0 bg-[#26002C80] opacity-90 rounded-tr-[100px]">
               <Image
                className="absolute top-10 left-10"
                src="/assets/auth/logo.svg"
                width={54}
                height={54}
                alt=""
                />
            </div>
        </div>

        <div className="relative w-full flex flex-col lg:flex-none overflow-y-auto lg:basis-[50%] mx-auto py-10 px-4 md:px-10 lg:pl-20">
            <IoChevronBackOutline
                onClick={() => router.back()}
                className="relative lg:absolute left-0 lg:top-7 max-lg:mb-3 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
            />

            <div className="flex items-center gap-14 ">
                <div className="">
                    <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Forgot Password
                    </h2>
                </div>
            </div>

            <div className="mx-auto w-full">
                <div className="mt-16">
                    <div>
                        <form className="">
                            <>
                            <h4 className='w-[85%] font-semibold mb-4 text-2xl text-[#131314]'>
                                Please enter your email address to reset your password
                            </h4>
                            <div className="w-full">
                                <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                Email Address
                                </label>
                                <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="graceadeboye@gmail.com"
                                    disabled={isLoading}
                                    {...register("email", { required: true })}
                                    className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                                    errors.email
                                        ? "border-[#F00101]"
                                        : "border-neutral-300"
                                    } ${
                                    errors.email
                                        ? "focus:border-red-500"
                                        : "focus:border-black"
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-[#F00101]">
                                    {errors?.email?.message}
                                    </p>
                                )}
                                </div>
                            </div>

                            <div className="mt-14">
                                <button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                disabled={!isValid || isLoading}
                                className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                                >
                                {isLoading ? "Please wait..." : "Continue"}
                                </button>
                            </div>
                            </>
                        </form>

                        <OtpModal isOpen={isOTPModalOpen} onClose={() => setOTPModalOpen(false)}/>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Page