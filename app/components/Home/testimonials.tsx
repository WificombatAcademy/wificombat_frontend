import { FaQuoteLeft } from "react-icons/fa"

export const Testimonials = () => {
    return (
        <div className="w-full py-7 md:py-10 bg-black-500">
            <div className="w-[93%] md:w-[88%] mx-auto mt-3 flex max-[330px]:flex-col 
            flex-row items-center justify-center gap-2 md:gap-4">
                <div className="bg-white py-4 px-5 font-semibold text-lg md:text-2xl rounded-3xl">
                    TESTIMONIALS
                </div>
                <div className="text-white font-semibold text-lg md:text-2xl">FROM OUR USERS</div>
            </div>

            <div className="mt-14 w-[93%] md:w-[90%] lg:w-[88%] mx-auto">
                <div className="md:w-[75%] mx-auto text-center text-white">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <FaQuoteLeft size={40} className="flex-shrink-0 max-md:mx-auto"/>
                        <p className="font-medium md:text-xl">
                            Lorem ipsum dolor sit amet consectetur. Aliquam ut amet eget mi faucibus ultrices 
                            mattis proin habitant. Sit quis rhoncus placerat ut ultricies aliquam. Non mauris 
                            lacus massa dis. Habitasse viverra blandit tincidunt </p>
                    </div>

                    <h2 className="mt-6 md:mt-8 text-2xl md:text-3xl font-semibold">Esther Howard</h2>
                    <h4 className="mt-5 text-lg md:text-xl">Alumni</h4>
                </div>
            </div>
        </div>
    )
}