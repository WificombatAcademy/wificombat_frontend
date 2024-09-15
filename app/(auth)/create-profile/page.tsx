"use client";
import { getCountries, getStates } from "@/app/utils/countriesApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { API, pathway, stage } from "../../utils/types-and-links";
import { pricingPlans } from "../../components/StudentsComps/Overview/pricing";
import { PricingCard } from "../../components/StudentsComps/Overview/pricing-card";
import { useAuth } from "@/app/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "@/app/utils/auth-interceptor";
import { useRouter } from "next/navigation";
import StudentInfo from "@/app/components/RegistrationComps/StudentInfo";
import { schema } from "@/app/utils/schema";
import { useMain } from "@/app/context/MainContext";
import SchoolStudentInfo from "@/app/components/RegistrationComps/SchoolStudentInfo";
import SchoolTeacherInfo from "@/app/components/RegistrationComps/SchoolTeacherInfo";
import StudentAdministratorInfo from "@/app/components/RegistrationComps/SchoolAdministratorInfo";

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
  schoolStudent:{
    fullname: string;
    age: number;
    class:string;
  };
  schoolTeacher:{
    fullname: string;
    class: string;
    students:number;
  };
  schoolAdministrator:{
    pathway: string;
    class:string;
    students:number;
    teachers:number;
    country: string;
    state: string;
  }
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
  | "schoolStudent.fullname"
  | "schoolStudent.age"
  | "schoolStudent.class"
  | "schoolTeacher.fullname"
  | "schoolTeacher.class"
  | "schoolTeacher.students"
  | "schoolAdministrator.pathway"
  | "schoolAdministrator.class"
  | "schoolAdministrator.students"
  | "schoolAdministrator.teachers"
  | "schoolAdministrator.country"
  | "schoolAdministrator.state"
  | "payment.plan"
let fieldsToValidate: FormFields[] = [];


const Profile = () => {
  const router = useRouter();
  const {selectedRole} = useMain();
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
      schoolStudent: {
        fullname:"",
        age:0,
        class: ""
      },
      schoolTeacher: {
        fullname:"",
        class:"",
        students: 0,
      },
      schoolAdministrator:{
        pathway: "",
        class: "",
        students: 0,
        teachers: 0,
        country: "",
        state: "",
      },
      payment: {
        plan: "",
      },
    }
  });

  let fieldsToWatch: readonly any[] = [];

  const isFormFilled = (): boolean => {
    switch (selectedRole) {
      case "":
        const studentValues = getValues("student");
        return !!(
          studentValues.fullname.trim() &&
          studentValues.age > 0 &&
          studentValues.country.trim() &&
          studentValues.state.trim() &&
          studentValues.pathway.trim() &&
          studentValues.stage.trim()
        );
      case "Student":
        const schoolStudentValues = getValues("schoolStudent");
        return !!(
          schoolStudentValues.fullname.trim() &&
          schoolStudentValues.age > 0 &&
          schoolStudentValues.class.trim()
        );
      case "Teacher":
        const teacherValues = getValues("schoolTeacher");
        return !!(
          teacherValues.fullname.trim() &&
          teacherValues.class.trim() &&
          teacherValues.students > 0
        );
      case "Administrator":
        const administratorValues = getValues("schoolAdministrator");
        return !!(
          administratorValues.country.trim() &&
          administratorValues.state.trim() &&
          administratorValues.pathway.trim() &&
          administratorValues.students > 0 &&
          administratorValues.teachers > 0 &&
          administratorValues.class.trim() 
        );
      default:
        return false;
    }
  };
  
  

  switch (step) {
    case STEPS.STUDENT_INFO:
      fieldsToWatch = [
        "student.fullname",
        "student.age",
        "student.country",
        "student.state",
        "student.pathway",
        "student.stage",
        "schoolStudent.fullname",
        "schoolStudent.age",
        "schoolStudent.class",
        "schoolTeacher.fullname",
        "schoolTeacher.students",
        "schoolTeacher.class",
        "schoolAdministrator.pathway",
        "schoolAdministrator.class",
        "schoolAdministrator.students",
        "schoolAdministrator.teachers",
        "schoolAdministrator.country",
        "schoolAdministrator.state"

      ];
      break;
    case STEPS.PAYMENT_PLAN:
      fieldsToValidate = ["payment.plan"];
      break;
    default:
      break;
  }

  useEffect(() => {
    getCountries().then(result => {
      setCountries(result.data.data);
    })
  }, [])

  const selectedStudentCountry = watch('student.country');
  const selectedAdminCountry = watch('schoolAdministrator.country');

  const selectedCountry = selectedRole === 'Administrator' ? selectedAdminCountry : selectedStudentCountry;

  useEffect(() => {
    if(selectedCountry !== "Select Country") {
      getStates(selectedCountry).then(result => {
        setCountryStates(result.data.data.states)
      })
    }
  }, [selectedStudentCountry, selectedAdminCountry, selectedRole])


  const submitRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let payload;

    if (selectedRole === "") {
      payload = {
        action: "register",
        mail,
        pass,
        name: watch("student.fullname"),
        account_type: "student",
        age: watch("student.age"),
        career_pathway: watch("student.pathway"),
        country: watch("student.country"),
        learning_stage: watch("student.stage"),
        name_in_full: watch("student.fullname"),
        state: watch("student.state"),
      }
    } else if (selectedRole === "Student") {
      payload = {
        action: "register",
        mail,
        pass,
        name: watch("schoolStudent.fullname"),
        account_type: "school",
        age:watch("schoolStudent.age"),
        class:watch("schoolStudent.class"),
      }
    }
    else if (selectedRole === "Teacher") {
      payload = {
        action: "register",
        mail,
        pass,
        name: watch("schoolTeacher.fullname"),
        account_type: "school",
        students:watch("schoolTeacher.students"),
        class:watch("schoolTeacher.class"),
      }    
    }
    else if (selectedRole === "Administrator") {
      payload = {
        action: "register",
        mail,
        pass,
        pathway: watch("schoolAdministrator.pathway"),
        account_type: "school",
        students:watch("schoolAdministrator.students"),
        teachers:watch("schoolAdministrator.teachers"),
        class:watch("schoolAdministrator.class"),
        country:watch("schoolAdministrator.country"),
        state:watch("schoolAdministrator.state")
      }    
    }
    try {
      const response = await axiosInstance.post(`${API}/authentication/`,payload,{
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
  
    if (selectedRole === 'Student') {
      fieldsToValidate = [
        "schoolStudent.fullname",
        "schoolStudent.age",
        "schoolStudent.class",
      ];
    } 
     if (selectedRole === 'Teacher') {
      fieldsToValidate = [
        "schoolTeacher.fullname",
        "schoolTeacher.students",
        "schoolTeacher.class",
      ];
    }
    if (selectedRole === 'Administrator') {
      fieldsToValidate = [
       "schoolAdministrator.country",
       "schoolAdministrator.class",
       "schoolAdministrator.pathway",
       "schoolAdministrator.state",
       "schoolAdministrator.students",
       "schoolAdministrator.teachers",
      ];
    }
    else {
      fieldsToValidate = [
        "student.fullname",
        "student.age",
        "student.country",
        "student.state",
        "student.pathway",
        "student.stage",
      ];
    }
  
    if (step === STEPS.PAYMENT_PLAN) {
      fieldsToValidate.push("payment.plan");
    }
  
    const isValid = await trigger(fieldsToValidate);
  if (isValid && isFormFilled()) {
    setStep((prev) => prev + 1);
  }
  };    

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };


  const handlePlanSelect = (billing: string) => {
    setSelectedPlan(billing);
  };

  const renderFormFields = () => {
    switch (selectedRole) {
      case '' :
        return (
          <>
          <StudentInfo
            register={register}
            errors={errors}
            isLoading={isLoading}
            submitRegister={submitRegister}
            isFormFilled={isFormFilled()}
            countries={countries}
            countryStates={countryStates}
            pathway={pathway}
            stage={stage}
          />
          </>
        );
      case 'Student' :
        return (
          <>
          <SchoolStudentInfo
            register={register}
            errors={errors}
            isLoading={isLoading}
            submitRegister={submitRegister}
            isFormFilled={isFormFilled()}
          />
          </>
        )
      case 'Teacher' :
        return (
          <>
          <SchoolTeacherInfo
            register={register}
            errors={errors}
            isLoading={isLoading}
            submitRegister={submitRegister}
            isFormFilled={isFormFilled()}
          />
          </>
        )
      case 'Administrator' :
        return (
          <>
           <StudentAdministratorInfo
            register={register}
            errors={errors}
            isLoading={isLoading}
            submitRegister={submitRegister}
            isFormFilled={isFormFilled()}
            countries={countries}
            countryStates={countryStates}
            pathway={pathway}
            stage={stage}
          />
          </>
        )
    }
  }
  

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

        
        <div className={`
          relative max-lg:w-full flex flex-1 flex-col pb-10 lg:flex-none overflow-y-auto mx-auto lg:min-w-[769px]
        ${selectedRole!=="" ? "pt-0" : "pt-10"}
        ${selectedRole==="Student" ? "-mt-16" : ""}`}>
          {step === STEPS.STUDENT_INFO ? (
            <div className="w-14 h-14"></div>
          ) : (
            <IoChevronBackOutline
              fontSize={10}
              style={{ bottom: "2rem" }}
              onClick={handleBack}
              className="max-lg:hidden lg:absolute top-12 border border-[#5F5F5F1A] p-5 w-14 h-14 
              cursor-pointer font-bold rounded-lg shadow-sm"
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

          {/* <div className="w-full px-4 md:px-20">
            {/* <ProgressBar
              steps={[
                { title: "Student Information" },
                { title: "Payment Plan" },
                { title: "Payment description" },
              ]}
              currentStep={step}
            /> 
          </div> */}
          <div className="mx-auto w-full px-4 lg:px-20 max-w-3xl">
            <div>
              <h2 className={`text-2xl font-bold leading-9 tracking-tight text-gray-900
                ${selectedRole!=="" ? "max-lg:mt-8" : "mt-8"}`}>
                {step === STEPS.STUDENT_INFO
                  ? selectedRole === "Student"
                  ? "Create Student Profile"
                  : selectedRole === "Teacher"
                  ? "Create Teacher Profile"
                  : selectedRole === "Administrator"
                  ? "Create Profile"
                  : "Student Profile"
                  : step === STEPS.PAYMENT_PLAN
                  ? "Choose a plan"
                  : "Payment Description"}
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form className="space-y-6 ">
                  {step === STEPS.STUDENT_INFO && (
                    renderFormFields()
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