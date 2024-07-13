import Link from "next/link";

type Props = {
    pathway: string;
    desc: string;
    linkTo?: string;
    subject?: string;
    level?: string
}

const CareerCard = ({desc, pathway, linkTo, level, subject}: Props) => {
    return (
        <div className="w-full bg-white shadow-lg rounded-2xl">
            <div className="w-full h-[220px] bg-black-200 px-4 flex items-end rounded-tl-2xl rounded-tr-2xl">
                <div>
                    <h3 className="my-3 text-lg md:text-2xl text-black-500 font-semibold">{pathway} Pathway</h3>
                </div>
            </div>

            <div className="py-3 px-4">
                {subject && <h3 className="pt-3 font-medium text-lg md:text-xl text-black-800">{subject}</h3>}
                {level && <h3 className="pt-1 font-medium md:text-lg text-black-800">{level}</h3>}
                <p className="pt-4 text-black-800">{desc}</p>

              {linkTo &&
                 <div className="mt-8">
                    <Link href={linkTo} className="w-full">
                        <p className="w-full bg-black-500 py-4 text-white 
               text-center transition ease-in-out duration-300 hover:bg-opacity-80 rounded-lg"> View More</p>
                    </Link>
               </div>}
            </div>
        </div>
    )
}

export default CareerCard