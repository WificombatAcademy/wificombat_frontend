"use client";
import ProgressBar from "../../utils/form-progress";
import { getCountries, getStates } from "@/app/utils/countriesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { isValid, z } from "zod";
import { API, deviceId, pathway, stage } from "../../utils/types-and-links";
import { pricingPlans } from "../../components/StudentsComps/Overview/pricing";
import { PricingCard } from "../../components/StudentsComps/Overview/pricing-card";
import { useAuth } from "@/app/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/app/utils/auth-interceptor";
import { useRouter } from "next/navigation";
import { RiLoader4Fill } from "react-icons/ri";

enum STEPS {
  STUDENT_INFO = 0,
  PAYMENT_PLAN = 1,
  PAYMENT_DESC = 2,
}

export type FormValues = {
  student: {
    fullname: string;
    age: number;
    country: string;
    state: string;
    pathway: string;
    stage: string;
    course: string;
    password: string;
    confirm_password: string;
  };
  payment: {
    plan: string;
  };
};

type FormFields =
  | "student.fullname"
  | "student.course"
  | "student.age"
  | "student.country"
  | "student.state"
  | "student.pathway"
  | "student.stage"
  | "payment.plan";
let fieldsToValidate: FormFields[] = [];

const schema = z.object({
  student: z
    .object({
      fullname: z.string().refine(
        (value) => {
          const names = value.trim().split(" ");
          return names.length >= 2;
        },
        { message: "Full name must contain at least two names" }
      ),
      //email: z.string().email({ message: "Invalid email address" }),
      age: z.number().min(1, { message: "Age must be at least 8" }),
      country: z.string().min(1, { message: "Country is required" }),
      state: z.string().min(1, { message: "State is required" }),
      pathway: z.string().min(1, { message: "Pathway is required" }),
      stage: z.string().min(1, { message: "Stage is required" }),
      course: z.string().min(1, { message: "Course is required" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
      confirm_password: z.string().min(8, {
        message: "Confirm password must be at least 8 characters long",
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }),
  payment: z.object({
    plan: z.string().min(1, { message: "Plan is required" }),
  }),
});

const Profile = () => {
  const router = useRouter();
  const {mail, pass} = useAuth();
  const [countries, setCountries] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [step, setStep] = useState(STEPS.STUDENT_INFO);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    trigger,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      student: {
        fullname: "",
        age: 0,
        country: "",
        state: "",
        pathway: "",
        stage: "",
        course: "",
      },
      payment: {
        plan: "",
      },
    },
  });

  let fieldsToWatch: readonly any[] = [];

  switch (step) {
    case STEPS.STUDENT_INFO:
      fieldsToWatch = [
        "student.fullname",
        "student.age",
        "student.country",
        "student.state",
        "student.pathway",
        "student.stage",
        // "student.course",
      ];
      break;
    case STEPS.PAYMENT_PLAN:
      fieldsToValidate = ["payment.plan"];
      break;
    default:
      break;
  }

  const isFormFilled =
    Object.keys(errors).length === 0 &&
    Object.values(watch(fieldsToWatch)).every(
      (field) => field !== undefined && field !== ""
    );

  // const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     console.log("Form data:", data);
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const submitRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`${API}/authentication/`, {
        action: "register",
        mail:"demiladeala@gmail.com",
        pass:"Demilade@10",
        name: watch("student.fullname"),
        account_type: "student",
        age: watch("student.age"),
        career_pathway: watch("student.pathway"),
        country: watch("student.country"),
        learning_stage: watch("student.stage"),
        name_in_full: watch("student.fullname"),
        state: watch("student.state"),
        dvid: deviceId,
      },{
        headers:{
          "Content-Type": "multipart/form-data",
        }
      });
  
      // Check if success is false in the response
      if (response.data.success === false) {
        toast.error(response.data.message || "Registration failed. Please try again.");
      } else {
        toast.success("Registration successful");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Signup error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };  

  const handleContinue = async () => {
    let fieldsToValidate: FormFields[] = [];

    switch (step) {
      case STEPS.STUDENT_INFO:
        fieldsToValidate = [
          "student.fullname",
          //   "student.course",
          "student.age",
          "student.state",
          "student.country",
          "student.pathway",
          "student.stage",
        ];
        break;
      case STEPS.PAYMENT_PLAN:
        fieldsToValidate = ["payment.plan"];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    getCountries().then((result) => {
      setCountries(result.data.data);
    });
  }, []);

  const selectedCountry = watch("student.country");

  useEffect(() => {
    if (selectedCountry !== "Select Country") {
      getStates(selectedCountry).then((result) => {
        setCountryStates(result.data.data.states);
      });
    }
  }, [selectedCountry]);

  const handlePlanSelect = (billing: string) => {
    setSelectedPlan(billing);
  };

  

  return (
    <>
    <Toaster/>
      <div className="flex w-full min-h-full h-screen flex-1 bg-white">
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
        <div className="relative max-lg:w-full flex flex-1 flex-col lg:flex-none overflow-y-auto mx-auto lg:min-w-[769px] py-10">
          {step === STEPS.STUDENT_INFO ? (
            <div className="w-14 h-14"></div>
          ) : (
            <IoChevronBackOutline
              fontSize={10}
              style={{ bottom: "2rem" }}
              onClick={handleBack}
              className="max-lg:hidden lg:absolute top-12 border border-[#5F5F5F1A] p-5 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
            />
          )}

          {step === STEPS.STUDENT_INFO ? (
            <div className="w-14 h-14"></div>
          ) : (
            <div className="lg:hidden relative px-4 mb-2">
              <IoChevronBackOutline
                fontSize={10}
                style={{ bottom: "2rem" }}
                onClick={handleBack}
                className="border border-[#5F5F5F1A] py-5 px-4 w-14 h-14 cursor-pointer font-bold rounded-lg shadow-sm"
              />
            </div>
          )}

          <div className="w-full px-4 md:px-20">
            <ProgressBar
              steps={[
                { title: "Student Information" },
                { title: "Payment Plan" },
                { title: "Payment description" },
              ]}
              currentStep={step}
            />
          </div>
          <div className="mx-auto w-full px-4 lg:px-20 max-w-3xl">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {step === STEPS.STUDENT_INFO
                  ? "Student Profile"
                  : step === STEPS.PAYMENT_PLAN
                  ? "Choose a plan"
                  : "Payment Description"}
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form className="space-y-6 ">
                  {step === STEPS.STUDENT_INFO && (         <>
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

                      <div className="mt-10 lg:mt-14">
                        <button
                          type="submit"
                          onClick={submitRegister}
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
                  )}

                  {step === STEPS.PAYMENT_PLAN && (
                    <>
                      <div
                        className="mx-auto mt-9 md:mt-16 lg:mt-20 
                    flex flex-wrap items-center justify-center gap-[2rem]"
                      >
                        {pricingPlans.map((plans) => (
                          <PricingCard
                            key={plans.id}
                            boxShadow={true}
                            price={plans.pricing}
                            billing={plans.billing}
                            color={plans.color}
                            selectedPlan={selectedPlan || ""}
                            onSelect={handlePlanSelect}
                            setValue={setValue}
                          />
                        ))}
                      </div>
                      {errors.payment?.plan && (
                        <p className="h-[1rem] text-[#F00101]">
                          {errors.payment.plan.message}
                        </p>
                      )}

                      <div>
                        <div className="mt-10 lg:mt-14">
                          <button
                            type="button"
                            onClick={handleContinue}
                            disabled={!isFormFilled}
                            className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {step === STEPS.PAYMENT_DESC && (
                    <>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-12">
                        <div>
                          <Image
                            src={"/hero-1.png"}
                            alt={"pathway"}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover border-none"
                          />
                        </div>

                        <div className="w-full">
                          <div className="w-full flex items-center justify-between gap-5">
                            <p className="mt-4 text-lg md:text-xl text-black-800">
                              Career Pathway:
                            </p>

                            <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                              {watch("student.pathway")}
                            </p>
                          </div>

                          <div className="w-full flex items-center justify-between gap-5">
                            <p className="mt-4 text-lg md:text-xl text-black-800">
                              Stage:
                            </p>

                            <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                              {watch("student.stage")}
                            </p>
                          </div>

                          <div className="w-full flex items-center justify-between gap-5">
                            <p className="mt-4 text-lg md:text-xl text-black-800">
                              Course:
                            </p>

                            <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                              03
                            </p>
                          </div>

                          <div className="w-full flex items-center justify-between gap-5">
                            <p className="mt-4 text-lg md:text-xl text-black-800">
                              Module:
                            </p>

                            <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                              10
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col">
                        <div className="flex items-center justify-between">
                          <p className="mt-4 text-lg md:text-xl text-black-800">
                            Plan
                          </p>

                          <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                            {watch("payment.plan")}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <p className="mt-4 text-lg md:text-xl text-black-800">
                            Amount
                          </p>

                          <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                            ₦10,000.00
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <p className="mt-4 text-lg md:text-xl text-black-800">
                            Discount
                          </p>

                          <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                            ₦0.00
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <p className="mt-4 text-lg md:text-xl text-black-800 font-semibold">
                            Total
                          </p>

                          <p className="mt-4 text-lg md:text-xl text-black-500 font-semibold">
                            ₦10,000.00
                          </p>
                        </div>
                      </div>

                      <div className="mt-10 lg:mt-14">
                        <button
                          type="submit"
                          disabled
                          className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                          Pay Now
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile