"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { z } from "zod";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axiosInstance from "@/app/utils/auth-interceptor";
import { API } from "@/app/utils/types-and-links";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "cookies-next";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let fieldsToWatch: readonly any[] = [];

  const watchedFields = watch(fieldsToWatch);

  const isFormFilled = Object.values(watchedFields).every(
    (field) => field !== ""
  );

  const login = async () => {
    // e.preventDefault();
    setIsLoading(true);
    const payload = {
      action: "login",
      email: watch("email"),
      pass: watch("password"),
    }
    try {
      const response = await axiosInstance.post(`${API}/authentication/`,payload,{
        headers:{
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      // Check if success is false in the response
      if (response.data.success === false) {
        toast.error(response.data.message || "Login failed. Please try again.");
      } else {
        // console.log(response.data.session_id)
        // console.log(response.data.user_id)

        setCookie("session_id", response.data.session_id, {
          // httpOnly: true, 
          secure: true, 
          sameSite: "strict",
        });

        setCookie("user_id", response.data.user_id, {
          // httpOnly: true, 
          secure: true, 
          sameSite: "strict",
        });

        toast.success("Login successful");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="flex min-h-full w-full h-screen bg-white">
      <Toaster />
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
              Login
            </h2>
          </div>
        </div>

        <div className="mx-auto w-full">
          <div className="mt-16">
            <div>
              <form className="space-y-6" onSubmit={handleSubmit(login)}>
                <>
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
                        placeholder="grace@gmail.com"
                        disabled={isLoading}
                        {...register("email", { required: true })}
                        className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6 ${
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

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <div
                        className="absolute top-[27%] right-2 text-[#656765] cursor-pointer text-foundation-gray-normal"
                        onClick={togglePasswordVisibility}
                        >
                        {passwordVisible ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20}/>}
                      </div>

                      <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="********"
                        disabled={isLoading}
                        {...register("password", { required: true })}
                        className={`block outline-none w-full rounded-md border border-gray-600 py-4 px-4 shadow-sm ring-1 
                          ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset 
                          focus:ring-purple-600 sm:text-sm sm:leading-6 ${
                          errors.password
                            ? "border-[#F00101]"
                            : "border-neutral-300"
                        } ${
                          errors.password
                            ? "focus:border-red-500"
                            : "focus:border-black"
                        }`}
                      />
                      {errors.password && (
                        <p className="text-[#F00101]">
                          {errors?.password?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 mb-10 lg:mb-16 flex items-center justify-end font-medium">
                    <Link
                      href="/forgot-password"
                      className="text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mt-14">
                    <button
                      type="submit"
                      disabled={isLoading || !isValid}
                      className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                      p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                      {isLoading ? "Please wait..." : "Login"}
                    </button>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-2 font-medium">
                    <span className="text-sm text-[#131314]">
                      Dont have an account?
                    </span>
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              </form>

              {/* {isOTPModalOpen && (
                <ModalOTP isOpen={isOTPModalOpen} isLoading={isLoading} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;