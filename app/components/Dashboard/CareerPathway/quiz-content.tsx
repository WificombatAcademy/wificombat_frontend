import { merriweather } from '@/app/fonts';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast for notifications
import FlashCardReview from './flash-card';
import { IoCheckmark } from 'react-icons/io5';

type Props = {
  quizData: any[];
  activeLessonIndex: number;
  setActiveLessonIndex: Dispatch<SetStateAction<number>>;
  moduleDetails: any[];
  setShowAssignment: Dispatch<SetStateAction<boolean>>;
  setIsQuizMode: Dispatch<SetStateAction<boolean>>;
  setIsLessonMode: Dispatch<SetStateAction<boolean>>;
  setIsAssignmentMode: Dispatch<SetStateAction<boolean>>;
};

const QuizContent = ({ quizData, activeLessonIndex, setActiveLessonIndex,
     moduleDetails, setShowAssignment, setIsQuizMode, setIsLessonMode, setIsAssignmentMode }: Props) => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  // Handle option selection
const handleOptionSelect = (questionIndex: number, selectedOptionIndex: number | string) => {
  setQuizAnswers((prevAnswers) => ({
    ...prevAnswers,
    [questionIndex]: selectedOptionIndex.toString(), // Convert selected option index to string
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
            // Use the correct index to compare with the selected option
            const userAnswerIndex = parseInt(quizAnswers[index]) + 1;
            const correctAnswerIndex = parseInt(question.correct_answer); // The correct answer index from the API

            // console.log("user answer:", userAnswer)
            // console.log("Right answer from data:", correctAnswerIndex)

            if (userAnswerIndex === correctAnswerIndex) {
                correctAnswers += 1;
            }
        } else if (question.type === 'fill-in-the-gap') {
            // Check if the user's answer matches the correct answer for fill-in-the-gap questions
            if (userAnswer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()) {
                correctAnswers += 1;
            }
        }
    });

    const totalScore = (correctAnswers / quizData.length) * 100;
    setScore(totalScore);
    setQuizSubmitted(true);

    if (totalScore >= 75) {
        toast.success("You passed! You can now proceed to the next lesson.");
    } else {
        toast.error("You failed. Please restart the course from the beginning.");
        setCurrentQuizQuestion(0); // Reset quiz
        setQuizAnswers({}); // Clear answers
    }
};


  const handleProceedToNextLesson = () => {
    if (activeLessonIndex < moduleDetails.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setIsQuizMode(false);
      setIsAssignmentMode(false);
      setIsLessonMode(true);
    } else {
      // Show assignment when last lesson is reached
      setIsQuizMode(false);
      setIsLessonMode(false);
      setIsAssignmentMode(false);
      setShowAssignment(true);
    }
  };

  if (reviewMode) {
    return <FlashCardReview 
    quizData={quizData} 
    handleProceedToNextLesson={handleProceedToNextLesson} />;
  }
  
  return (
    <div className='h-[110%] overflow-auto'>
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
            <div className="mt-4 quiz-options">
            {currentQuestion.options.some((option:any) => option.image) 
            && currentQuestion.options.some((option:any) => option.text) ? (
              // If there are both image and text options
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: { text: string; image: string }, index: number) => (
                  <div
                    key={index}
                    className={`relative border rounded-lg p-2 cursor-pointer ${
                     quizAnswers[currentQuizQuestion] === index.toString() ? 'border-blue-500' : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(currentQuizQuestion, index)}
                  >
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={`Option ${index}`}
                        width={100} // Adjust as necessary
                        height={100} // Adjust as necessary
                        className="w-full h-[140px] object-contain rounded-lg"
                      />
                    )}
                    {quizAnswers[currentQuizQuestion] === index.toString() && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full">
                        <IoCheckmark />
                      </div>
                    )}
                    <p className="mt-2 text-center">{option.text}</p>
                  </div>
                ))}
              </div>
            ) : currentQuestion.options.some((option:any) => option.image) ? (
              // If there are only image options
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: { image: string }, index: number) => (
                  <div
                    key={index}
                    className={`relative border rounded-lg p-2 cursor-pointer ${
                      quizAnswers[currentQuizQuestion] === index.toString() ? 'border-blue-500' : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(currentQuizQuestion, index)}
                  >
                    {option.image && (
                      <Image
                        src={option.image}
                        alt={`Option ${index}`}
                        width={100} // Adjust as necessary
                        height={100} // Adjust as necessary
                        className="w-full h-[140px] object-contain rounded-lg"
                      />
                    )}
                    {quizAnswers[currentQuizQuestion] === index.toString() && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full">
                        <IoCheckmark />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // If there are only text options
              <div className="space-y-2">
                {currentQuestion.options.map((option: { text: string }, index: number) => (
                  <label key={index} className="quiz-option flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentQuizQuestion}`}
                      value={option.text}
                      checked={quizAnswers[currentQuizQuestion] === index.toString()}
                      onChange={() =>
                        handleOptionSelect(currentQuizQuestion, index)
                      }
                      className="mr-2 accent-purple-500"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            )}
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
