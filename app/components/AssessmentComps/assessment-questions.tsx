import Image from "next/image";
import { useState } from "react";

type Props ={
    question: any;
    index: number;
    onChange: (id:number, option:string) => void;
    selectedAnswer: string;
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

const Question = ({ question, index, onChange, selectedAnswer }: Props) => {
  const { question: questionText, options } = question;
  const colorIndex = index % colorSchemes.length;
  const { primary, secondary } = colorSchemes[colorIndex];

  return (
    <div className={`form-box py-10 px-5 rounded-3xl ${secondary}`}>
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
              onChange={() => onChange(question.id, optionKey)}
              className="mr-2 accent-blue-500 border-none rounded-full"
            />
            <div className="font-medium flex items-center gap-1">
              <Image
                src={`/images/options/${optionKey}.png`}
                alt={`Option ${optionKey}`}
                width={32}
                height={32}
                className="object-contain"
              />
              {optionKey}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
