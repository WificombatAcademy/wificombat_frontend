"use client"
import Image from 'next/image';
import React from 'react'
import { RiLoader4Fill } from 'react-icons/ri';

type Props = {
    selectedContent: any[];
    handlePrevSlide:() => void;
    handleNextSlide: () => void;
    currentSlide: number;
    isQuizMode: boolean;
    loadingQuiz: boolean;
    fetchQuiz: () => void;
    lessonTitle: string;
    lessonIndex: number;
    totalSlides: number;
}
  

const LessonContent = ({
    currentSlide, 
    handleNextSlide, 
    handlePrevSlide, 
    selectedContent, 
    isQuizMode, 
    loadingQuiz,
    fetchQuiz,
    lessonTitle,
    lessonIndex,
    totalSlides,
    }: Props) => {

    console.log(selectedContent)
    
  return (
    <>
    <div className="relative mt-5 p-5 h-[40vh] lg:h-[50vh] bg-white shadow overflow-y-auto rounded-3xl">
        <div className="absolute bg-white inset-0 flex items-center justify-center">
            <Image 
            src={`/logo.png`}
            alt='background'
            width={40}
            height={40}
            className='w-full h-full object-contain invert-[100%] opacity-10'
            />
        </div>
        {selectedContent.length > 0 ? (
            <div className='relative z-[1]'>
            {/* Display current slide */}
            <div 
            className='bg-transparent'
            dangerouslySetInnerHTML={{ __html: selectedContent[currentSlide] }} />
            </div>
        ) : (
            <p className='m-auto text-center'>Select a lesson to view its content.</p>
        )}
        </div>

        {/* LESSON DETAILS */}
        <div>
            <div className='w-full flex items-center justify-between text-xl font-semibold'>
                <h2 className="">{lessonTitle}</h2>
                <p className="">
                 {currentSlide + 1}/{totalSlides} Slides
                </p>
            </div>
            <div>
                <p className='text-black-600'> Lesson {lessonIndex}</p>
            </div>
        </div>
        {/* LESSON DETAILS */}
        
        {/* Navigation Buttons */}
        <div className="lg:fixed lg:w-[52%] right-0 px-4 sm:px-6 lg:px-8 bottom-[5vh]">
            <div className="mt-4 flex justify-between">
                <button
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                Previous
                </button>
                {!(currentSlide === selectedContent.length - 1) &&
                <button
                onClick={handleNextSlide}
                disabled={currentSlide === selectedContent.length - 1}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                Next
                </button>}

                {!isQuizMode && currentSlide === selectedContent.length - 1 &&
                <button
                 onClick={fetchQuiz} 
                className={`px-4 ${loadingQuiz && 'px-12'} py-2 bg-black-500 text-white border border-black-500 
                flex items-center justify-center text-center rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed`}
                >
                {loadingQuiz ?
                    <RiLoader4Fill size={23} className='animate-spin'/> :
                    "Proceed to Quiz"
                }
                </button>}
            </div>
        </div>
        {/* Navigation Buttons */}
    </>
  )
}

export default LessonContent