"use client"
import Image from "next/image";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Link from "next/link";
import RecommendationDesign from "../components/AssessmentComps/recommendation-design";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useMain } from "../context/MainContext";

export default function RecommendationPage() {
    const router = useRouter();
    const [recommendation, setRecommendation] = useState<any>(null);
    const {name} = useMain();

    useEffect(() => {
        const { search } = window.location;
        const queryParams = new URLSearchParams(search);
        const data = queryParams.get('data');
        if (data) {
            setRecommendation(JSON.parse(data));
        }
    }, []);

    console.log(recommendation)

   if(recommendation) {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            {/* Navbar and Footer */}
            <GeneralNavbar />
            <div className="w-full relative">
                {/* SUMMARY */}
                <RecommendationDesign />

                <div className="relative z-[5] w-[90%] md:w-[70%] lg:w-[65%] mx-auto">
                    <h1 className="pt-14 md:pt-20 lg:pt-28 text-2xl lg:text-4xl font-bold text-center">
                        {name}&apos;s Assessment
                    </h1>
                    <h1 className="mt-4 text-center text-xl md:text-2xl lg:text-3xl">
                    {recommendation.best_pathway.reason}
                    </h1>
                </div>
                {/* SUMMARY */}

                {/* PATHWAY */}
                <div className="relative z-[5] mt-16 md:mt-24 w-full bg-blue-50 py-12">
                    <div className="w-[93%] md:w-[90%] mx-auto flex flex-col md:flex-row md:items-center gap-10 md:gap-14 lg:gap-20 text-black-500">
                        <div className="w-full md:basis-[50%]">
                            <Image
                                src={"/hero-1.png"}
                                alt={"pathway"}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover border-none"
                            />
                        </div>

                        <div className="w-full md:basis-[50%]">
                            <h2 className="text-blue-500 font-semibold text-xl md:text-2xl lg:text-4xl">
                            {recommendation.best_pathway.pathway}
                            </h2>

                            <p className="mt-4 text-lg md:text-xl">
                                Master programming languages, build web and mobile applications,
                                and become a proficient software developer.
                            </p>

                            <p className="mt-4 text-lg md:text-xl text-black-700 font-semibold">
                                Key Skills: Python, JavaScript, HTML, CSS, Databases
                            </p>

                            <div className="mt-8 lg:mt-12">
                                <Link
                                    href="/registration"
                                    className={`bg-[#131314] text-white focus-visible:outline-black
                                            rounded-lg px-16 py-5 font-medium  shadow-sm hover:bg-opacity-80 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                                >
                                    Register here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* PATHWAY */}

                {/* REASONS */}
                <div className="relative z-[5] w-[90%] mx-auto py-12 md:py-16">
                    <h2 className="font-semibold text-xl md:text-2xl lg:text-4xl">
                        Reasons For Recommendation
                    </h2>

                    <div className="mt-12 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                Pathway Highlights
                            </h3>
                            <p className="mt-4 text-lg md:text-xl">
                                {recommendation.best_pathway.reason}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                Skill Alignment
                            </h3>
                            <p className="mt-4 text-lg md:text-xl">
                            Coming Soon!
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                Career Outlook
                            </h3>
                            <p className="mt-4 text-lg md:text-xl">
                            Coming Soon!
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                Next Step
                            </h3>
                            <p className="mt-4 text-lg md:text-xl">
                            Coming Soon!
                            </p>
                        </div>
                        {/* Additional sections can be added here */}
                    </div>
                </div>
                {/* REASONS */}

                {/* ALTERNATIVE PATHS */}
                <div className="relative z-[5] mt-12 mb-12 w-[90%] mx-auto">
                    <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                        Alternative Paths
                    </h3>

                    <p className="mt-4 text-lg md:text-xl">
                        If you’re also interested in game development or AI, you might
                        consider exploring those pathways as well.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-5">
                        {/* {altPaths && altPaths.map((path:any, index:number) => (
                            <div
                                key={index}
                                className="font-semibold px-4 py-[10px] border border-black-500 max-md:text-sm rounded-lg cursor-pointer"
                            >
                                {path} Pathway
                            </div>
                        ))} */}
                    </div>
                </div>
                {/* ALTERNATIVE PATHS */}
            </div>

            <TodayComp 
                desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis."
                header="Start Pathway Today!"
                linkto="/students/pricing-plan"
            />
            <Footer />
        </div>
    );
    }
   }