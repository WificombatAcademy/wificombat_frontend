"use client"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
    {heading1: "Shape Your Gaming Career Pathway", 
     heading2: `Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway`,
    bgColor: "bg-black-500", buttonBlack: false },

    {heading1: "Discover Your Coding Career Pathway", 
    heading2: `Turn your passion for technology into a thriving career in software engineering or DevOps. Begin your path with us`,
    bgColor: "bg-purple-500", buttonBlack: true },

    {heading1: "Explore the Multimedia Pathway", 
    heading2: `Your Journey in Multimedia Starts Here! Join our program to become a skilled Animator, Illustrator, and 2D & 3D Designer. Shape your creative future with us.`,
    bgColor: "bg-blue-500", buttonBlack: true },

    {heading1: "Dive into the Robotics and IoT Career Pathway", 
    heading2: `Step into the world of Robotics and IoT with our exclusive career pathway program. Design and implement groundbreaking technologies`,
    bgColor: "bg-yellow-500", buttonBlack: true },

    {heading1: "Navigate the AI Career Pathway", 
     heading2: `Dive into the exciting world of artificial intelligence. Gain expertise, innovate, and lead the way in AI technology with our specialized career pathway.`,
    bgColor: "bg-blue-300", buttonBlack: true },
]

export const Hero = () => {
    return (
        <section className="text-white">
            <Swiper 
            modules={[ Pagination, Navigation ]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="relative text-white w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-[93%] md:w-[90%] mx-auto">
                        <div className={`relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] ${slide.bgColor}`}>
                            <div className="relative max-md:mt-[4rem] w-[93%] md:w-[85%] mx-auto flex flex-col md:flex-row md:items-center gap-10">
                                <div className="w-full md:basis-[50%]">
                                    <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl md:w-[85%]">
                                        {slide.heading1}
                                    </h1>

                                    <p className="mt-5 text-lg md:text-xl h-[7.4rem] md:h-[5rem]">
                                        {slide.heading2}
                                    </p>
                                    
                                    <div className="mt-9 md:mt-14">
                                        {slide.buttonBlack ? 
                                        <>
                                        <Link
                                            href="/register"
                                            className="rounded-lg bg-[#131314] px-16 py-5 font-medium text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            Register
                                        </Link>
                                        </> : 
                                        <>
                                        <Link 
                                        href={`/register`}
                                        style={{background:
                                        `conic-gradient(from 173.86deg at 50% 50%, #FFB600 -13.12deg, #BC00DD 120deg, #0784C3 181.87deg, #FFB600 346.88deg, #BC00DD 480deg)`,
                                        }}
                                        className="px-16 py-5 font-medium text-white shadow-sm rounded-lg transition duration-300 hover:bg-opacity-90">
                                            Register
                                        </Link>
                                        </>}
                                </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}