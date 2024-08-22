'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
    children: ReactNode
}

interface ProgressCircleProps {
  progress: number; // Progress as a percentage (0-100)
  value: number;
  title: string;
  size?: number;    // Diameter of the circle
  strokeWidth?: number; // Width of the progress bar
  color?: string;   // Color of the progress bar
}

const Providers = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {children}
      {isClient && (
        <ProgressBar
          height="4px"
          color="#0784C3"
          options={{ showSpinner: false }}
          shallowRouting
        />
      )}
    </>
  );
};

export default Providers;



export const ProgressCircle = ({ progress, value, title, size = 100,strokeWidth = 10,color = '#131314',}: ProgressCircleProps) => {

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    className="relative"
  >
    <circle
      className="text-gray-300"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="transparent"
      r={radius}
      cx={size / 2}
      cy={size / 2}
    />
    <circle
      className="transition-all duration-300"
      strokeWidth={strokeWidth}
      stroke={color}
      fill="transparent"
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      r={radius}
      cx={size / 2}
      cy={size / 2}
      style={{
        strokeLinecap: 'round',
        transform: `rotate(-90deg)`,
        transformOrigin: '50% 50%',
      }}
    />
   <text
    x="50%"
    y="45%"
    dominantBaseline="middle"
    textAnchor="middle"
    className="text-lg fill-current text-black-500"
  >
    {`${title}`}
  </text>
  <text
    x="50%"
    y="58%"
    dominantBaseline="middle"
    textAnchor="middle"
    className="mt-4 text-xl font-bold fill-current text-black-500"
  >
    {`${value}`}
  </text>
  </svg>
  )
}