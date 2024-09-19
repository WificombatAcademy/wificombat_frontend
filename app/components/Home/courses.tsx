"use client";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";
import HeadingDesign from "../general/HeaderDesign";

const coursesData = [
  {
    id: 1,
    level: "Beginner",
    duration: "4 weeks",
    title: "Coding fundamental 1 (Lightbot and Mblock)",
    link: "/registration",
  },

  {
    id: 2,
    level: "Beginner",
    duration: "4 weeks",
    title: "Coding fundamental 2 (Lightbot and Mblock)",
    link: "/registration",
  },

  {
    id: 3,
    level: "Beginner",
    duration: "4 weeks",
    title: "",
    link: "/registration",
  },

  {
    id: 4,
    level: "Beginner",
    duration: "4 weeks",
    title: "Coding fundamental 3 (Lightbot and Mblock)",
    link: "/registration",
  },

  {
    id: 5,
    level: "Beginner",
    duration: "4 weeks",
    title: "Pictoblox",
    link: "/registration",
  },
];


export const HomeCourses = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <section className="relative mt-16">
      <HeadingDesign heading="courses" />

      <div className="mt-9 md:mt-14 w-full bg-blue-200 py-14">
        <h3 className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto text-center text-2xl md:text-3xl font-semibold">
          Explore Courses Enhance Your Skills: Explore Our Diverse Courses
        </h3>
        <p className="mt-5 w-[95%] md:w-[75%] lg:w-[65%] mx-auto text-center text-lg md:text-xl">
          From beginners to advanced learners, our courses cater to all levels.
          Explore our curriculum and take the next step in your tech career
          journey.
        </p>

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
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          modules={[FreeMode, Navigation, Pagination]}
          onActiveIndexChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="mt-16 relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto flex items-center justify-center overflow-visible"
        >
          {coursesData.map((course, index) => (
            <SwiperSlide
              key={course.id}
              className="pt-5 md:pt-12 pb-8 relative flex items-center justify-center overflow-visible"
            >
              <div
                className={`inset-0 overflow-visible ${
                  index === activeSlide ? "absolute" : "hidden"
                }`}
              >
                <div className="flex-shrink-0 absolute w-full h-[550px] md:h-[500px] lg:h-[550px] bottom-0 bg-purple-500 left-5 rounded-2xl max-lg:hidden"></div>
              </div>
              <div className="z-[2] relative h-[550px] md:h-[500px] lg:h-[550px] bg-white p-6 text-2xl shadow-lg rounded-2xl">
                <div className="w-full h-[240px] bg-blue-500 rounded-2xl border border-purple-500"></div>

                <div className="mt-4 w-full flex items-center justify-between">
                  <div className="flex items-center gap-2 text-black-600">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 22V8H7V22H3ZM10 22V2H14V22H10ZM17 22V14H21V22H17Z"
                        fill="#636369"
                      />
                    </svg>
                    <p className="font-semibold text-sm lg:text-lg">
                      {course.level}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-black-600">
                    <FaRegClock />
                    <p className="font-semibold text-sm lg:text-lg">
                      {course.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <h4 className="text-black-500 font-semibold">
                    {course.title}
                  </h4>
                </div>

                <div className="mt-5 md:mt-7">
                  <Link
                    href={course.link}
                    className={`py-4 px-8 rounded-lg text-base 
                             ${
                               index === activeSlide
                                 ? "bg-black-500 text-white"
                                 : "text-black border border-black-500 "
                             }`}
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="relative w-[93%] md:w-[90%] lg:w-[88%] mx-auto mt-8 md:mt-12 flex items-center justify-between">
          <div className="courses-swiper-button-prev bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 max-m cursor-pointer">
            <GrFormPrevious size={28} />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className={`courses-swiper-pagination`}></div>
          </div>

          <div className="courses-swiper-button-next bg-blue-50 w-9 h-9 md:w-14 md:h-14 rounded flex items-center justify-center transition duration-500 ease-in-out hover:bg-blue-100 max-m cursor-pointer">
            <GrFormNext size={28} />
          </div>
        </div>
      </div>
    </section>
  );
};
