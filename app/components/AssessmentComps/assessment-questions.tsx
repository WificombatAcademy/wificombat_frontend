import Image from "next/image";
import { useState } from "react";

type Props ={
    question: any;
    index: number;
    onChange: (questionId: number, answer: string, pathway: string) => void;
    selectedAnswer: any;
    onNext: () => void; // New prop for "Next" button
    onPrev: () => void; // New prop for "Previous" button
    isLastStep: boolean; // Indicates if it's the last question
    stepNumber: number; 
    totalQuestions:number;
}

const colorSchemes = [
  { primary: "bg-blue-500", secondary: "bg-blue-50" },
  { primary: "bg-purple-500", secondary: "bg-purple-50" },
  { primary: "bg-yellow-500", secondary: "bg-yellow-50" },
  { primary: "bg-green-500", secondary: "bg-green-50" },
  { primary: "bg-pink-500", secondary: "bg-pink-50" },
  { primary: "bg-red-500", secondary: "bg-red-50" },
  { primary: "bg-teal-500", secondary: "bg-teal-50" },
  { primary: "bg-indigo-500", secondary: "bg-indigo-50" }
];

export const Question = ({ question,
  index,
  onChange,
  selectedAnswer,
  onNext,
  onPrev,
  isLastStep,
  stepNumber,
  totalQuestions }: Props) => {
  const { question: questionText, options } = question;
  const colorIndex = index % colorSchemes.length;
  const { primary, secondary } = colorSchemes[colorIndex];

  const getImageSrc = (optionKey: string) => {
    switch (optionKey) {
      case "yes":
        return "/assets/assessment/thumbs-up.svg";
      case "no":
        return "/assets/assessment/thumbs-down.svg";
      case "maybe":
        return "/assets/assessment/thinking-face.svg";
      default:
        return ""; // fallback path if needed
    }
  };

  return (
    <div className={`z-[5] relative h-fit form-box max-md:mt-32 md:mt-6 md:w-[70%] lg:w-[50%] 
      mx-auto py-10 px-5 rounded-3xl`}>
      <h2 className={`${primary} text-white font-bold text-center py-4 rounded-xl`}>
        {questionText}
      </h2>
      <div className="mt-5 w-full p-3 space-y-4">
        {Object.keys(options).map((optionKey) => (
          <div
            key={optionKey}
            className={`w-full py-4 px-5 ${secondary} flex items-center gap-2 rounded-lg`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={optionKey}
              checked={selectedAnswer === optionKey}
              // onChange={() => onChange(question.id, optionKey, question.pathway)}
              onChange={() => {
                onChange(question.id, optionKey, question.pathway);
                console.log(`Answered: ${question.id} with ${optionKey}`); // Log the answered question
              }}
              className="mr-2 accent-blue-500 border-none rounded-full"
            />
            <div className="font-medium flex items-center gap-1">
              <Image
                src={getImageSrc(optionKey)}
                alt={`${optionKey}`}
                width={32}
                height={32}
                className="object-contain"
              />
              {optionKey}
            </div>
          </div>
        ))}
      </div>


      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button
            onClick={onPrev}
            className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
            disabled:text-gray-400 disabled:cursor-not-allowed"
            // disabled={index <= 0}
        >
            Previous
        </button>
         {/* Display step number */}
          <div className="flex items-center">
            Step {stepNumber} of {totalQuestions} {/* Replace `totalQuestions` with the total number of questions */}
          </div>
        <button
            onClick={onNext}
            className="py-2 px-4 border border-[#D0D5DD] shadow-md rounded-lg
            disabled:text-gray-400 disabled:cursor-not-allowed"
        >
            {isLastStep ? "Submit" : "Next"}
        </button>
      </div>

    </div>
  );
};
