"use client";
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

type Props = {
    pathwayData: any;
    userName: any
}

function RecommendationContent({ pathwayData, userName }: Props) {
    const [recommendation, setRecommendation] = useState<any>(null);

    const capitalizeName = (name: string) => {
        return name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    useEffect(() => {
        if (pathwayData) {
            try {
                const decodedData = decodeURIComponent(pathwayData);
                const jsonData = JSON.parse(decodedData);
                setRecommendation(jsonData);
            } catch (error) {
                console.error("Error parsing pathwayData:", error);
            }
        }
    }, [pathwayData]);

    if (!recommendation) {
        return <Loader />;
    }

    return (
        <div className="mx-auto relative container w-full max-w-[2000px] overflow-hidden">
            <GeneralNavbar />
            <div className="w-full relative">
                <RecommendationDesign />
                <div className="relative z-[5] w-[90%] md:w-[70%] lg:w-[65%] mx-auto">
                    <h1 className="pt-14 md:pt-20 lg:pt-28 text-2xl lg:text-4xl font-bold text-center">
                        {userName ? capitalizeName(userName) : "Your"}{userName ? "'s" : ""} Assessment
                    </h1>
                    <h1 className="relative z-[412] mt-4 text-center text-xl md:text-2xl lg:text-3xl">
                        {recommendation.pathway.reason || "No reason provided"}
                    </h1>
                </div>

                <div className="relative z-[5] mt-16 md:mt-24 w-full bg-blue-50 py-12">
                    <div className="w-[93%] md:w-[90%] mx-auto flex flex-col md:flex-row md:items-center gap-10 md:gap-14 lg:gap-20 text-black-500">
                        <div className="w-full md:basis-[50%]">
                            <Image
                                src={`https://wificombatacademy.com/${recommendation.pathway.image}`}
                                alt={"pathway"}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover border-none"
                            />
                        </div>

                        <div className="w-full md:basis-[50%]">
                            <h2 className="text-blue-500 font-semibold text-xl md:text-2xl lg:text-4xl">
                                {recommendation.pathway.pathway || "No pathway provided"}
                            </h2>

                            <div className="mt-4 text-lg md:text-xl">
                                {recommendation.pathway.description}
                            </div>

                            <p className="mt-4 text-lg md:text-xl text-black-700 font-semibold">
                                Key Skills: Python, JavaScript, HTML, CSS, Databases
                            </p>

                            <div className="mt-8 lg:mt-12">
                                <Link
                                    href={`/`}
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
            </div>
            <TodayComp 
                desc="Lorem ipsum dolor sit amet consectetur. Senectus in consequat 
                egestas faucibus morbi pulvinar nec ac. Morbi phasellus sed augue neque ac nibh varius vitae sagittis."
                header="Start Pathway Today!"
                linkto="/students/pricing-plan"
            />
            <Footer />
        </div>
    );
}

export default function RecommendationPage() {
    const searchParams = useSearchParams();
    const pathwayData = searchParams.get("pathwayData");
    const userName = searchParams.get("userName");

    return (
        <Suspense fallback={<Loader />}>
            <RecommendationContent pathwayData={pathwayData} userName={userName} />
        </Suspense>
    );
}
