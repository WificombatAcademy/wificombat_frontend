import React from 'react'
import HeadingDesign from '../general/HeaderDesign'

type Props = {}

const Modules = (props: Props) => {
  return (
    <section>
        <HeadingDesign heading={`Modules`} noUppercase={true} />

        <div className='mt-5'>
            <p className='w-[90%] md:w-[70%] mx-auto text-lg md:text-xl text-center'>
                You can buy the whole course and have access to all the modules 
                or you can decide to buy the modules one after the other.</p>
        </div>
    </section>
  )
}

export default Modules