import React from 'react'
import { IoCartOutline } from 'react-icons/io5'

type Props = {}

const Cart = (props: Props) => {
  return (
    <div className="absolute top-4 lg:top-7 right-5 lg:right-20 
    p-3  bg-white rounded-lg">
        <IoCartOutline size={24} className="text-black-500" />
    </div>
  )
}

export default Cart