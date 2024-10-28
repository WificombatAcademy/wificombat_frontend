"use client"

import GeneralNavbar from '@/app/components/general/GeneralNavbar';
import { useCart } from '@/app/context/CartContext';
import { Breadcrumbs } from '@/app/utils/breadcrumb'
import BreadcrumbsWrapper from '@/app/utils/breadcrumbsWrapper';
import Modal from '@/app/utils/modal';
import { formatPrice } from '@/app/utils/types-and-links';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { HiMiniTag } from "react-icons/hi2";

type Props = {}

const Page = (props: Props) => {
  const { cart, removeItemFromCart,  } = useCart(); // Access cart and remove function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  // Remove item from cart handler
  const handleRemove = (id: string) => {
    removeItemFromCart(id);
    toast.success('Item removed from cart');
  };


  // Helper function to ensure the image URL starts with the required base URL
  const formatImageUrl = (imagePath: string) => {
    const baseUrl = "https://wificombatacademy.com/";
    // Check if the image path already starts with the base URL
    if (imagePath.startsWith(baseUrl)) {
      return imagePath;
    }
    return `${baseUrl}${imagePath}`;
  };

  const handleBuy = async (item?: any) => {
    const userId = getCookie("user_id"); // Get the user ID from cookies

    if (!userId) {
        // Redirect to registration if user_id is not found
        setCookie('redirect_from', '/students/cart', { path: '/' });
        window.location.href = "/registration"; // Update the redirect path as needed
        return;
    }

    setIsModalOpen(true);
    setModalMessage('Processing payment...');

    // Prepare the payload for the order
    let modules = item?.type === 'module' ? [item] : cart.filter(cartItem => cartItem.type === 'module');
    let course = item?.type === 'course' ? item : cart.find(cartItem => cartItem.type === 'course');
    let courseId = course?.id;
    let courseName = course?.subject; // or any other field that contains the course name
    let coursePrice = item?.type === 'module' ? 0 : parseFloat(course?.price || '0'); // Set to 0 if it's a module purchase
    let modulesTotalPrice = modules.reduce((total, module) => {
      const price = parseFloat(module.price.replace(/[^\d.]/g, '')) || 0; // Remove any non-numeric characters
      return total + price;
  }, 0);
  let finalPrice = item?.type === 'course' 
  ? coursePrice // Use only the course price if buying a course
  : coursePrice + modulesTotalPrice; 

    const payload = {
        user_id: userId,
        course: {
            course_id: courseId,
            course_name: courseName,
        },
        course_price: coursePrice,
        modules_total_price: modulesTotalPrice,
        final_price: finalPrice,
        payment_method: "card", // Or however you want to handle payment method
        purchase_type: item ? (item.type === 'module' ? "single_module" : "full_course") : 
        (modules.length <= 0 ? "full_course" : "single_module"),
        status: "pending",
        modules: modules.map(module => ({
            module_id: module.id,
            module_name: module.name, // or whatever field contains the module name
            price: (module.price),
        })),
    };

    try {
        const response = await axios.post("https://wificombatacademy.com/api/v2/order/", payload, {});
        const { message, payment_link } = response.data;
        setModalMessage(message);
        setPaymentLink(payment_link);
        toast.success(message);

        // Redirect to payment link
        window.location.href = payment_link;
    } catch (error) {
        console.error("Error placing order:", error);
        toast.error('Failed to place order. Please try again later.');
    } finally {
        setIsModalOpen(false);
    }
};


  return (
    <BreadcrumbsWrapper>
    <Toaster />

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
                    src={'/empty-cart.gif'} 
                    alt={`empty-cart`} 
                    width={500} 
                    height={500} 
                    className="rounded-lg object-cover w-[300px] 2xl:w-[450px]" 
                  />
              </div>
              <p className="text-lg">Your cart is empty.</p>
              <Link href="/students/curriculum"
              className='bg-black-500 text-white px-8 py-3 rounded-xl
              transition-colors duration-300 hover:opacity-90'>Go back to Curriculum</Link>
            </div>
               ) : (
            <div className={`mt-5 grid grid-cols-1 gap-8 ${cart.length > 1 ? 'h-[70vh]' : ''} 
              overflow-y-scroll`}>
              {cart.map((item) => (
                <div key={item.id} className="flex lg:flex-row items-start
                bg-transparent border border-black-100 rounded-3xl max-md:px-4 p-6 max-md:gap-2 gap-6">

                  {/* Item Image */}
                  <Image 
                    src={formatImageUrl(item.details.image || item.details.cimage || '/placeholder.jpg')} 
                    alt={item.name ?? ''} 
                    width={150} 
                    height={150} 
                    className="rounded-lg object-cover 
                    w-[40px] h-[40px] md:w-[40px] md:h-[40px] 
                    lg:w-[150px] lg:h-[150px]" 
                  />
                  {/* Item Details */}

                  <div className="lg:mt-4 flex-1">
                    <h2 className="md:text-xl font-semibold">
                      {(item.details.subject || item.details.title || item.details.name) ?? ''}</h2>

                    <p className="mt-1 text-black-800 max-lg:text-xs">Level: {item.level}</p>

                    {item.type === 'course' ? (
                      <div className='mt-1 max-lg:text-xs'>
                        <p className="text-gray-600">
                          {Array.isArray(item.details.modules) && item.details.modules.length > 0 
                            ? item.details.modules.length 
                            : 0} {""}
                          Modules &nbsp;
                          {Array.isArray(item.details.lessons) && item.details.lessons.length > 0 
                            ? item.details.lessons.length 
                            : 0} Lessons  &nbsp;
                        </p> 
                      </div>
                    ) : (
                      <p className="mt-1 text-gray-600 max-lg:text-xs">
                        {(item.details.num_lessons !== "" && item.details.num_lessons !== null) 
                          ? item.details.num_lessons 
                          : 0} Lessons
                      </p>
                    )}

                    <div className="text-black-600 flex items-center gap-1 font-semibold max-lg:text-sm capitalize">
                      <div className={item.type === 'course' ? `text-blue-500` : `text-purple-800`}>
                      <HiMiniTag />
                      </div>
                      {item.type}
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className='h-full flex flex-col gap-2 max-lg:items-end lg:justify-between'>

                    <p className="text-lg lg:text-2xl xl:text-3xl font-bold lg:my-4">{formatPrice(item.price)}</p>

                    <div className="flex flex-col gap-2 lg:flex-row lg:items-center max-md:text-xs">
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="border border-black-500 text-black-500 px-4 py-2 max-lg:py-3 rounded-lg"
                      >
                        Remove from Cart
                      </button>
                      
                      <button
                      onClick={() => handleBuy(item)}
                      className="bg-black-500 text-white px-4 py-2 max-lg:py-3 
                      rounded-lg hover:bg-black-600 text-center">
                        Buy Now
                      </button>
                    </div>
                  </div>

                  </div>
              ))}

            {cart.length > 1 && <div className='py-7 w-[90%] mx-auto flex items-center justify-center'>
            <button 
              onClick={handleBuy} 
              className={`bg-black-500 text-white px-8 md:px-16 py-2 max-lg:py-3 
              rounded-lg hover:bg-black-600 text-center`}
            >
              Buy All
            </button>
          </div>}
            </div>

            
          )}
      </div>
    </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Image 
        src={`/processing_payment.gif`}
        alt='processing payment'
        width={1600}
        height={1200}
        className='w-full'
        />
        <h2>{modalMessage}</h2>
        {/* Optionally show a loading spinner here */}
      </Modal>

    </BreadcrumbsWrapper>
  )
}

export default Page