"use client"

import { PathwayHero } from '@/app/components/CodingPathwayComps/hero'
import { TodayComp } from '@/app/components/CodingPathwayComps/today-comp'
import CourseOverview from '@/app/components/CourseComps/courseOverview'
import Modules from '@/app/components/CourseComps/modules'
import Footer from '@/app/components/general/Footer'
import GeneralNavbar from '@/app/components/general/GeneralNavbar'
import { FAQ } from '@/app/components/Home/faq'
import { useCart } from '@/app/context/CartContext'
import Loader from '@/app/utils/loader'
import Modal, { FullScreenModal } from '@/app/utils/modal'
import { API } from '@/app/utils/types-and-links'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

type Props = {}

const Page = ({ params }: any) => {
  const { removeItemFromCart, cart, isModalOpen, setIsModalOpen } = useCart();  
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const { courseId } = params;
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Fetch the course details 
  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/course/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false); // Done loading both requests
    }
  };


  if (loading) {
    return <Loader noDesign notCenter/>; // Show loader while data is being fetched
  }

  if (!course) {
    return <Loader isError home noCourses noDesign notCenter/>; // Show loader while data is being fetched
  }

    const totalModules = course.modules.length;
    const pricePerModule = course.price / totalModules;

    const handleClearModules = () => {
      // Logic to clear modules (similar to the existing handleClearModules in CareerCard)
      cart.forEach((cartItem: any) => {
          if (cartItem.course_id === courseId && cartItem.type === 'module') {
              removeItemFromCart(cartItem.id);
          }
      });
      setIsModalOpen(false); // Close the modal after clearing
  };


const handleBuyNow = async (item: any, purchaseType: string = "full_course") => {
  const userId = getCookie("user_id"); // Get the user ID from cookies

  if (!userId) {
    // Redirect to registration if user_id is not found
    setCookie('redirect_from', '/students/cart', { path: '/' });
    window.location.href = "/registration"; // Update the redirect path as needed
    return;
  }
  setIsProcessModalOpen(true); // Show processing modal, if applicable
  setModalMessage('Processing payment...');

    try {
    // Retrieve cart items from context if needed
    const endpoint = 'https://wificombatacademy.com/api/v2/order/';

    // Define payload structure
    let payload;

    if (purchaseType === "full_course") {
      // Full course purchase
      payload = {
        user_id: userId,
        course: {
          course_id: item.course_id,
          course_name: item.subject,
        },
        course_price: item.price,
        modules_total_price: item.modules.reduce((total:any, mod:any) => total + pricePerModule, 0), // Sum of module prices
        final_price: item.price,
        payment_method: "card", // Can be dynamic based on user selection
        purchase_type: "full_course",
        status: "pending",
        modules: item.modules.map((mod: any) => ({
          module_id: mod.id,
          module_name: mod.title,
          price: pricePerModule,
        })),
      };
    } else if (purchaseType === "single_module") {
      // Single module purchase
      payload = {
        user_id: userId,
        course: {
          course_id: course.course_id,
          course_name: course.subject,
        },
        course_price: 0, // No course price for single module purchase
        modules_total_price: pricePerModule,
        final_price: pricePerModule,
        payment_method: "card", // Can be dynamic
        purchase_type: "single_module",
        status: "pending",
        modules: [
          {
            module_id: item.id,
            module_name: item.title,
            price: pricePerModule,
          },
        ],
      };
    }

    // Send API request
    const response = await axios.post(endpoint, payload);
    const { message, payment_link } = response.data;
    setPaymentLink(payment_link);
    toast.success(message);

    // Redirect to payment link
    // window.location.href = payment_link;
    if (response.status === 200) {
      console.log("Order link Purchase successful!");
    } else {
      console.error("Error in purchase process:", response.data);
      setIsProcessModalOpen(false); // remove processing modal
    }
  } catch (error) {
    console.error("Error in handleBuyNow:", error);
    setIsProcessModalOpen(false); // remove processing modal
  }
};


    return (
      <div className="mx-auto  container w-full max-w-[4000px]">
          <GeneralNavbar />
          <Toaster />

          <PathwayHero 
          handleBuyNow={() => handleBuyNow(course, "full_course")}
          coursePage={true}
          bgColor='bg-blue-500'
          desc='Turn your passion for technology into a thriving career 
          in software engineering or DevOps. Begin your path with us'
          header={`${course.subject}`}
          level={`${course.level}`}
          image={`${course.image ? `https://wificombatacademy.com/${course.image}` : `` }`}
          price={course.price}
          course={course}
          />

          <CourseOverview 
          desc={course.note ?? ''}
          />

          <Modules 
          handleBuyNow={handleBuyNow}
          modules={course.modules} 
          pricePerModule={pricePerModule}
          courseLevel={course.level}
          courseId={course.course_id}
          totalModules={totalModules}  
          />

          <TodayComp 
          desc="Start your coding journey today and unlock a world of endless possibilities. Learn from experienced instructors and build amazing projects." 
          header="Start Coding Today!" 
          linkto="/schools/pricing-plan" />

          <FAQ noSpace/>

          <Footer />

          <FullScreenModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onClearModules={handleClearModules}
            courseName={course.subject}
          />


        {isProcessModalOpen && (
          <Modal isOpen={isProcessModalOpen} onClose={() => setIsProcessModalOpen(false)}>
             <Image 
            src={`/processing_payment.gif`}
            alt='processing payment'
            width={1600}
            height={1200}
            className='w-full'
            />
            <h2 className='w-[95%] mx-auto text-lg font-medium text-center'>{modalMessage}</h2>
          </Modal>
        )}
      </div>
    )
   }
export default Page