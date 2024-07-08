import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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
    heading2: `Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway`,
    bgColor: "bg-yellow-500", buttonBlack: true },

    {heading1: "Shape Your Gaming Career Pathway", 
     heading2: `Ready to turn your passion for gaming into a career? Dive into the world of game development and start your game career pathway`,
    bgColor: "bg-blue-300", buttonBlack: true },
]

export const Hero = () => {
    return (
        <section className="text-white">
            <Swiper 
            modules={[ Pagination ]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay:5000 }}
            pagination={{ clickable: true }}
            className="relative"
            >
                
            </Swiper>
            <div className="relative isolate overflow-hidden pb-[7rem] md:py-[7rem] lg:py-[10rem] bg-black-500">
                <div className="max-md:mt-[4rem] w-[93%] md:w-[90%] mx-auto flex flex-col md:flex-row md:items-center gap-10">
                    <div className="w-full md:basis-[50%]">
                        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl md:w-[85%]">
                            Shape Your Gaming Career Pathway
                        </h1>

                        <p className="mt-5 text-lg md:text-xl">
                            Ready to turn your passion for gaming into a career? 
                            Dive into the world of game development and start your game career pathway
                        </p>
                        
                        <div className="mt-9 md:mt-14">
                            <Link 
                            href={`/register`}
                            style={{background:
                            "conic-gradient(from 173.86deg at 50% 50%, #FFB600 -13.12deg, #BC00DD 120deg, #0784C3 181.87deg, #FFB600 346.88deg, #BC00DD 480deg)",
                            }}
                            className="px-16 py-5 font-medium text-white shadow-sm rounded-lg">
                                Register
                            </Link>
                       </div>
                    </div>
                </div>
            </div>
        </section>
    )
}