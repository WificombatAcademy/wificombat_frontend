"use client"

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";
import cart from "@/app/utils/cart";
import { FaPlus } from "react-icons/fa6";

type FreeCourseProps = { 
    freecourse: string; 
    desc:string;
    title?: string;
    level:  string; 
    subject: string; 
    note?: string; 
    image: string; 
    viewCourse?: boolean;
    bgColor?: string;
    textWhite?: boolean;
    linkTo?: string;
    handleBuyNow?: (item: any, purchaseType?: string) => void;
    curriculum?: boolean;
    freecourseway?:string[];
    item?:any;
    freeCourseImage?:string;
    moduleImage?:string;
    moduleSubject?:string;
    price?:string,
    
}

const FreeCourseCard = ({ 
    freecourseway,
    subject, 
    image, 
    level, 
    desc, 
    linkTo, 
    bgColor,
    curriculum,
    item,
    freeCourseImage,
    moduleImage,
    moduleSubject,
    price,
    viewCourse
    
}: FreeCourseProps & { linkTo: string; }) => {
    const { addItemToCart, removeItemFromCart, isInCart, cart, setIsModalOpen } = useCart();
   

    const addToCart = () => {
        if (item){
          const {id, course_id, title, subject, level} = item
          if (id){
            const isCourseInCart = isInCart(course_id); // Now check course_id directly
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
                            if (!isCourseInCart) {
                                // If all modules are already in the cart, show a toast and prevent adding
                                if (modulesInCart + 1 === totalModules) {
                                    setIsModalOpen(true);
                                    toast.error('You are trying to add all modules. Please add the full course instead.');
                                    return; // Prevent further execution
                                }
            
                                // Show success message only if the main course is not in the cart
                                toast.success(`${title || subject} has been added to your cart!`);
                            }
                        
                            addItemToCart({
                                id: id,
                                course_id: course_id,
                                name: title || subject,
                                subject: subject,
                                level: level,
                                type: 'module',
                                details: item,
                                quantity: 1,
                                price: "free"
                            });
                         }
                        } else {
                            toast.error("Item ID is undefined.");
                        }
                    } else {
                        toast.error("Item is undefined.");
                    }
                }; 
        
        
        
        const RemoveFromCart = (id: any) => {
            if (item && item.id) {
                RemoveFromCart(item.id);
            }
        };

    return (
<div className="h-[500px] w-full flex flex-col bg-[#fafafa] pb-3 shadow-lg rounded-2xl cursor-pointer">
  <div
    className={`relative w-full h-[200px] flex items-center justify-center rounded-tl-2xl rounded-tr-2xl
    ${bgColor ?? ""}
    ${image && "flex items-center justify-center"}`}
  >
    {freeCourseImage && (
      <Link href={linkTo ?? ""}>
        <Image
          src={freeCourseImage}
          alt={subject}
          width={800}
          height={500}
          className="w-full h-full object-contain rounded-tl-2xl rounded-tr-2xl"
        />
      </Link>
    )}

    {image && (
      <Link href={linkTo ?? ""} className="flex items-center justify-center">
        <Image
          src={image}
          alt={subject}
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </Link>
    )}

    {moduleImage && (
      <div className="absolute inset-0 bg-gray-50 rounded-tl-2xl rounded-tr-2xl">
        <Image
          src={moduleImage}
          alt="pathway"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl"
        />
      </div>
    )}
  </div>

  <div className="flex-grow py-3 px-4 flex flex-col justify-between">
    {subject && (
      <Link href={linkTo ?? ""}>
        <h3 className={`font-medium text-lg text-black-800`}>{subject}</h3>
      </Link>
    )}
    {moduleSubject && (
      <h3 className={`font-medium lg:h-[4rem] text-black-800`}>{moduleSubject}</h3>
    )}

    <div className={`flex items-center gap-5`}>
      {level && (
        <h3 className={`font-medium text-black-600 font-semibold`}>{level}</h3>
      )}
      {price && <h3 className={`font-bold text-black-500`}>{price}</h3>}
    </div>

    <p className="pt-3 text-black-800 line-clamp-2">{desc}</p>

    {curriculum && (
      <div className="mt-3 flex items-center justify-center gap-4 h-[4rem]">
        {viewCourse ? (
          <Link
            href={linkTo ?? ""}
            className="w-full border bg-black-500 text-white py-3 font-semibold text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"
          >
            View Course
          </Link>
        ) : (
          <button
            className="w-full bg-black-500 text-white py-2 font-semibold text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"
          >
            Add to Cart
          </button>
        )}
      </div>
    )}
  </div>
</div>

    )
}

export default FreeCourseCard;



