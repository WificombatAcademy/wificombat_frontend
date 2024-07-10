import Link from "next/link"

export const Community = () => {
    return (
        <div className="w-full h-16 relative flex items-center justify-center">
            <div className="z-[2] absolute w-[93%] md:w-[90%] lg:w-[88%] mx-auto py-12 text-center text-white bg-purple-500 rounded-3xl">
                <h3 className="text-xl md:text-2xl w-[90%] md:w-[80] mx-auto font-semibold">Join the Wificombat Elearn Community Today:</h3>
                <p className="mt-1 w-[90%] md:w-[70%] mx-auto">Ready to empower your students for success in the digital age? Sign up for a 
                    free trial of Wificombat Elearn today and unlock a world of opportunities for your students&apos; future 
                    careers in tech!</p>

                   <div className="mt-8 mb-3 flex items-center justify-center">
                        <Link
                            href="/register"
                            className="rounded-lg bg-[#131314] px-16 py-5 font-medium text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Register Now
                        </Link>
                   </div>
            </div>

            <div className="absolute left-3 md:left-5 top-3 md:top-5 w-[93%] md:w-[90%] lg:w-[88%] mx-auto h-[200px] py-12 text-center text-white bg-purple-300 rounded-3xl"></div>
        </div>
    )
}