"use client"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { merriweather } from "@/app/fonts";
import Image from "next/image";
import Cart from "@/app/utils/cart";

const slides = [
    {heading1: "Discover Your Coding Career Pathway", 
     heading2: `Turn your passion for technology into a thriving career in software engineering or DevOps. Begin your path with us`,
    bgColor: "bg-blue-500", buttonBlack: true, img:"/hero-1.png", width:"w-full" },

    {heading1: "Shape Your Gaming Career Pathway", 
    heading2: `Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway`,
    bgColor: "bg-blue-300", buttonBlack: true, img:"/hero-2.png", width:"w-full" },

    {heading1: "Explore the Multimedia Pathway", 
    heading2: `Your Journey in Multimedia Starts Here! Join our program to become a skilled Animator, Illustrator, and 2D & 3D Designer. Shape your creative future with us.`,
    bgColor: "bg-purple-500", buttonBlack: true, img:"/hero-3.png", width:"w-[85%]" },

    {heading1: "Navigate the AI Career Pathway", 
    heading2: `Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway.`,
    bgColor: "bg-black-500", buttonBlack: false, img: "/hero-4.png", width:"w-[80%]" },

    {heading1: "Dive into the Robotics and IoT Career Pathway", 
    heading2: `Step into the world of Robotics and IoT with our exclusive career pathway program. Design and implement groundbreaking technologies`,
    bgColor: "bg-blue-500", buttonBlack: true, img:"/hero-5.png", width:"w-[90%]" },

    {heading1: "Navigate the  Techprenuership Career Pathway", 
     heading2: `Lorem ipsum dolor sit amet consectetur. Nunc et aenean imperdiet dignissim suspendisse in. Pretium ante adipiscing sed amet eget sed in. Parturient t`,
    bgColor: "bg-yellow-500", buttonBlack: true, img:"/hero-6.png", width:"w-[90%]" },
]

export const Hero = () => {
    return (
        <section 
        id="home"
        className="text-white">
            <Swiper 
            modules={[ Pagination, Navigation, Autoplay ]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{delay: 7000}}
            pagination={{ clickable: true }}
            className="relative text-white w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <div className={`relative isolate overflow-x-hidden pb-[2rem] md:pb-[7rem] md:py-[7rem] lg:py-[10rem] 
                             max-md:min-h-[830px] ${slide.bgColor}`}>

                            <Cart/>

                            <div className="relative max-md:mt-[2rem] w-[93%] md:w-[80%] lg:w-[80%] mx-auto h-auto md:h-[16rem] 
                                xl:h-[20rem] 2xl:h-[24rem] flex flex-col md:flex-row md:items-center gap-10">
                                    
                                <div className="w-full md:basis-[50%]">
                                    <h1 className={`${merriweather.className} 
                                    text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                                    max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold`}>
                                        {slide.heading1}
                                    </h1>

                                    <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                                        {slide.heading2}
                                    </p>
                                    
                                    <div className="mt-12 lg:mt-16">
                                        <Link
                                            href="/registration"
                                            className={`
                                                ${slide.buttonBlack ? "bg-[#131314] text-white focus-visible:outline-black " :
                                                 "bg-white text-black-500"} rounded-lg px-16 py-5 font-medium shadow-sm 
                                                hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                focus-visible:outline-offset-2 `}
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full md:basis-[50%] max-md:h-[350px]
                                 max-md:flex max-md:items-center max-md:justify-center">
                                    {slide.img !== ""
                                     && 
                                    <Image 
                                    src={slide.img ?? ""}
                                    alt={slide.img ?? ""}
                                    width={500}
                                    height={500}
                                    className={`${slide.width} md:w-full md:h-[570px] object-contain border-none`}
                                    />}
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}