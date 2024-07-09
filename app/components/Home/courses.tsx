"use client"
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Design } from "../general/header-design"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useState } from 'react';

const coursesData = [
    {
        id: 1,
        level: "Beginner",
        duration: "4 weeks",
        title: "Artificial Intelligence: The Basics of Artificial Intelligence",
        link: "/register",
    },

    {
        id: 2,
        level: "Beginner",
        duration: "4 weeks",
        title: "Artificial Intelligence: The Basics of Artificial Intelligence",
        link: "/register",
    },

    {
        id: 3,
        level: "Beginner",
        duration: "4 weeks",
        title: "Artificial Intelligence: The Basics of Artificial Intelligence",
        link: "/register",
    },

    {
        id: 4,
        level: "Beginner",
        duration: "4 weeks",
        title: "Artificial Intelligence: The Basics of Artificial Intelligence",
        link: "/register",
    },

    {
        id: 5,
        level: "Beginner",
        duration: "4 weeks",
        title: "Artificial Intelligence: The Basics of Artificial Intelligence",
        link: "/register",
    },
]

export const Courses = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    return (
        <section className="relative mt-16">
            <Design title="courses"/>

            <div className="mt-9 md:mt-14 w-full bg-blue-200 py-14">
                <h3 className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto text-center text-2xl md:text-3xl font-semibold">
                    Explore Courses Enhance Your Skills: Explore Our Diverse Courses
                </h3>
                <p className="mt-5 w-[95%] md:w-[75%] lg:w-[65%] mx-auto text-center text-lg md:text-xl">From beginners to advanced learners, our courses cater to all levels. 
                Explore our curriculum and take the next step in your tech career journey.</p>

        <Swiper
          freeMode={true}
          slidesPerGroup={1}
          slidesPerView={'auto'}
          centeredSlides={true}
          navigation={{nextEl: ".courses-swiper-button-next", prevEl: ".courses-swiper-button-prev", }}
          pagination={{ clickable: true, el:".courses-swiper-pagination", }}          
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          modules={[ FreeMode, Navigation, Autoplay, Pagination]}
          onActiveIndexChange={
            (swiper) => setActiveSlide(swiper.realIndex)
          }
          className='mt-16 relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex items-center justify-center overflow-visible'
        >
            {coursesData.map((course, index) => (
                <SwiperSlide key={course.id} className='pt-12 pb-8 relative flex items-center justify-center overflow-visible'>
                    <div className={`inset-0 overflow-visible ${index === activeSlide ? 'absolute' : 'hidden'}`}>
                        <div className='flex-shrink-0 absolute w-full h-[500px] bottom-0 bg-purple-500 left-5 rounded-lg'></div>
                    </div>
                    <div className='z-[2] relative h-[500px] bg-white flex items-center justify-center text-2xl shadow-lg rounded-lg'>
                        {course.id}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

            <div className='relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 flex items-center justify-between'>
                <div className='courses-swiper-button-prev bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 max-m cursor-pointer'>
                    <GrFormPrevious size={28}/>
                </div>

               <div className='flex items-center gap-2 md:gap-3'>
                    <div className={`courses-swiper-pagination`}>
                    </div>
               </div>

                <div className='courses-swiper-button-next bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 max-m cursor-pointer'>
                    <GrFormNext size={28}/>
                </div>
            </div>

            </div>
        </section>
    )
}