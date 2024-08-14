"use client"
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from "next/navigation";
import { BreadcrumbsProps } from "./types-and-links";

export const Breadcrumbs = ({ homeLabel, homeIcon = "/assets/auth/logo.svg", lightMode }: BreadcrumbsProps) => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);

    const notActiveTextColor = lightMode ? "text-black-600" : "text-black-50";
    const activeTextColor = lightMode ? "text-black-500" : "text-white";

    return (
        <div className="absolute w-full left-0 top-[-1.8rem] lg:top-[-3rem] flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Image
                    src={homeIcon}
                    alt={homeLabel}
                    width={15}
                    height={15}
                    className="object-contain text-neutral-400"
                />
                <h3 className={notActiveTextColor}>
                    {homeLabel}
                </h3>
                {pathnames.length > 0 && <IoIosArrowForward className={notActiveTextColor} />}
            </div>
            {pathnames.map((path, index) => {
                const isLast = index === pathnames.length - 1;
                const label = decodeURIComponent(path).replace(/-/g, ' ');

                return (
                    <div key={index} className="flex items-center gap-1 capitalize">
                        <h3 className={isLast ? activeTextColor : notActiveTextColor}>
                            {label}
                        </h3>
                        {!isLast && (
                            <IoIosArrowForward className={notActiveTextColor} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
