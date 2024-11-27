
import { merriweather } from "@/app/fonts";
import { Breadcrumbs } from "@/app/utils/breadcrumb";
import BreadcrumbsWrapper from "@/app/utils/breadcrumbsWrapper";
import Cart from "@/app/utils/cart";





type Props = {
    bgColor?: "blue" | "purple" | "black";
    headerOne: string;
    headerTwo:string;
    text: string;
    whiteButton?: boolean;
   
    
}

export const PrivacyHero = ({bgColor, headerOne, headerTwo}: Props) => {
    return (
        <BreadcrumbsWrapper>
        <section 
        id="home"
        className="text-white">
            <div className={`relative isolate overflow-hidden pb-[2rem] lg:pb-[7rem] md:py-[7rem] lg:py-[10rem] 
                 ${bgColor === "blue" ? "bg-blue-500" : bgColor === "purple" ? "bg-purple-500" : "bg-black"}`}>
                    <Cart/>
                <div className={`relative max-lg:mt-[5rem] w-[93%] md:w-[80%] lg:w-[85%] mx-auto 
                 -mt-60   max-lg:h-full h-[16rem] xl:h-[20rem] 2xl:h-[24rem] 
                    flex flex-col md:flex-row md:items-center md:justify-between gap-10`}>
                    <div className="w-full md:basis-[50%] relative">
                        <Breadcrumbs homeLabel={""} 
                        />                           
                     
                    </div>

                    </div>
                    <div className="-mt-14">
                        <p className={`${merriweather.className} 
                           text-center  text-5xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                            max-md:leading-[45px] lg:leading-[67.2px] 2xl:leading-[78px] font-bold max-lg:pt-8`}>
                            {headerOne}
                        </p>

                        <p className={`${merriweather.className} mt-9 md:w-[80%] lg:w-[65%] mx-auto text-center md:text-xl`}>
                            {headerTwo}
                        </p>
                        </div>
                    </div>
              
        </section>
        </BreadcrumbsWrapper>
    )
}