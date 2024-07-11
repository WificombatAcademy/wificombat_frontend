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
// import HeadingDesign from "../General/headingDesign";
import Image from "next/image";

const coursesData = [
  {
    id: 1,
    level: "Beginner",
    duration: "4 weeks",
    title: "Artificial Intelligence: The Basics of Artificial Intelligence",
    link: "/registration",
  },

  {
    id: 2,
    level: "Beginner",
    duration: "4 weeks",
    title: "Artificial Intelligence: The Basics of Artificial Intelligence",
    link: "/registration",
  },

  {
    id: 3,
    level: "Beginner",
    duration: "4 weeks",
    title: "Artificial Intelligence: The Basics of Artificial Intelligence",
    link: "/registration",
  },

  {
    id: 4,
    level: "Beginner",
    duration: "4 weeks",
    title: "Artificial Intelligence: The Basics of Artificial Intelligence",
    link: "/registration",
  },

  {
    id: 5,
    level: "Beginner",
    duration: "4 weeks",
    title: "Artificial Intelligence: The Basics of Artificial Intelligence",
    link: "/registration",
  },
];

export const HomeCourses = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <section className="relative mt-16">
      {/* <HeadingDesign heading="courses" /> */}
      <div className="relative">
        <div className="relative flex flex-col gap-5 items-center justify-center">
            <div className="absolute top-0 max-[350px]:top-[-0.6rem] max-sm:top-[-0.75rem] max-md:top-[-1rem]">
                <svg
                // width="122"
                // height="60"
                viewBox="0 0 122 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-[122px] w-10 h-10 lg:h-[60px]"
                >
                <path
                    id="Polygon 1"
                    d="M61 59.9221L0.37822 -0.0778809L121.622 -0.0778809L61 59.9221Z"
                    fill="#BC00DD"
                />
                </svg>
            </div>

            <div className="w-full flex flex-col items-center gap-2 mt-[2.5rem] md:mt-[4rem] lg:mt-[7rem]">
                <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:w-24 w-14 h-14 lg:h-24"
                >
                <circle cx="50" cy="50" r="50" fill="#FFB600" />
                <path
                    d="M67.5 57.5C67.5 67.175 59.675 75 50 75C40.325 75 32.5 67.175 32.5 57.5C32.5 50.525 36.6 44.5 42.5 41.675V32.5C42.5 31.125 43.625 30 45 30H46.25L43.75 25H56.25L53.75 30H55C56.375 30 57.5 31.125 57.5 32.5V41.675C63.4 44.5 67.5 50.525 67.5 57.5ZM47.5 35V45.25C44.6766 45.8263 42.139 47.3605 40.3167 49.5927C38.4945 51.825 37.4994 54.6184 37.5 57.5L37.7 59.775L42.5 54.825L52.675 65L62.325 55.35C61.8885 52.8756 60.7183 50.5895 58.9663 48.7885C57.2143 46.9874 54.9614 45.7546 52.5 45.25V35H47.5ZM52.675 50C54.05 50 55.175 51.125 55.175 52.5C55.175 53.875 54.05 55 52.675 55C51.25 55 50.175 53.875 50.175 52.5C50.175 51.125 51.25 50 52.675 50Z"
                    fill="white"
                />
                </svg>

                <h2 className="mt-2 text-center md:text-3xl text-2xl lg:text-5xl uppercase font-medium">
                    courses
                </h2>
            </div>
        </div>


        <div className="absolute inset-0">
            <div className="absolute top-0 right-0">
                <Image 
                src={`/assets/folder.png`}
                alt="design-bg"
                width={200}
                height={201} 
                className="w-12 md:w-20 lg:w-40 object-contain"/>
            </div>
        </div>
    </div>

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
                <div className="w-full h-[240px] bg-black-300 rounded-2xl border border-purple-500"></div>

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
