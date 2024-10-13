"use client"

import GeneralNavbar from '@/app/components/general/GeneralNavbar';
import { useCart } from '@/app/context/CartContext';
import { Breadcrumbs } from '@/app/utils/breadcrumb'
import BreadcrumbsWrapper from '@/app/utils/breadcrumbsWrapper';
import { formatPrice } from '@/app/utils/types-and-links';
import Image from 'next/image';
import Link from 'next/link';
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
    <BreadcrumbsWrapper>

    <div className="mx-auto relative container w-full max-w-[4000px]">
      <GeneralNavbar />

      <div className='relative mt-8 lg:mt-20 w-[93%] md:w-[90%] lg:w-[88%] mx-auto text-black-500'>
        <Breadcrumbs homeLabel='Home' lightMode={true} />
      
        <div className='pt-7 md:pt-4 w-[90%] mx-auto'>
          <h1 className='mt-7 lg:mt-0 font-semibold text-3xl lg:text-4xl text-center'>Cart</h1>
          <p className='text-center mt-3 font-medium'>
            You can buy all the courses or module on the cart or buy one at a time. </p>
        </div>

      {cart.length === 0 ? (
        <div className='mt-5 lg:h-[50vh] w-[90%] mx-auto flex items-center justify-center flex-col gap-4 text-center'>
          <div className='mx-auto flex items-center justify-center'>
            <Image 
                src={'/empty-cart.png'} 
                alt={`empty-cart`} 
                width={500} 
                height={500} 
                className="rounded-lg object-cover w-[300px] 2xl:w-[450px]" 
              />
          </div>
          <p className="text-lg">Your cart is empty.</p>
          <Link href="/students/curriculum"
          className='bg-black-500 text-white px-8 py-3 rounded-xl
          transition-colors duration-300 hover:opacity-90'>Go back to courses</Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-8">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col lg:flex-row items-start lg:items-center
             bg-transparent border border-black-100 rounded-3xl p-6 gap-6">
              {/* Item Image */}
              <Image 
                src={`https:wificombatacademy.com/${(item.details.image || item.details.cimage )?? '/placeholder.jpg'}`} 
                alt={item.name ?? ''} 
                width={150} 
                height={150} 
                className="rounded-lg object-cover w-[80px] h-[80px] lg:w-[150px] lg:h-[150px]" 
              />

              {/* Item Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {(item.details.subject || item.details.title || item.details.name) ?? ''}</h2>
                <p className="text-gray-600">Level: {item.level}</p>
                {item.type === 'course' ? (
                  <p className="text-gray-600">
                    Modules: {item.details.modules.length} | Lessons: {item.details.lessons}
                  </p>
                ) : (
                  <p className="text-gray-600">Lessons: {item.details.lessons}</p>
                )}
                <p className="text-lg font-bold mt-2">Price: {formatPrice(item.price)}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="border border-black-500 text-black-500 px-4 py-2 rounded-lg"
                >
                  Remove from Cart
                </button>
                
                <Link href="/checkout" className="bg-black-500 text-white px-4 py-2 
                rounded-lg hover:bg-black-600 text-center">
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
    </div>

    </BreadcrumbsWrapper>
  )
}

export default Page