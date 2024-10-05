import { merriweather } from '@/app/fonts';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast for notifications
import FlashCardReview from './flash-card';

type Props = {
  quizData: any[];
  activeLessonIndex: number;
  setActiveLessonIndex: Dispatch<SetStateAction<number>>;
  moduleDetails: any[];
  setShowAssignment: Dispatch<SetStateAction<boolean>>;
  setIsQuizMode: Dispatch<SetStateAction<boolean>>;
  setIsLessonMode: Dispatch<SetStateAction<boolean>>;
};

const QuizContent = ({ quizData, activeLessonIndex, setActiveLessonIndex,
     moduleDetails, setShowAssignment, setIsQuizMode, setIsLessonMode }: Props) => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // Handle option selection
  const handleOptionSelect = (questionIndex: number, selectedOption: string) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  // Navigate to the next question
  const handleNextQuizQuestion = () => {
    if (!quizAnswers[currentQuizQuestion]) {
      toast.error('Please answer the question before proceeding.'); // Error if no answer is selected
      return;
    }

    if (currentQuizQuestion < quizData.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    }
  };

  // Navigate to the previous question
  const handlePrevQuizQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
    }
  };

  const currentQuestion = quizData[currentQuizQuestion];

  // Handle quiz submission and calculate the score
  const handleSubmitQuiz = () => {
    if (!quizAnswers[currentQuizQuestion]) {
      toast.error('Please answer the question before submitting.');
      return;
    }
  
    let correctAnswers = 0;
  
    quizData.forEach((question, index) => {
      const userAnswer = quizAnswers[index];
  
      if (question.type === 'multiple-choice') {
        // Compare user's answer with the correct string option
        if (userAnswer === question.options[parseInt(question.correct_answer) - 1]) {
          correctAnswers += 1;
        }
      } else if (question.type === 'fill-in-the-gap') {
        // Compare fill-in-the-gap answers directly
        if (userAnswer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()) {
          correctAnswers += 1;
        }
      }
    });
  
    const totalScore = (correctAnswers / quizData.length) * 100;
    setScore(totalScore);
    setQuizSubmitted(true);

    if (totalScore >= 45) {
        // Allow proceeding to the next lesson
        toast.success("You passed! You can now proceed to the next lesson.");
      } else {
        // Force restart from the beginning
        toast.error("You failed. Please restart the course from the beginning.");
        setCurrentQuizQuestion(0); // Reset quiz
        setQuizAnswers({});        // Clear answers
      }
  };

  const handleProceedToNextLesson = () => {
    if (activeLessonIndex < moduleDetails.length - 1) {
        setActiveLessonIndex(activeLessonIndex + 1);
        setIsQuizMode(false);
        setIsLessonMode(true);
    } else {
      // Show assignment when last lesson is reached
      setIsQuizMode(false);
      setIsLessonMode(false);
      setShowAssignment(true);
    }
  };

  if (reviewMode) {
    return <FlashCardReview 
    quizData={quizData} 
    handleProceedToNextLesson={handleProceedToNextLesson} />;
  }
  
  

  return (
    <div>
      <Toaster /> {/* To display toast notifications */}
      {!quizSubmitted ? (
        <div
          className="w-full md:w-[80%] mx-auto bg-white mt-4 lg:mt-9 py-9 px-6 text-black-500 
          border border-purple-300 rounded-3xl"
        >
          <div className="flex items-center justify-between">
            <div>(Timer)</div>
            <div>
              <h2 className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}>
                Quiz
              </h2>
            </div>
            <div></div>
          </div>

          <p className="mt-6 mb-4 lg:text-xl text-center font-semibold">
            {currentQuestion.question}
          </p>

          {currentQuestion.image && (
            <div className="mt-6 w-full h-[12rem] lg:h-[13rem] bg-gray-50 rounded-lg">
              <Image
                src={`${currentQuestion.image}`}
                alt="Quiz Image"
                width={500}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Multiple-choice options */}
          {currentQuestion.type === 'multiple-choice' && (
            <div className="mt-4 quiz-options space-y-2">
              {currentQuestion.options.map((option: string, index: number) => (
                <label key={index} className="quiz-option flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuizQuestion}`}
                    value={option}
                    checked={quizAnswers[currentQuizQuestion] === option}
                    onChange={() =>
                      handleOptionSelect(currentQuizQuestion, option)
                    }
                    className="mr-2 accent-purple-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* Fill-in-the-gap input */}
          {currentQuestion.type === 'fill-in-the-gap' && (
            <div className="quiz-fill-gap">
              <input
                type="text"
                placeholder="Your answer here"
                value={quizAnswers[currentQuizQuestion] || ''}
                onChange={(e) =>
                  handleOptionSelect(currentQuizQuestion, e.target.value)
                }
                className="mt-4 outline-none border-b-2 border-dashed 
                
                border-black-500 p-2 w-full placeholder:text-black-500"
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="quiz-navigation flex items-center justify-between mt-6">
            <button
              onClick={handlePrevQuizQuestion}
              disabled={currentQuizQuestion === 0}
              className="px-4 py-2 bg-transparent border border-black-500 rounded-lg disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div>
              <h2 className="">{currentQuizQuestion + 1} of {quizData.length}</h2>
            </div>

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
        </div>
      ) : (
        // Show result and quiz review options
        <div className="w-full md:w-[80%] mx-auto bg-white mt-4 lg:mt-9 py-9 px-6 text-black-500 
        border border-purple-300 rounded-3xl text-center">
          <h2
            className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}
          >
            Quiz Score
          </h2>

          {score >= 75 ? 
          <Image src={`/assets/dashboard/student-pass.png`} alt='score' width={150} height={150} className='mx-auto'/> 
          : <Image src={`/assets/dashboard/student-fail.webp`} alt='score' width={150} height={150} className='mx-auto'/>  }

          <h2
            className={`text-lg md:text-xl text-black-600`}
          >
            {score >= 75
              ? `Congratulations! You're doing great.`
              : `Unfortunately, you didn't pass`}
          </h2>

          <div className="">
              <h2 className="text-lg md:text-xl text-black-600 ">You just scored {Math.round(score)}%.</h2>

            <div className='mt-5 flex items-center justify-center gap-5'>
                {score >= 75 &&
               <button 
               onClick={() => setReviewMode(true)}
               className='mt-4 px-4 py-2 bg-transparent text-center border border-black-500 rounded-lg'>
                Review Quiz
               </button>
               }

                <button
                className="mt-4 px-4 py-2 bg-black-500 text-white border border-black-500 rounded-lg"
                onClick={() => {
                    if (score >= 75) {
                    // Proceed to next lesson or review quiz
                    // Add navigation logic here to go to the next lesson
                    handleProceedToNextLesson();
                    } else {
                    setCurrentQuizQuestion(0); // Reset to beginning if failed
                    setQuizSubmitted(false);
                    }
                }}
                >
                {score >= 75
                ? activeLessonIndex === moduleDetails.length - 1
                  ? "Proceed to Assignment" // Show this text if it's the last lesson
                  : "Proceed to Next Lesson"
                : "Restart Quiz"}
                </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;