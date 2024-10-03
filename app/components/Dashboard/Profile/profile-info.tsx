import React from 'react'

type Props = {}

const ProfileInfo = (props: Props) => {
  return (
    <div className='text-black-500'>
        <div className='mt-3'>
            <h2 className='font-semibold'>Johnson Annabel</h2>
            <h3 className='mt-2'>jonnyanabel42@gmail.com</h3>
            <div className='w-fit mt-3 py-2 px-5 rounded-3xl bg-purple-200 flex items-center gap-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                <p>Student</p>
            </div>

        </div>
    </div>
  )
}

export default ProfileInfo