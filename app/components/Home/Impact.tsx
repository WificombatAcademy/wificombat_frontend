"use client"
import { useEffect, useRef, useState } from 'react';

const serviceTab = [
  { id: 1, currentValue: '20,000', maxValue: 400, title: 'Students' },
  { id: 2, currentValue: '300', maxValue: 400, title: 'Programs' },
  { id: 3, currentValue: '500', maxValue: 400, title: 'Schools' },
  { id: 4, currentValue: '50,000', maxValue: 400, title: 'Projects' },
];
const Impact = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-white px-6 pt-16 text-center md:px-14'>
      <h3 className='text-3xl md:text-4xl font-semibold'>Wificombat Academy Impact</h3>
      <p className='mt-3 max-w-2xl md:text-xl'>
        We have been in operation for over 10 years and we have trained
        students, educators in different schools, done various projects and
        programs.
      </p>

      <div className='my-16 h-full w-full md:w-[90%] lg:w-[88%] mx-auto'>
        <div className='flex flex-col justify-center gap-6 max-sm:flex-row max-sm:flex-wrap lg:flex-row lg:justify-around'>
          {serviceTab.map((x) => {
            return (
              <CircularProgressBar
                startDegree={0}
                endDegree={66}
                gradientColors={[
                  '#f1b30b',
                  '#c71fb8',
                  // '#00ff00',
                  '#3f5bcb',
                  '#318da2',
                ]}
                size={25}
                width={500}
                strokeWidth={1.6}
                className='mx-auto text-red-500 max-sm:w-28'
              >
                <div
                  style={{ fontSize: 9, marginTop: -5 }}
                  className='flex flex-col gap-px'
                >
                  <strong className=''>{x.currentValue}+</strong>
                  <span className='text-lg'>{x.title}</span>
                </div>
              </CircularProgressBar>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Impact;

interface CircularProgressBarProps {
  startDegree: number;
  endDegree: number;
  gradientColors: string[];
  children: React.ReactNode;
  size: number;
  width: number;
  strokeWidth: number;
  className?: string;
}

const CircularProgressBar = ({
  startDegree,
  endDegree,
  gradientColors,
  children,
  size,
  width,
  strokeWidth,
  className,
}: CircularProgressBarProps) => {
  const [progress, setProgress] = useState(startDegree);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgress(endDegree); // set progress to endDegree when element is in view
          } else {
            setProgress(startDegree); // reset progress to startDegree when element is not in view
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, startDegree, endDegree]);

  const gradientId = 'gradient';
  const gradientStops = gradientColors.map((color, index) => (
    <stop
      key={index}
      offset={`${(index / (gradientColors.length - 1)) * 100}%`}
      stopColor={color}
    />
  ));

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className={`circular-progress-bar ${className}`}
      fill='transparent'
      width={width}
    >
      <defs>
        <linearGradient id={gradientId} gradientTransform='rotate(90)'>
          {gradientStops}
        </linearGradient>
      </defs>
      <path
        stroke='#f2f2f2'
        d={`M${size / 2} ${size / 36}
          a ${size / 2.4} ${size / 2.4} 0 0 1 0 ${size / 1.2}
          a ${size / 2.4} ${size / 2.4} 0 0 1 0 -${size / 1.2}`}
        strokeWidth={strokeWidth}
      />
      <path
        className='circle'
        stroke={`url(#${gradientId})`}
        d={`M${size / 2} ${size / 36}
          a ${size / 2.4} ${size / 2.4} 0 0 1 0 ${size / 1.2}
          a ${size / 2.4} ${size / 2.4} 0 0 1 0 -${size / 1.2}`}
        style={{
          strokeDasharray: `${progress * 0.66}, 100`,
          transition: 'stroke-dasharray 2s ease-in-out',
        }}
        strokeWidth={strokeWidth}
      />
      <foreignObject x='0' y='0' width={size} height={size}>
        <div
          className='flex h-full items-center justify-center text-black'
          style={{ transform: 'scale(0.2)' }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};
