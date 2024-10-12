import React from 'react'
import { FaCheckCircle, FaLaptopCode, FaRegFileAlt } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa6';
import { LuBaby } from 'react-icons/lu';
import { RiFoldersLine } from 'react-icons/ri';
import { BsCardChecklist } from 'react-icons/bs';
import { TbCertificate } from 'react-icons/tb';

type Props = {
  desc: string;
}

const overview = [
  {image: <FaRegUser size={23}/>, content: 'Begineer'},
  {image: <LuBaby size={23}/>, content: 'Age'},
  {image: <FaRegFileAlt size={23}/>, content: '11 Lessons'},
  {image: <RiFoldersLine size={23}/>, content: '1 Project'},
  {image: <BsCardChecklist size={23}/>, content: '11 Quizzes'},
  {image: <TbCertificate size={23}/>, content: '1 Certificate'},
  {image: <FaLaptopCode size={23}/>, content: 'Self Learning'},
]

const objectives = [
  "Interactive coding exercises and tutorials",
  "Gamified learning experiences",
  "Project-based learning with real-world applications",
  "Creative challenges with coding elements",
]

const CourseOverview = ({desc}: Props) => {
  return (
  <>

    <div className='py-8 md:py-12 lg:py-16 w-[93%] md:w-[90%] lg:w-[88%] mx-auto text-black-500'>
      <h2 className='font-semibold text-2xl md:text-3xl xl:text-4xl'>Course Overview</h2>

      <div
        className="mt-4 text-black-700 text-lg"
        dangerouslySetInnerHTML={{ __html: desc }} // Correct way to use dangerouslySetInnerHTML
      />

      <div className='mt-8 flex flex-wrap items-center gap-5'>
        {overview.map((overview, index) => (
          <div key={index} className='flex items-center gap-4'>

            <div className="relative w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] ">
              <div className="polygon w-full h-full flex items-center justify-center bg-black-50">
                  <div className="text-2xl font-bold">{overview.image}</div>
              </div>
            </div>

            <div>
              <p className='text-lg md:text-2xl 2xl:text-3xl'>{overview.content}</p>
            </div>
          </div>
        ))}
      </div>

    </div>



    {/* OBJECTIVES */}
    <div className='py-8 md:py-12 llg:py-16 text-black-500 bg-blue-50'>
        <div className='w-[93%] md:w-[90%] lg:w-[88%] mx-auto'>
          <h2 className='font-semibold text-2xl md:text-3xl'>
            Objectives
          </h2>

          <div className='mt-7 flex flex-col gap-4'>
            {objectives.map((objective, index) => (
              <div className='flex items-center gap-4'>
                <div>
                  <FaCheckCircle size={18} className='text-yellow-500' />
                </div>

                <div>
                  <p className='text-lg md:text-xl'>{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
    {/* OBJECTIVES */}

  </>
  )
}

export default CourseOverview