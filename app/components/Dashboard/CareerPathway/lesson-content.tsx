import axiosInstance from '@/app/utils/auth-interceptor';
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
}
  

const LessonContent = ({
    currentSlide, 
    handleNextSlide, 
    handlePrevSlide, 
    selectedContent, 
    isQuizMode, 
    loadingQuiz,
    fetchQuiz,
    }: Props) => {
    
  return (
    <>
    <div className="mt-5 p-5 h-[40vh] lg:h-[50vh] bg-white shadow overflow-y-auto rounded-3xl">
        {selectedContent.length > 0 ? (
            <div>
            {/* Display current slide */}
            <div dangerouslySetInnerHTML={{ __html: selectedContent[currentSlide] }} />
            </div>
        ) : (
            <p>Select a lesson to view its content.</p>
        )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="lg:fixed lg:w-[52%] right-0 px-4 sm:px-6 lg:px-8 bottom-[5vh]">
           {!(currentSlide === selectedContent.length - 1) &&
            <div className="mt-4 flex justify-between">
                <button
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                Previous
                </button>
                <button
                onClick={handleNextSlide}
                disabled={currentSlide === selectedContent.length - 1}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                Next
                </button>
            </div>}

            {!isQuizMode && currentSlide === selectedContent.length - 1 &&
            <div className="mt-4 flex justify-end">
                <button
                 onClick={fetchQuiz} 
                className="px-4 py-2 bg-black-500 text-white border border-black-500 
                flex items-center justify-center text-center rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                {loadingQuiz ?
                    <RiLoader4Fill  className='animate-spin'/> :
                    "Proceed to Quiz"
                }
                </button>
            </div>
            }
        </div>
        {/* Navigation Buttons */}
    </>
  )
}

export default LessonContent