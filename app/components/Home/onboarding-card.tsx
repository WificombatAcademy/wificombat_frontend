import Link from "next/link"

type Props = {
    reverse?: boolean;
    title: string;
    desc?: string;
    listdesc?: string[];
    buttonText: string;
}

export const OnboardingCard = ({buttonText, title, desc,listdesc, reverse}: Props) => {
    return (
        <div className={`w-full flex flex-col ${reverse? "md:flex-row-reverse" : "md:flex-row"} md:items-center md:justify-between gap-16`}>
            <div className="w-full md:basis-[50%]">
                <h3 className="text-2xl lg:text-3xl text-black-500 font-semibold">{title}</h3>
                {desc ? 
                <>
                    <p className="pt-4 text-black-700 md:text-xl">{desc}</p>
                </> :
                <>
                    {listdesc && 
                    <ul className="pt-4 text-black-700 space-y-4 list-disc">
                            {listdesc.map((item, index) => (
                                <li key={index} className="ml-4">{item}</li>
                            ))}
                    </ul>}
                </>}
               <div className="mt-14">
                    <Link
                    href="/register"
                    className="rounded-lg bg-[#131314] px-16 py-5 font-medium text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                    {buttonText}
                    </Link>
               </div>
            </div>

            <div className={`w-full md:basis-[50%] ${!reverse && "flex items-center justify-center"}`}>
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-500 rounded-full max-md:mx-auto">

                </div>
            </div>
        </div>
    )
}