import { PathwayHero } from '@/app/components/CodingPathwayComps/hero'
import GeneralNavbar from '@/app/components/general/GeneralNavbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="mx-auto relative container w-full max-w-[4000px]">
        <GeneralNavbar />
        <PathwayHero 
        coursePage={true}
        bgColor='bg-blue-500'
        desc='Turn your passion for technology into a thriving career 
        in software engineering or DevOps. Begin your path with us'
        header=''
        />
    </div>

  )
}

export default page