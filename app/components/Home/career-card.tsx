import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

type Props = {
    pathway: string;
    desc: string;
    price?: string;
    linkTo?: string;
    subject?: string;
    level?: string;
    bgColor?: string;
    textWhite?: boolean;
    pathways?: string[];
    image?: string;
    pathwayImage?: string;
    curriculum?: boolean;
    coursePageLinkTo?: {
        pathname: string;
        query: {
          title: string;
          subject: string;
          image: string;
          description: string;
          level: string;
        };
      };
}

const CareerCard = ({ bgColor ,desc, coursePageLinkTo, linkTo, level, subject, 
    textWhite, pathways, image, pathwayImage, curriculum, price }: Props) => {


    const finalLink = 
    linkTo || 
    (coursePageLinkTo && { pathname: coursePageLinkTo.pathname, query: coursePageLinkTo.query });

    return (
        <div className="h-full">
            <div className="w-full flex flex-col h-full bg-[#fafafa] pb-3 shadow-lg rounded-2xl cursor-pointer">


            <Link href={`${linkTo && linkTo}`}
                className={`relative w-full 
                ${curriculum ? "h-[200px] min-[2000px]:h-[300px]" : "h-[250px] min-[2000px]:h-[330px]" } 
                    ${bgColor ?? "bg-blue-500"} px-4 flex items-end rounded-tl-2xl rounded-tr-2xl`}>

                    {pathwayImage && 
                        <Image src={pathwayImage} alt="pathway"
                        width={300} height={300}
                        className="w-full h-full object-contain rounded-tl-2xl rounded-tr-2xl" 
                        />
                    }

                    {image && finalLink &&
                    <Link  href={typeof finalLink === "string" ? 
                            finalLink : { pathname: finalLink.pathname, query: finalLink.query }}>
                        <div className="absolute inset-0 bg-gray-50 rounded-tl-2xl rounded-tr-2xl">
                            <Image src={image} alt="pathway"
                            width={300} height={300}
                            className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl" 
                            />
                        </div>
                        </Link>
                    }

                    {/* <div className="relative z-[7]">
                        {!pathwayImage &&
                        <h3 
                        className={`${textWhite ? "text-white": ""}  
                        my-3 text-lg md:text-2xl text-black-500 font-semibold`}>
                            {pathway} Pathway</h3>}
                    </div> */}
                 </Link>

                <div className="py-3 px-4">

                    {subject && finalLink && (
                        <Link href={typeof finalLink === "string" ? 
                        finalLink : { pathname: finalLink.pathname, query: finalLink.query }}>
                            <h3 className={`font-medium text-lg 
                            ${!curriculum ? "md:text-xl pt-3" : "font-semibold"} text-black-800`}>
                            {subject}</h3>
                        </Link>
                    )}

                    <div className="flex items-center gap-5">

                    {level && 
                    <h3 className={`pt-1 font-medium md:text-lg 
                    ${curriculum ? "text-black-600 font-semibold" : "text-black-800"} `}>{level}</h3>}

                    {price && <h3 className={`pt-1 font-bold text-black-500`}>{price}</h3>}
                    </div>

                    <p className={`${!curriculum ? "pt-4" : "pt-3"} text-black-800`}>{desc}</p>

                {curriculum &&
                    <div className="mt-8 flex items-center justify-between gap-4">
                        <button className="w-full">
                            <p className="w-full border border-black-500 py-3 text-black-500 
                                text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"> Add to Cart</p>
                        </button>

                        <button className="w-full">
                            <p className="w-full bg-black-500 py-3 text-white 
                                text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"> Buy Now</p>
                        </button>
                    </div>}

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
        </div>
    )
}

export default CareerCard