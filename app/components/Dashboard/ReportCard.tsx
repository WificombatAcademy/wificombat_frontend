import { merriweather } from "@/app/fonts"
import Image from "next/image"
import Link from "next/link";
import { ReactNode } from "react"
import {
    ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Bar
  } from 'recharts';
  
export type HeaderProps = {
    children: ReactNode;
}

type CardProps = {
    children: ReactNode;
    cardTitle: string;
}

const analysisData = [
    { name: 'Module 1', badge: 23, score: 45, point: 40 },
    { name: 'Module 2', badge: 30, score: 110, point: 60 },
    { name: 'Module 3', badge: 30, score: 55, point: 50 },
    { name: 'Module 4', badge: 60, score: 80, point: 70 },
  ];

const ReportHeader = ({ children }: HeaderProps) => {
   return (
    <header className={`mt-9 md:mt-12 w-full py-3 px-4 md:px-6 lg:px-8 bg-purple-300 text-center
     ${merriweather.className} text-lg md:text-xl font-bold capitalize`}>
        {children}
    </header>
   )
}

const Card = ({ children, cardTitle }: CardProps) => {
    return (
        <article className="relative w-full py-8 px-4 md:px-8 flex items-center
        border border-purple-200 rounded-xl">
            <div className="z-[4] absolute top-[-1rem] left-[36%] bg-white text-center 
            border border-purple-200 py-[5px] px-6 rounded-2xl">
                {cardTitle}
            </div>
                {children}
        </article>
    )
}

const CustomLineChart = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          layout="vertical"  // This makes the chart vertical
          data={analysisData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" domain={[0, 160]} tickCount={9} interval={0} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          {/* Badge (Green) */}
          <Bar dataKey="badge" barSize={8} fill="#0784C3" />
          {/* Score (Yellow) */}
          <Bar dataKey="score" barSize={8} fill="#FFB700" />
          {/* Point (Purple) */}
          <Bar dataKey="point" barSize={8} fill="#BC00DD" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

export const ReportCard  = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center overflow-y-auto">
            <div className="my-8 md:my-10 w-[95%] md:w-[80%] lg:w-[70%] bg-white text-black-500 mx-auto">
                {/* HEADER */}
                <header className="w-full py-3 px-4 md:px-6 lg:px-8 bg-purple-300 text-white flex items-center justify-between">
                    <div className="basis-[30%] lg:basis-[35%]">
                        <Image
                            src={`/assets/auth/wificomlog.jpg`}
                            alt={`logo`}
                            width={90}
                            height={90}
                            className="w-[60px] my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
                    </div>

                    <div className="basis-[70%] lg:basis-[65%]">
                        <div className="w-fit">
                            <h2 className={`${merriweather.className} font-bold text-2xl lg:text-3xl`}>Wificombat Academy</h2>
                            <h2 className="mt-1 font-semibold text-center">Wificombatacademy@gmail.com</h2>
                        </div>
                    </div>
                </header>
                {/* HEADER */}

                <div className="py-3 px-4 md:px-6 lg:px-8">
                    {/* STUDENT DETAILS */}
                    <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card cardTitle="Learner">
                            <div className="w-full">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="">Name:</h4>
                                    <h4 className="font-semibold">Johnson Grace</h4>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <h4 className="">Email:</h4>
                                    <h4 className="font-semibold">gracejohn@gmail.com</h4>
                                </div>
                            </div>
                        </Card>

                        <Card cardTitle="Course">
                            <div className="w-full">
                                <h5 className="font-semibold mb-5">Coding Fundamental 1 (Beginner) </h5>
                                <div className="flex items-center justify-between gap-2">
                                        <h4 className="">Registration ID:</h4>
                                        <h4 className="font-semibold">.....</h4>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <h4 className="">Course Completion Date:</h4>
                                    <h4 className="font-semibold">08/09/24</h4>
                                </div>
                        </div>
                        </Card>
                    </div>
                    {/* STUDENT DETAILS */}

                    {/* RESULT ANALYSIS */}
                    <section>
                        <ReportHeader>
                            Result Analysis
                        </ReportHeader>

                        <div className="mt-8 shadow-md rounded-xl">
                            <CustomLineChart />
                        </div>
                    </section>
                    {/* RESULT ANALYSIS */}

                    {/* MODULE ANALYSIS */}
                    <section>
                        <ReportHeader>
                            Module Analysis
                        </ReportHeader>

                        <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card cardTitle="Modules">
                                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                                    <h5>Introduction to Algorithm </h5>
                                    <h5>Introduction to Coding with Lightbot</h5>
                                    <h5>Movement and motion with Mblock</h5>
                                    <h5>Events and Triggers in Mblock</h5>
                                    <h5>Creating Stories with Mblock </h5>
                                    <h5>Review and Final Project</h5>
                                </div>
                            </Card>

                            <Card cardTitle="Modules">
                                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                                    <h5>65%</h5>
                                    <h5>80%</h5>
                                    <h5>92%</h5>
                                    <h5>100%</h5>
                                    <h5>90%</h5>
                                    <h5>85%</h5>
                                </div>
                            </Card>
                        </div>
                    </section>
                    {/* MODULE ANALYSIS */}

                    {/* FINAL SCORE */}
                    <section>
                        <ReportHeader>
                            Final Score
                        </ReportHeader>

                        <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card cardTitle="Name">
                                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                                    <h5>Required Score</h5>
                                    <h5>Your Score</h5>
                                    <h5>Badge</h5>
                                    <h5>Points</h5>
                                </div>
                            </Card>

                            <Card cardTitle="Grade">
                                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                                <h5>400</h5>
                                <h5>344</h5>
                                <h5>22</h5>
                                <h5>365</h5>
                                </div>
                            </Card>
                        </div>
                    </section>
                    {/* FINAL SCORE */}

                    {/* OUTLINE AND RECOMMENDATION */}
                    <section>
                        <ReportHeader>
                            Outline And Recommendation
                        </ReportHeader>

                        <div className="mt-9 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card cardTitle="Outcome">
                                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                                    Pass
                                </div>
                            </Card>

                            <Card cardTitle="Grade">
                                <div className="w-full flex flex-col font-semibold items-center justify-center text-center gap-4">
                                <h5>400</h5>
                                </div>
                            </Card>
                        </div>

                        <div className="mt-8 mb-7 w-full grid grid-cols-1">
                            <Card cardTitle="Recommendation">
                                <div className="w-full flex flex-col items-center justify-center text-center gap-4">
                                    Tony has been recommended to continue in his career path as a programmer. 
                                    study coding fundamental 2
                                </div>
                            </Card>
                        </div>
                    </section>
                    {/* OUTLINE AND RECOMMENDATION */}
                
                </div>
            </div>

            {/* BUTTON */}
            <div className="w-full flex items-center justify-center">
                <Link href={``}>
                    <button 
                    
                    className={`disabled:bg-[#B1B1B4] disabled:cursor-not-allowed bg-black-500 text-white 
                        py-2 md:py-3 2xl:py-4 px-3 md:px-4 lg:px-6 
                        transition duration-300 hover:bg-opacity-90 rounded-lg`}>
                        Download Report
                    </button>
                </Link>
            </div>
            {/* BUTTON */}
        </div>
    )
}