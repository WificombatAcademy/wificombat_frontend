"use client"

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

type Props = {
    pathway: string;
    desc: string;
    price?: string;
    linkTo?: string;
    subject?: string;
    item?: any;
    moduleSubject?: string;
    level?: string;
    bgColor?: string;
    textWhite?: boolean;
    pathways?: string[];
    image?: string;
    imageNoFlex?: boolean;
    moduleImage?: string;
    pathwayImage?: string;
    curriculum?: boolean;
    type?: 'course' | 'module';
    viewCourse?: boolean;
    handleBuyNow?: (item: any, purchaseType?: string) => void;
    className?: string;
}

const CareerCard = ({
    bgColor, desc, linkTo, level, subject, item, type, viewCourse, handleBuyNow,
    textWhite, pathways, image, pathwayImage, curriculum, price, moduleImage, moduleSubject, imageNoFlex
  }: Props) => {
  
    const { addItemToCart, removeItemFromCart, isInCart, cart, setIsModalOpen } = useCart();
  
    const handleAddToCart = () => {
      if (item) {
        const { id, course_id, title, subject, level } = item;
        if (id) {
          const isCourseInCart = isInCart(course_id);
          const isModuleInCart = isInCart(id);
          const modulesInCart = cart.filter(
            (cartItem: any) => cartItem.course_id === course_id && cartItem.type === 'module'
          ).length;
          const totalModules = item.totalModules || 0;
  
          if (isCourseInCart) {
            toast.error(`The main course is already in your cart. You cannot add this module.`);
            return;
          }
          
          if (!isModuleInCart) {
            if (modulesInCart + 1 === totalModules) {
              setIsModalOpen(true);
              toast.error('You are trying to add all modules. Please add the full course instead.');
              return;
            }
            toast.success(`${title || subject} has been added to your cart!`);
            addItemToCart({
              id: id,
              course_id: course_id,
              name: title || subject,
              subject: subject,
              level: level,
              type: 'module',
              price: item.price || price,
              details: item,
              quantity: 1
            });
          }
        } else {
          toast.error("Item ID is undefined.");
        }
      } else {
        toast.error("Item is undefined.");
      }
    };
  
    const handleRemoveFromCart = () => {
      if (item && item.id) {
        removeItemFromCart(item.id);
      }
    };
  
    return (
      <div className="w-[350px] h-[500px] overflow-hidden flex flex-col justify-between bg-[#fafafa] pb-3 shadow-lg rounded-2xl cursor-pointer">
        <div className={`relative h-[200px] px-4 flex items-end rounded-t-2xl ${bgColor || "bg-blue-500"}`}>
          {pathwayImage && (
            <Link href={linkTo ?? ''}>
              <Image src={pathwayImage} alt="pathway" width={800} height={500} className="w-full h-full object-cover rounded-t-2xl" />
            </Link>
          )}
          {image && (
            <Link href={linkTo ?? ''} className="w-full h-full flex items-center justify-center">
              <div className="w-full h-[90%] flex items-center justify-center overflow-hidden">
                <Image src={image} alt="pathway" width={300} height={300} className="w-full object-contain" />
              </div>
            </Link>
          )}
          {moduleImage && (
            <div className="absolute inset-0 bg-gray-50 rounded-t-2xl">
              <Image src={moduleImage} alt="module" width={300} height={300} className="w-full h-full object-cover rounded-t-2xl" />
            </div>
          )}
        </div>
  
        <div className="py-3 px-4 flex-1 flex flex-col justify-between">
          {subject && (
            <Link href={linkTo ?? ''}>
              <h3 className={`font-medium text-lg ${curriculum ? "font-semibold" : ""} text-black-800`}>{subject}</h3>
            </Link>
          )}
          {moduleSubject && (
            <h3 className={`font-medium ${curriculum ? "font-semibold" : ""} text-black-800`}>{moduleSubject}</h3>
          )}
  
          <div className="flex items-center gap-5">
            {level && <h3 className="pt-1 font-medium text-black-600">{level}</h3>}
            {price && <h3 className="pt-1 font-bold text-black-500">{price}</h3>}
          </div>
          
          <p className="text-black-800">{desc}</p>
  
          {curriculum && (
            <div className="mt-3 flex items-center justify-center gap-4">
              {viewCourse ? (
                <Link href={linkTo ?? ''} className="w-full border bg-black-500 text-white py-3 font-semibold text-center rounded-lg">View Course</Link>
              ) : isInCart(item?.id) ? (
                <div className="w-full flex items-center gap-4">
                  <Link href={`/students/cart`} className="w-full border border-black-500 text-black-500 py-2 font-semibold text-center rounded-lg">View in Cart</Link>
                  <button onClick={handleRemoveFromCart} className="w-full bg-black-500 py-2 text-white text-center rounded-lg">Remove</button>
                </div>
              ) : (
                <>
                  <button onClick={handleAddToCart} className="w-full border border-black-500 py-2 text-black-500 font-semibold text-center rounded-lg">Add to Cart</button>
                  <button onClick={handleBuyNow} className="w-full bg-black-500 py-2 text-white font-semibold text-center rounded-lg">Buy Now</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default CareerCard;
  
