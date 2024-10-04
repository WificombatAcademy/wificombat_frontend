import { merriweather } from '@/app/fonts'
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {
    quizData: any[]; 
    handleSubmitQuiz: () => void;
}

const QuizContent = ({handleSubmitQuiz, quizData}: Props) => {
    const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});

    // Handle option selection
    const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
        setQuizAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: selectedOption,
        }));
    };

    // Navigate to next question
    const handleNextQuizQuestion = () => {
        if (currentQuizQuestion < quizData.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        }
    };

    // Navigate to previous question
    const handlePrevQuizQuestion = () => {
        if (currentQuizQuestion > 0) {
        setCurrentQuizQuestion(currentQuizQuestion - 1);
        }
    };

    const currentQuestion = quizData[currentQuizQuestion];

  return (
    <div>
        <div className='w-[95%] md:w-[80%] mx-auto bg-white
        mt-4 lg:mt-9 py-9 px-6 text-black-500 border border-purple-300 rounded-3xl'>
            <div className='flex items-center justify-between'>
                <div>
                    TIMER
                </div>

                <div>
                    <h2 
                    className={`text-lg lg:text-2xl font-semibold
                    ${merriweather.className}`}>
                    Quiz
                    </h2>
                </div>

                <div>

                </div>
            </div>

            <p className="mt-6 mb-4 lg:text-xl text-center font-semibold">{currentQuestion.question}</p>

            {currentQuestion.image && (
                <div className='mt-6 w-full h-[12rem] lg:h-[13rem] bg-gray-50 rounded-lg'>
                    <Image
                    src={`${currentQuestion.image}`} 
                    alt='Quiz Image'
                    width={500}
                    height={200}
                    className='w-full h-full object-cover rounded-lg'
                    
                    />
                </div>
            )}

             {/* Render multiple-choice options */}
            {currentQuestion.type === "multiple-choice" && (
                <div className="mt-4 quiz-options space-y-2">
                {currentQuestion.options.map((option: string, index: number) => (
                    <label key={index} className="quiz-option flex items-center">
                    <input
                        type="radio"
                        name={`question-${currentQuizQuestion}`}
                        value={option}
                        checked={quizAnswers[currentQuizQuestion] === option}
                        onChange={() => handleOptionSelect(currentQuizQuestion, option)}
                        className="mr-2"
                    />
                    {option}
                    </label>
                ))}
                </div>
            )}
            {/* Render multiple-choice options */}

             {/* Render fill-in-the-gap input */}
             {currentQuestion.type === "fill-in-the-gap" && (
                <div className="quiz-fill-gap">
                <input
                    type="text"
                    placeholder="Your answer here"
                    value={quizAnswers[currentQuizQuestion] || ""}
                    onChange={(e) =>
                    handleOptionSelect(currentQuizQuestion, e.target.value)
                    }
                    className="mt-4 outline-none border-b-2 border-dashed border-black-500 
                    p-2 w-full placeholder:text-black-500"
                />
                </div>
            )}
             {/* Render fill-in-the-gap input */}

            {/* Quiz navigation buttons */}
            <div className="quiz-navigation flex items-center justify-between mt-6">

                <button
                onClick={handlePrevQuizQuestion}
                disabled={currentQuizQuestion === 0}
                className="px-4 py-2 bg-transparent border border-black-500 rounded-lg 
                disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
                >
                Previous
                </button>

                <div>
                    <h2 className="">
                        {currentQuizQuestion + 1} of {quizData.length}
                    </h2>
                </div>

                {/* If on the last question, show the submit button */}
                {currentQuizQuestion === quizData.length - 1 ? (
                <button
                    onClick={handleSubmitQuiz}
                    className="px-4 py-2 bg-black-500 text-white border border-black-500 rounded-lg"
                >
                    Submit
                </button>
                ) : (
                <button
                    onClick={handleNextQuizQuestion}
                    className="px-4 py-2 bg-transparent border border-black-500 rounded-lg"
                >
                    Next
                </button>
                )}

            </div>
            {/* Quiz navigation buttons */}


        </div>
    </div>
  )
}

export default QuizContent