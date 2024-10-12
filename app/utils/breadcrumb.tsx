"use client";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BreadcrumbsProps } from "./types-and-links";

export const Breadcrumbs = ({ homeLabel, homeIcon = "/assets/auth/logo.svg", lightMode }: BreadcrumbsProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pathnames = pathname.split("/").filter((x) => x);

    const notActiveTextColor = lightMode ? "text-black-50" : "text-gray-300";
    const activeTextColor = lightMode ? "text-black-500" : "text-white";

    // Extract the course-related query parameters
    const courseTitle = searchParams.get("title");
    const courseSubject = searchParams.get("subject");

    // Check if the current path is for a course page
    const isCoursePage = pathname.startsWith("/course");

    return (
        <div className={`absolute w-full left-0 
        ${isCoursePage ? 'top-[1rem]' : 'top-[-1rem]'} lg:top-[-3rem] flex items-center gap-3`}>
            {/* Home link */}
            <div className="flex items-center gap-2">
                <Link href="/">
                    <Image
                        src={homeIcon}
                        alt={homeLabel}
                        width={20}
                        height={20}
                        className="w-7 object-contain text-neutral-400"
                    />
                </Link>
                <Link href="/" className={notActiveTextColor}>
                    <h3 className={`${isCoursePage ? "text-sm lg:text-lg" : "text-lg"}`}>{homeLabel}</h3>
                </Link>
                <IoIosArrowForward className={notActiveTextColor} />
            </div>

            {/* Custom breadcrumb for course page */}
            {isCoursePage ? (
                <>
                    <Link href="/Student/Curriculum" className={notActiveTextColor}>
                        <h3 className="text-sm lg:text-lg">Student Curriculum</h3>
                    </Link>
                    <IoIosArrowForward className={notActiveTextColor} />
                    <h3 className={`text-sm lg:text-lg cursor-pointer ${activeTextColor}`}>{"Course"}</h3>
                </>
            ) : (
                // Default behavior
                pathnames.map((path, index) => {
                    const isLast = index === pathnames.length - 1;
                    const label = decodeURIComponent(path).replace(/-/g, ' ');
                    const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <div key={index} className="flex items-center gap-1 capitalize">
                            {!isLast ? (
                                <Link href={href} className={notActiveTextColor}>
                                    <h3 className={`text-lg cursor-pointer ${notActiveTextColor}`}>{label}</h3>
                                </Link>
                            ) : (
                                <h3 className={`text-lg cursor-pointer ${activeTextColor}`}>{label}</h3>
                            )}
                            {!isLast && <IoIosArrowForward className={notActiveTextColor} />}
                        </div>
                    );
                })
            )}
        </div>
    );
};
