"use client"

import React from 'react'
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import HeadingDesign from '../general/HeaderDesign'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import CareerCard from '../Home/career-card';
import { formatPrice } from '@/app/utils/types-and-links';

type Props = {
    modules: any[];
    pricePerModule: number;
    courseLevel: string;
    courseId: string; 
}

const Modules = ({ modules, pricePerModule, courseLevel, courseId }: Props) => {

  return (
    <section>
        <HeadingDesign heading={`Modules`} noUppercase={true} />

        <div className='mt-5'>

            <p className='w-[90%] md:w-[70%] mx-auto text-lg md:text-xl text-center'>
            You can buy the whole course and have access to all the modules 
            or you can decide to buy the modules one after the other.</p>

            {/* MODULES SLIDES */}
            <div className=''>
                <Swiper
                navigation={{
                    nextEl: ".courses-swiper-button-next",
                    prevEl: ".courses-swiper-button-prev",
                }}
                pagination={{ clickable: true, el: ".modules-swiper-pagination" }}
                breakpoints={{
                    320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    },
                    640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    },
                    1000: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        },
                }}
                loop={true}
                modules={[Navigation, Pagination]}
                className="mt-16 relative w-[93%] md:w-[90%] lg:w-[88%] 
                mx-auto flex items-center justify-center overflow-visible"
                >
                {modules && modules.map((module) => (
                    <SwiperSlide
                    key={module.id}
                    className="pt-5 md:pt-12 pb-8 relative flex 
                    items-center justify-center overflow-visible"
                    >
                        <CareerCard
                            curriculum={true}
                            pathway={module.title}
                            moduleSubject={module.title}
                            // moduleImage={module.cimage}
                            level={courseLevel}
                            desc={`Whether you're starting or advancing, our modules 
                                offer a comprehensive and engaging learning experience.`}
                            price={formatPrice(pricePerModule.toFixed(2))}
                            item={{...module, course_id: courseId }} 
                            type='module'
                        />
                    </SwiperSlide>
                ))}
                </Swiper>

                <div className="relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 flex items-center justify-between">
                    <div className="courses-swiper-button-prev bg-transparent w-9 h-9 md:w-14 md:h-14 
                    rounded flex items-center justify-center transition duration-500 ease-in-out
                     max-m cursor-pointer">
                        <GrFormPrevious size={28} />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className={`modules-swiper-pagination`}></div>
                    </div>

                    <div className="courses-swiper-button-next bg-transparent w-9 h-9 md:w-14 md:h-14 
                    rounded flex items-center justify-center transition duration-500 ease-in-out
                     max-m cursor-pointer">
                        <GrFormNext size={28} />
                    </div>
                </div>

            </div>
            {/* MODULES SLIDE */}

        </div>
    </section>
  )
}

export default Modules