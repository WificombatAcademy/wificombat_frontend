import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

type Props = {
    pathway: string;
    desc: string;
    linkTo?: string;
    subject?: string;
    level?: string;
    bgColor?: string;
    textWhite?: boolean;
    pathways?: string[];
    image?: string;
}

const CareerCard = ({ bgColor ,desc, pathway, linkTo, level, subject, textWhite, pathways, image }: Props) => {
    return (
        <div className="h-full">
            <Link href={`${linkTo && linkTo}`}>
                <div className="w-full flex flex-col h-full bg-white pb-3 shadow-lg rounded-2xl cursor-pointer">
                    <div className={`relative w-full h-[220px] 2xl:h-[250px] min-[2000px]:h-[300px] 
                        ${bgColor ?? "bg-blue-500"} px-4 flex items-end rounded-tl-2xl rounded-tr-2xl`}>
                        {image && <div className="absolute inset-0 bg-black rounded-tl-2xl rounded-tr-2xl">
                            <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-tr-2xl"></div>
                            <Image src={image} alt="pathway"
                            width={300} height={300}
                            className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl" 
                            />
                        </div>}
                        <div className="relative z-[7]">
                            <h3 className={`${textWhite ? "text-white": ""}  my-3 text-lg md:text-2xl text-black-500 font-semibold`}>
                                {pathway} Pathway</h3>
                        </div>
                    </div>

                    <div className="py-3 px-4">
                        {subject && <h3 className="pt-3 font-medium text-lg md:text-xl text-black-800">{subject}</h3>}
                        {level && <h3 className="pt-1 font-medium md:text-lg text-black-800">{level}</h3>}
                        <p className="pt-4 text-black-800">{desc}</p>

                    {/* {linkTo &&
                        <div className="mt-8">
                            <Link href={linkTo} className="w-full">
                                <p className="w-full bg-black-500 py-4 text-white 
                    text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"> View More</p>
                            </Link>
                    </div>} */}

                    {pathways && 
                    <div className="mt-3 flex flex-wrap items-center gap-1">
                        {pathways?.map((pathway, index) => (
                            <div 
                            key={index}
                            className="bg-black-50 py-1 px-2 rounded-lg border text-center flex items-center justify-center
                            text-black-600 text-xs capitalize">
                                {pathway}
                            </div>
                        ))}
                        <div className="bg-black-50 py-1 px-2 rounded-lg border 
                        text-center flex items-center justify-center text-black-600">
                            <FaPlus size={14}/>
                        </div>
                    </div>}

                    </div>
                </div>
            </Link>

        </div>
    )
}

export default CareerCard