"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";

const testimonialData = [

  { name:"Esther Howard", 
    role: "Alumni", 
    testimonial:"Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris lacus massa dis. Habitasse viverra blandit tincidunt ",
    image: "/testimonials.jpeg",
    },

  { name:"Micheal Howard", 
    role: "Alumni", 
    testimonial:"Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris lacus massa dis. Habitasse viverra blandit tincidunt ",
    image: "/testimonials.jpeg",
    },

  { name:"Benjamin Howard", 
    role: "Alumni 2", 
    testimonial:"Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris lacus massa dis. Habitasse viverra blandit tincidunt ",
    image: "/testimonials.jpeg",
    },

  { name:"James Howard", 
    role: "Alumni", 
    testimonial:"Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris lacus massa dis. Habitasse viverra blandit tincidunt ",
    image: "/testimonials.jpeg",
    },

  { name:"Rebecca Howard", 
    role: "Alumni", 
    testimonial:"Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris lacus massa dis. Habitasse viverra blandit tincidunt ",
    image: "/testimonials.jpeg",
    },

];

export const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className="w-full py-7 md:py-10 bg-black-500">
        <div
            className="w-[93%] md:w-[88%] mx-auto mt-3 flex max-[330px]:flex-col 
            flex-row items-center justify-center gap-2 md:gap-4">
            <div className="bg-white py-4 px-5 font-semibold text-lg md:text-2xl rounded-3xl">
            TESTIMONIALS
            </div>
            <div className="text-white font-semibold text-lg md:text-2xl">
            FROM OUR USERS
            </div>
        </div>

        <div className="mt-14 w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
            <div className="md:w-[75%] mx-auto text-center text-white">
                <Swiper
                autoplay={{delay: 10000}}
                modules={[ Autoplay ]}
                onActiveIndexChange={
                    (swiper) => setActiveSlide(swiper.realIndex)
                }>
                    {testimonialData.map((testimonial, index) => (
                        <SwiperSlide 
                        key={index}
                        className={``}>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                                <FaQuoteLeft size={40} className="flex-shrink-0 max-md:mx-auto" />
                                <p className="font-medium md:text-xl">
                                {testimonial.testimonial}{" "}
                                </p>
                            </div>

                            <h2 className="mt-6 md:mt-8 text-2xl md:text-3xl font-semibold">
                                {testimonial.name}
                            </h2>
                            <h4 className="mt-5 text-lg md:text-xl">{testimonial.role}</h4>
                        </SwiperSlide>
                    ))}
                    
                    <div className="mt-14 mb-40 flex items-center justify-center">
                        <div className="flex items-center gap-2 md:gap-6">
                            {testimonialData.map((testImage, index) => (
                            <div
                                key={index}
                                className={`relative max-[350px]:w-[55px] max-[350px]:h-[55px] w-[60px] h-[60px] 
                                    md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full 
                                    ${index === activeSlide ? "border-4 border-purple-500": ""}`}
                                >
                                 <div className="image-container w-full h-full">
                                    <Image
                                    width={320}
                                    height={480}
                                    src={testImage.image}
                                    alt={`testimonial ${index + 1}`}
                                    className="object-cover w-full h-full"
                                    />
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Swiper>

            </div>
        </div>

    </div>
  );
};