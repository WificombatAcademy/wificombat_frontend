"use client"

import GeneralNavbar from '@/app/components/general/GeneralNavbar';
import { useCart } from '@/app/context/CartContext';
import { Breadcrumbs } from '@/app/utils/breadcrumb'
import React from 'react'
import toast from 'react-hot-toast';

type Props = {}

const Page = (props: Props) => {
  const { cart, removeItemFromCart } = useCart(); // Access cart and remove function

  // Remove item from cart handler
  const handleRemove = (id: string) => {
    removeItemFromCart(id);
    toast.success('Item removed from cart');
  };

  return (
    <div className="mx-auto relative container w-full max-w-[4000px]">
      <GeneralNavbar />
      <div className='relative mt-28 w-[93%] md:w-[90%] lg:w-[88%] mx-auto text-black-500'>
      <Breadcrumbs homeLabel='Home' lightMode={true} />
     
     <div className='w-[90%] mx-auto'>
      <h1 className='font-semibold text-3xl lg:text-4xl text-center'>Cart</h1>
      <p className='text-center mt-3 font-medium'>
        You can buy all the courses or module on the cart or buy one at a time. </p>
     </div>
      </div>
    </div>
  )
}

export default Page