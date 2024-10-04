import React from 'react'

type Props = {}

const interests = ["Coding", "Dancing", "Playing", "Sleeping", "Singing"]

const badges = [
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},
    {image:"", title:"Algorithm Ace", desc:"Mastered basic algorithm concepts."},

]

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


            <h2 className='mt-6 font-semibold'>Bio</h2>
            <h3 className='mt-2'>
            Lorem ipsum dolor sit amet consectetur. Tortor turpis nisl mi nec sed diam amet volutpat. 
            Magna senectus elementum aliquam eget vitae facilisis orci sem in. Ac diam sagittis in sit 
            urna accumsan malesuada. Justo pharetra suspendisse cursus ridiculus cursus morbi volutpat in.
            </h3>

            <h2 className='mt-6 font-semibold'>Interest</h2>
            <div className='mt-2 flex flex-wrap gap-2'>
                {interests.map((interest, index) => (
                   <div 
                   key={index}
                   className='w-fit mt-3 py-2 px-5 rounded-3xl bg-black-50 
                   flex items-center justify-center gap-2'>
                        <p>{interest}</p>
                    </div>
                ))}
            </div>

            <h2 className='mt-6 font-semibold'>Earned Badges</h2>
            <div className='mt-2 flex flex-col lg:flex-row overflow-x-scroll gap-4'>
                {badges.map((badge, index) => (
                    <div 
                    key={index} 
                    className='flex flex-col text-center items-center gap-3'>
                    <div className='w-16 h-16 bg-black-50 rounded-full'></div>
                        <h3 className='font-semibold'>{badge.title}</h3>
                        <p>{badge.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default ProfileInfo