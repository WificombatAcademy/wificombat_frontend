import { merriweather } from '@/app/fonts'
import React from 'react'

type Props = {}

const AssignmentContent = (props: Props) => {
  return (
    <div
    className="w-full md:w-[80%] mx-auto h-[75vh] bg-white 
    mt-4 lg:mt-9 py-9 px-6 text-black-500 rounded-3xl">
        <h2 className={`${merriweather.className} text-xl lg:text-2xl font-semibold text-center`}>Assignment</h2>
    </div>
  )
}

export default AssignmentContent