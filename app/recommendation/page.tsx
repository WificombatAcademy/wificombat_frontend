"use client"
import Image from "next/image";
import { TodayComp } from "../components/CodingPathwayComps/today-comp";
import Footer from "../components/general/Footer";
import GeneralNavbar from "../components/general/GeneralNavbar";
import Link from "next/link";
import RecommendationDesign from "../components/AssessmentComps/recommendation-design";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from "react";
import { useMain } from "../context/MainContext";
import Loader from "../utils/loader";
import { AgeRange, ageToStageAndSkills, normalizeAge, PathwayName } from "../utils/types-and-links";

export default function RecommendationPage() {
    const searchParams = useSearchParams();
    const [recommendation, setRecommendation] = useState<any>(null);
    const age = normalizeAge(searchParams.get("age"));
    const pathwayData = searchParams.get("pathwayData");
    const userName = searchParams.get("userName");

    const capitalizeName = (name: string) => {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const getStageAndSkills = (age: AgeRange | null, pathwayName: string | null) => {
        if (!age || !pathwayName) return { stage: "N/A", skills: "N/A" };
    
        // Convert pathwayName to lowercase
        const normalizedPathwayName = pathwayName.toLowerCase() as PathwayName;
    
        // Retrieve information for the specified age and pathway
        const ageGroup = ageToStageAndSkills[age];
        if (ageGroup && ageGroup[normalizedPathwayName]) {
            return ageGroup[normalizedPathwayName];
        }
    
        return { stage: "N/A", skills: "N/A" };
    };    


    useEffect(() => {
        if (pathwayData) {
            try {
                // Decode and parse the JSON string
                const decodedData = decodeURIComponent(pathwayData);
                const jsonData = JSON.parse(decodedData);
                setRecommendation(jsonData);
            } catch (error) {
                console.error("Error parsing pathwayData:", error);
            }
        }
    }, [pathwayData]);

    console.log(recommendation)

    // useEffect(() => {
    //     const { search } = window.location;
    //     const queryParams = new URLSearchParams(search);
    //     const data = queryParams.get('data');
    //     if (data) {
    //         setRecommendation(JSON.parse(data));
    //     }
    // }, []);


    if (!recommendation) {
        return (
            <Suspense>
                <Loader />
            </Suspense>
            // <div className="container w-full h-screen flex items-center
            //  justify-center mx-auto text-center overflow-hidden">
            //    <div className="w-[97%] mx-auto lg:-mt-20">
            //     <Image
            //     src={`/oops.png`}
            //     alt="oops"
            //     width={608}
            //     height={456}
            //     className="w-[450px] mx-auto object-contain"
            //     />
            //         <h1 className="text-2xl font-bold">No Recommendation Available</h1>
            //         <p className="mt-4 text-lg">It seems like we couldn&apos;t retrieve your career pathway recommendation.</p>
            //         <Link href="/assessment" className="mt-6 inline-block bg-black-500 text-white px-6 py-3 rounded-lg">
            //             Try Again
            //         </Link>
            //    </div>
            // </div>
        );
    }

    const { stage, skills } = getStageAndSkills(age, recommendation.pathway.pathway_recommendation.name);

    return (
        <Suspense>
            <div className="mx-auto relative container w-full max-w-[2000px] overflow-hidden">
                {/* Navbar and Footer */}
                <GeneralNavbar />
                <div className="w-full relative">
                    {/* SUMMARY */}
                    <RecommendationDesign />

                    <div className="relative z-[5] w-[90%] md:w-[70%] lg:w-[65%] mx-auto">
                        <h1 className="pt-14 md:pt-20 lg:pt-28 text-2xl lg:text-4xl font-bold text-center">
                            {userName ? capitalizeName(userName) : "Your"}{userName ? "'s" : ""} Assessment
                        </h1>
                        <h1 className="relative z-[412] mt-4 text-center text-xl md:text-2xl lg:text-3xl font-medium">
                            {recommendation.pathway.reason || "No reason provided"}
                        </h1>
                    </div>
                    {/* SUMMARY */}

                    {/* PATHWAY */}
                    <div className="relative z-[5] mt-16 md:mt-24 w-full bg-blue-50 py-12">
                        <div className="w-[93%] md:w-[90%] mx-auto flex flex-col md:flex-row md:items-center gap-10 md:gap-14 lg:gap-20 text-black-500">
                            <div className="w-full md:basis-[50%]">
                                <Image
                                    src={`${recommendation.pathway.pathway_recommendation.image}`}
                                    alt={"pathway"}
                                    width={500}
                                    height={500}
                                    className="w-full h-[370px] object-contain border-none"
                                />
                            </div>

                            <div className="w-full md:basis-[50%]">
                                <h2 className="text-blue-500 font-semibold text-xl md:text-2xl lg:text-4xl">
                                    {recommendation.pathway.pathway_recommendation.name || "No pathway provided"} Pathway
                                </h2>

                                <div
                                    className="mt-4 text-lg md:text-xl">
                                    {recommendation.pathway.pathway_recommendation.description}
                                </div>


                                <p className="mt-4 text-lg md:text-xl text-black-700 font-bold">
                                    {stage}
                                </p>

                                <p className="mt-4 md:text-lg text-black-700 font-medium">
                                    Key Skills: {skills} 
                                </p>

                                <div className="mt-8 lg:mt-12">
                                    <Link
                                          href={`/${recommendation.pathway.pathway_recommendation.name.toLowerCase()}-pathway`}
                                        className={`bg-[#131314] text-white focus-visible:outline-black 
                                            rounded-lg px-16 py-5 font-medium shadow-sm hover:bg-opacity-80 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                        `}
                                    >
                                    Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* PATHWAY */}

                    {/* REASONS */}
                    <div className="relative z-[5] w-[90%] mx-auto py-12 md:py-16">
                        <h2 className="font-semibold text-2xl lg:text-4xl">
                            Reasons For Recommendation
                        </h2>

                        <div className="mt-12 md:mt-16 w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Pathway Highlights
                                </h3>
                                <p className="mt-4 text-lg md:text-xl">
                                    {recommendation.pathway.reason || "No reason provided"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Skill Alignment
                                </h3>
                                <p className="mt-4 text-lg md:text-xl">
                                    You love {skills}? That&apos;s fantastic! It&apos;s just the skill
                                    you need for {recommendation.pathway.pathway_recommendation.name}.
                                    You&apos;ll turn your ideas into stunning visuals!&quot;
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Career Outlook
                                </h3>
                                <p className="mt-4 text-lg md:text-xl">
                                {recommendation.pathway.pathway_recommendation.pathway_outlook}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Next Step
                                </h3>
                                <p className="mt-4 text-lg md:text-xl">
                                {recommendation.pathway.pathway_recommendation.next_step}
                                </p>
                                <div className="mt-8 lg:mt-12">
                                    <Link
                                          href={`/${recommendation.pathway.pathway_recommendation.name.toLowerCase()}-pathway`}
                                        className={`bg-[#131314] text-white focus-visible:outline-black 
                                            rounded-lg px-8 py-3 lg:py-4 font-medium shadow-sm hover:bg-opacity-80 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                        `}
                                    >
                                    Get Started
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Reasons For {stage}
                                </h3>
                                <p className="mt-4 text-lg md:text-xl">
                                {recommendation.pathway.pathway_recommendation.reason_for_stage}
                                </p>
                            </div>

                            {/* ALTERNATIVE PATHS */}
                            <div className="">
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl">
                                    Alternative Paths
                                </h3>

                                <p className="mt-4 text-lg md:text-xl">
                                    If you&apos;re interested in {recommendation.pathway.pathway_recommendation.name}, 
                                    you might consider exploring those pathways as well.
                                </p>

                                <div className="mt-10 flex flex-wrap items-center gap-5">
                                    {/* Alternative pathways can be added here */}
                                    {recommendation.pathway.pathway_recommendation.alternative_paths.map((path:any, index:number) => (
                                         <Link
                                         key={index}
                                         href={`/${(path).toLowerCase()}-pathway`}
                                       className={`border border-[#131314] text-black-500 focus-visible:outline-black 
                                           rounded-lg px-8 py-3 font-medium shadow-sm hover:bg-opacity-80 
                                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                       `}
                                   >
                                   {path} Pathway
                                   </Link>
                                    ))}
                                </div>
                            </div>
                            {/* ALTERNATIVE PATHS */}
                        </div>
                    </div>
                    {/* REASONS */}
                </div>

                <TodayComp 
                    desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat 
                    egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis."
                    header="Start Pathway Today!"
                    linkto="/students/pricing-plan"
                />
                <Footer />
            </div>
        </Suspense>
    );
}