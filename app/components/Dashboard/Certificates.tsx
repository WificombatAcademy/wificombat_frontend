import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'
import Image from "next/image"

type Props = {}


const Card = () => {
    return (
        <div className='w-full h-[160px] lg:h-[200px] 2xl:h-[300px] relative bg-primary-gray rounded-2xl'>
            <div className='absolute right-2 bottom-2 bg-black-50 py-3 px-4 rounded-lg flex items-center justify-center'>
                <MdOutlineFileDownload
                size={25} 
                className='text-black-600' />
            </div>
        </div>
    )
}

const Certificates = (props: Props) => {
  return (
    <div className='w-[95%] mx-auto'>
        <h2 className='mt-4 text-lg'>Beginner: Level 1</h2>

        <div className='mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* <Card3
             /> */}
                 <Image
                            src="/certificate.png"
                            alt={`logo`}
                            width={500}
                            height={500}
                            className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
                          <Image
                            src="/certificate.png"
                            alt={`logo`}
                            width={500}
                            height={500}
                            className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
                          <Image
                            src="/certificate.png"
                            alt={`logo`}
                            width={500}
                            height={500}
                            className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
                          <Image
                            src="/certificate.png"
                            alt={`logo`}
                            width={500}
                            height={500}
                            className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                        />
            {/* <Card />
            <Card />
            <Card /> */}
        </div>

        <h2 className='mt-4 text-lg'>Beginner: Level 2</h2>

        <div className='mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
              <Image
                            src="/certificate.png"
                            alt={`logo`}
                            width={500}
                            height={500}
                            className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                        />  <Image
                        src="/certificate.png"
                        alt={`logo`}
                        width={500}
                        height={500}
                        className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                    />  <Image
                    src="/certificate.png"
                    alt={`logo`}
                    width={500}
                            height={500}
                    className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
                />  <Image
                src="/certificate.png"
                alt={`logo`}
                width={500}
                height={500}
                className="w-full my-auto lg:w-[93px] object-contain text-neutral-400"
            />
        </div>
    </div>
  )
}

export default Certificates