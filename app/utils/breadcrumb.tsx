"use client"
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreadcrumbsProps } from "./types-and-links";

export const Breadcrumbs = ({ homeLabel, homeIcon = "/assets/auth/logo.svg", lightMode }: BreadcrumbsProps) => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);

    const notActiveTextColor = lightMode ? "text-black-600" : "text-gray-300";
    const activeTextColor = lightMode ? "text-black-500" : "text-white";

    return (
        <div className="absolute w-full left-0 top-[-1rem] lg:top-[-3rem] flex items-center gap-3">
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
                    <h3 className="text-lg">{homeLabel}</h3>
                </Link>
                {pathnames.length > 0 && <IoIosArrowForward className={notActiveTextColor} />}
            </div>

            {/* Breadcrumb paths */}
            {pathnames.map((path, index) => {
                const isLast = index === pathnames.length - 1;
                const label = decodeURIComponent(path).replace(/-/g, ' ');
                const href = `/${pathnames.slice(0, index + 1).join('/')}`; // Construct path for each breadcrumb

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
            })}
        </div>
    );
};