import { useCart } from "@/app/context/CartContext";
import { merriweather } from "@/app/fonts"
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import Cart from "@/app/utils/cart";
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast";

type Props = {
    bgColor: string;
    image?: string;
    header: string;
    desc: string;
    level?: string;
    buttonWhite?: boolean;
    coursePage?: boolean;
    widthStyle?: string;
    course?: any;
}

export const PathwayHero = ({
    bgColor, 
    image, 
    desc, 
    header, 
    buttonWhite,
    widthStyle, 
    level,
    coursePage,
    course }: Props) => {
    const { addItemToCart, isInCart, removeItemFromCart } = useCart();

    const handleAddToCart = (course: any) => {
        const cartItem = {
            id: course.course_id,
            name: course.name,
            level: course.level,
            type: course,
            price: course.price,
            quantity: 1,  // Initial quantity
            details: course,  // Add any other details
        };
        
        addItemToCart(cartItem);
        toast.success('Item Added to Cart');
    };

    const handleRemoveFromCart = (courseId: any) => {
        removeItemFromCart(courseId);
    };

    const isCourseInCart = course && isInCart(course.course_id);

    return (
        <section id="home" className="text-white">
            <div className={`relative isolate overflow-hidden pb-[2rem] lg:pb-[7rem] 
                md:py-[7rem] lg:py-[10rem] ${bgColor}`}>
                <Cart/>
                <div className="relative max-md:mt-[4rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto 
                max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
                    <div className="w-full md:basis-[50%] relative">

                        <Breadcrumbs homeLabel="Home" />
                        <h3 className="mt-16 lg:mt-9 font-bold text-lg md:text-2xl">
                            {level}
                        </h3>

                        <h1 className={`${merriweather.className} 
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:mt-4`}>
                            {header}
                        </h1>

                        <p className="mt-5 font-semibold text-lg md:text-xl lg:w-[85%]">
                            {desc}
                        </p>

                        <div className="mt-10 lg:mt-16"> 
                            {!coursePage ? (
                                <Link 
                                    href={`/registration`}
                                    className={`${buttonWhite ? "bg-white text-black-500" : "bg-[#131314] text-white focus-visible:outline-black"} 
                                        rounded-lg px-16 py-5 font-medium shadow-sm 
                                        hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2`}
                                >
                                    Register
                                </Link>
                            ) : (
                                <div className="flex items-center gap-6 h-[4rem]">
                                    <button 
                                        className={`${buttonWhite ? "bg-white text-black-500" :
                                            "bg-[#131314] text-white focus-visible:outline-black"} 
                                            rounded-lg px-8 md:px-12 py-3 font-medium shadow-sm 
                                        hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                        focus-visible:outline-offset-2 md:text-lg`}
                                    >
                                        Buy Now
                                    </button>

                                    {isCourseInCart ? (
                                        <div className="flex flex-col gap-2">
                                            <Link href="/students/cart">
                                                <button 
                                                    className="bg-transparent border-black-500
                                                    border text-black-500 focus-visible:outline-black
                                                    rounded-lg px-8 md:px-12 py-1 font-medium shadow-sm 
                                                    hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                    focus-visible:outline-offset-2 md:text-lg"
                                                >
                                                    View in Cart
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleRemoveFromCart(course.course_id)}
                                                className="bg-transparent border-red-50
                                                border text-red-50 focus-visible:outline-red-50
                                                rounded-lg px-8 md:px-12 py-1 font-medium shadow-sm 
                                                hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                                focus-visible:outline-offset-2 md:text-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleAddToCart(course)}
                                            className="bg-transparent border-black-500
                                            border text-black-500 focus-visible:outline-black
                                            rounded-lg px-8 md:px-12 py-3 font-medium shadow-sm 
                                            hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 
                                            focus-visible:outline-offset-2 md:text-lg"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`w-full md:basis-[50%] 
                    ${coursePage ? "max-md:h-[340px] h-[300px] rounded-3xl" : "max-md:h-[350px]"}
                        max-md:flex max-md:items-center max-md:justify-center`}>
                        {image && (
                            <Image 
                                src={image ?? ""}
                                alt={image ?? ""}
                                width={500}
                                height={500}
                                className={`object-contain border-none
                                ${widthStyle ?? "w-full h-full"}
                                ${coursePage && "rounded-3xl object-contain bg-gray-50"}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}