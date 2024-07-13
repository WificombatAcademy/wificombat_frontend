import Image from "next/image";
import Link from "next/link"
import { PiStarFourFill } from "react-icons/pi";

type Props = {
    billing: string;
    price: string;
    color:string;
}

export const PricingCard = ({billing, price, color}: Props) => {
    return (
        <div className="relative w-full bg-white py-5 md:py-7 lg:py-9 px-4 text-black-500 rounded-3xl">
            {/* ABOSLUTE BLUR */}
            <div className="absolute flex items-center justify-end inset-0">

            <div className="absolute right-[5.7rem] lg:right-[6.6rem] top-3">
                <div className="relative flex items-center justify-center">
                    <PiStarFourFill size={24} className="text-white z-10" />
                    <div className="absolute w-full h-full bg-black-500/0 rounded-full"></div>
                </div>
            </div>

            <div className="absolute right-4 top-10">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 0L17.7813 10.2187L28 14L17.7813 17.7813L14 28L10.2187 17.7813L0 14L10.2187 10.2187L14 0Z" fill="#BC00DD"/>
                </svg>
            </div>

                <div className="w-[60%] h-full grid grid-cols-3">
                    <div className={`w-[90%] ml-auto h-[25%] rounded-b-[40px] ${color} blur-lg`}></div>
                    <div className={`w-[90%] ml-auto h-[45%] rounded-b-[40px] ${color} blur-lg`}></div>
                    <div className={`w-[90%] ml-auto h-[65%] rounded-b-[40px] ${color} blur-lg`}> </div>
                </div>

            </div>
            {/* ABOSLUTE BLUR */}


            <div className="z-[4] relative">
                <h3 className="font-semibold text-2xl md:text-3xl">{billing}</h3>

                <p className="mt-3 
                w-[80%] lg:w-[70%]">Lorem ipsum dolor sit amet consectetur. Facilisis arcu </p>

                <h3 className="text-black-500 mt-8 md:mt-10 text-2xl md:text-4xl font-medium">{price}</h3>

                <div className="mt-7 w-full text-white">
                    <Link href={`/registration`} className="w-full flex items-center justify-center font-medium 
                    bg-black-500 py-4 rounded-lg transition duration-300 hover:bg-opacity-90">
                        Start Learning
                    </Link>
                </div>
            </div>
        </div>
    )
}