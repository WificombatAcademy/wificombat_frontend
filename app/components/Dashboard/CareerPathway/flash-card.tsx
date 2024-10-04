import React, { useState } from 'react';
import { merriweather } from '@/app/fonts';
import Image from 'next/image';

type FlashCardProps = {
  quizData: any[];
  handleProceedToNextLesson: () => void;
};

const FlashCardReview = ({ quizData, handleProceedToNextLesson }: FlashCardProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCard < quizData.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false); // Reset flip state for the next card
    }
  };

  const currentQuestion = quizData[currentCard];

  return (
    <div className="w-full md:w-[80%] mx-auto bg-transparent mt-4 lg:mt-9 py-9 px-6 text-black-500 rounded-3xl">
      <div className="flashcard-container text-center relative rounded-3xl">
        {/* Flashcard */}
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''} 
          w-full md:w-[60%] mx-auto bg-white border border-purple-500 rounded-3xl `}
          style={{ transition: 'transform 0.8s', transformStyle: 'preserve-3d' }}
        >
          {/* Front side */}
          <div className="flashcard-front p-4 bg-white
          absolute inset-0 flex items-center justify-center rounded-3xl" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}>
              {currentQuestion.question}
            </h2>
          </div>

          {/* Back side (answer) */}
          <div
            className="flashcard-back p-4 bg-white absolute 
            inset-0 flex items-center justify-center rounded-3xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <h2 className={`text-lg lg:text-2xl font-semibold ${merriweather.className}`}>
              Answer: {currentQuestion.type === 'multiple-choice'
                ? currentQuestion.options[parseInt(currentQuestion.correct_answer) - 1]
                : currentQuestion.correct_answer}
            </h2>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="z-[1] relative top-[-3rem] quiz-navigation flex items-center justify-center gap-7 mt-6">

        {/* Flip button */}
           {!(currentCard === quizData.length - 1 && isFlipped) &&<> 
           <button
            onClick={handleFlipCard}
            className="px-12 py-2 font-medium bg-white text-black-500 border border-black-500 rounded-lg"
            >
            Flip
            </button>

          <button
            onClick={handleNextCard}
            disabled={!isFlipped || currentCard === quizData.length - 1}
            className="px-12 py-2 font-medium border bg-black-500 text-white rounded-lg 
            disabled:bg-gray-200 disabled:border-none disabled:cursor-not-allowed"
          >
            Next
          </button>
          </>
          }

          {/* Proceed to next lesson button */}
          {currentCard === quizData.length - 1 && isFlipped && (
            <button
              onClick={handleProceedToNextLesson}
              className="relative top-[-1.3rem] mt-6 px-4 py-2 font-medium bg-black-500 
              text-white border border-black-500 rounded-lg"
            >
              Proceed to Next Lesson
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .flashcard {
          position: relative;
          width: 100%;
          height: 50vh;
          cursor: pointer;
        }

        .flipped {
          transform: rotateY(180deg);
        }

        .flashcard-front,
        .flashcard-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlashCardReview;