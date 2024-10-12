"use client"

import React from 'react'
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import HeadingDesign from '../general/HeaderDesign'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

type Props = {
    modules: any[];
}

const Modules = ({ modules }: Props) => {
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
                freeMode={true}
                slidesPerGroup={1}
                slidesPerView={"auto"}
                centeredSlides={true}
                navigation={{
                    nextEl: ".courses-swiper-button-next",
                    prevEl: ".courses-swiper-button-prev",
                }}
                pagination={{ clickable: true, el: ".courses-swiper-pagination" }}
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
                    slidesPerView: 4,
                    spaceBetween: 30,
                    },
                }}
                loop={true}
                modules={[FreeMode, Navigation, Pagination]}
                className="mt-16 relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex items-center justify-center overflow-visible"
                >
                {modules.map((module, index) => (
                    <SwiperSlide
                    key={module.id}
                    className="pt-5 md:pt-12 pb-8 relative flex items-center justify-center overflow-visible"
                    >
                    
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            {/* MODULES SLIDE */}

        </div>
    </section>
  )
}

export default Modules