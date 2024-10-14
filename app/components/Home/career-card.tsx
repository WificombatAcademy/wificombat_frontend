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
    moduleImage?: string;
    pathwayImage?: string;
    curriculum?: boolean;
    type?: 'course' | 'module';
}

const CareerCard = ({ bgColor ,desc, linkTo, level, subject, item, type,
    textWhite, pathways, image, pathwayImage, curriculum, price, moduleImage, moduleSubject }: Props) => {

        const { addItemToCart, removeItemFromCart, isInCart } = useCart();

        const handleAddToCart = () => {
            console.log("Item:", item); // Check the item being passed
        
            if (item) { // Check if item is defined
                const { id, course_id, title, subject, level } = item; // Extract properties directly from item
                console.log(course_id);
                
                if (id) { // Ensure item.id is defined
                    // Check if the main course is in the cart
                    const isCourseInCart = isInCart(course_id); // Now check course_id directly
                    const isModuleInCart = isInCart(id); // Check if the module is already in cart
                    
                    // console.log(isCourseInCart);
                    // console.log(course_id);
                    
                    if (!isModuleInCart) {
                        if (!isCourseInCart) {
                            // Show success message only if the main course is not in the cart
                            toast.success(`${title || subject} has been added to your cart!`);
                        }
                        addItemToCart({
                            id: id,
                            name: title || subject,
                            subject: subject,
                            level: level, // course or module
                            type: 'module', // Update this if you want to distinguish between course/module
                            price: item.price, // Ensure price is defined in item
                            details: item, // Keep the original item for further detail
                            quantity: 1
                        });
                    } else if (isCourseInCart) {
                        toast.error(`The main course is already in your cart. You cannot add this module.`);
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

    // const finalLink = 
    // linkTo || 
    // (coursePageLinkTo && { pathname: coursePageLinkTo.pathname, query: coursePageLinkTo.query });

    return (
        <div className="h-full">
            <div className="w-full flex flex-col h-full bg-[#fafafa] pb-3 shadow-lg rounded-2xl cursor-pointer">

            <div 
                className={`relative w-full 
                ${curriculum ? "h-[200px] min-[2000px]:h-[300px]" : "h-[250px] min-[2000px]:h-[330px]" } 
                    ${bgColor ?? "bg-blue-500"} px-4 flex items-end rounded-tl-2xl rounded-tr-2xl`}>

                    {pathwayImage &&
                    <Link href={linkTo ?? ''}>
                        <Image src={pathwayImage} alt="pathway"
                        width={800} height={500}
                        className="w-full h-[250px] min-[2000px]:h-[330px] 
                        object-contain rounded-tl-2xl rounded-tr-2xl" 
                        />
                    </Link>
                    }

                    {image && 
                     <Link href={linkTo ?? ''}>
                        <div className="absolute inset-0 bg-gray-50 rounded-tl-2xl rounded-tr-2xl">
                            <Image src={image} alt="pathway"
                            width={300} height={300}
                            className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl" 
                            />
                        </div>
                    </Link>
                    }

                    {moduleImage &&
                        <div className="absolute inset-0 bg-gray-50 rounded-tl-2xl rounded-tr-2xl">
                            <Image src={moduleImage} alt="pathway"
                            width={300} height={300}
                            className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl" 
                            />
                        </div>
                    }

                    {/* <div className="relative z-[7]">
                        {!pathwayImage &&
                        <h3 
                        className={`${textWhite ? "text-white": ""}  
                        my-3 text-lg md:text-2xl text-black-500 font-semibold`}>
                            {pathway} Pathway</h3>}
                    </div> */}
                </div>

                <div className="py-3 px-4">

                    {subject && (
                    <Link href={linkTo ?? ''}>
                            <h3 className={`font-medium text-lg 
                            ${!curriculum ? "md:text-xl pt-3" : "font-semibold"} text-black-800`}>
                            {subject}</h3>
                        </Link>
                    )}

                     {moduleSubject && (
                        <h3 className={`font-medium text-lg lg:h-[4rem]
                        ${!curriculum ? "md:text-xl pt-3" : "font-semibold"} text-black-800`}>
                        {moduleSubject}</h3>
                    )}

                    <div className="flex items-center gap-5 mt-4">

                    {level && 
                    <h3 className={`pt-1 font-medium md:text-lg 
                    ${curriculum ? "text-black-600 font-semibold" : "text-black-800"} `}>{level}</h3>}

                    {price && <h3 className={`pt-1 font-bold text-black-500`}>{price}</h3>}
                    </div>

                    <p className={`${!curriculum ? "pt-4" : "pt-3"} text-black-800`}>{desc}</p>

                    {curriculum && (
                        <div className="mt-3 flex items-center justify-between gap-4 h-[4rem]">
                            {isInCart(item?.id) ? (
                               <div className="relative w-full basis-[50%] flex flex-col gap-2">
                                    <Link 
                                        href={`/students/cart`}
                                        className="w-full border border-black-500 text-black-500 py-2
                                        font-semibold text-center transition ease-in-out duration-300 
                                        hover:bg-opacity-80 rounded-lg">
                                        View in Cart
                                    </Link>
                                    <button 
                                        onClick={handleRemoveFromCart} 
                                        className="absolute right-[-0.4rem] top-[-0.4rem] flex justify-center items-center">
                                        <div className="flex items-center justify-center w-4 h-4 bg-red-500 
                                        text-white rounded-full transition duration-300 hover:bg-red-600">
                                            <span className="text-[10px] font-bold">X</span>
                                        </div>
                                    </button>
                               </div>
                            ) : (
                                <button 
                                    onClick={handleAddToCart} 
                                    className="w-full basis-[50%] border border-black-500 py-2 text-black-500 
                                    font-semibold text-center transition ease-in-out duration-300 
                                    hover:bg-opacity-80 rounded-lg">
                                    Add to Cart
                                </button>
                            )}

                            <button className="w-full basis-[50%]">
                                <p className="w-full bg-black-500 font-semibold py-2 text-white 
                                text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"> 
                                    Buy Now
                                </p>
                            </button>
                        </div>
                    )}

                {pathways && 
                <div className="mt-3 flex flex-wrap items-center gap-1">
                    {pathways?.map((pathway, index) => (
                        <div 
                        key={index}
                        className="bg-black-50 py-1 px-2 rounded-lg border text-center flex items-center justify-center
                        text-black-600 text-xs capitalize">
                            {pathway}
                        </div>
                    ))}
                    <div className="bg-black-50 py-1 px-2 rounded-lg border 
                    text-center flex items-center justify-center text-black-600">
                        <FaPlus size={14}/>
                    </div>
                </div>}

                </div>
            </div>
        </div>
    )
}

export default CareerCard