import React from 'react'

type Props = {
    selectedContent: any[];
    handlePrevSlide:() => void;
    handleNextSlide: () => void;
    currentSlide: number;

}

const LessonContent = ({currentSlide, handleNextSlide, handlePrevSlide, selectedContent}: Props) => {
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
        </div>
        </div>
        {/* Navigation Buttons */}
    </>
  )
}

export default LessonContent