type Props = {
    borderColor: string;
    bgColor: string;
    title: string;
    desc: string;
    col?: boolean;
    noCircle?: boolean;
}


export const BenefitCard = ({col, desc, borderColor, bgColor, title, noCircle}: Props) => {
    return (
        <div className={`w-full p-4 md:py-6 shadow-lg rounded-lg border-t-4 ${borderColor}`}>
            <div className={`flex gap-4 ${col && "flex-col items-center"}`}>
                {!noCircle && <div className={`w-16 h-16 flex-shrink-0 ${bgColor} rounded-full`}></div>}

                <div className={``}>
                <h3 className="text-lg md:text-2xl text-black-500 font-semibold">{title}</h3>
                <p className="pt-4 text-black-700">{desc}</p>
                </div>
            </div>
        </div>
    )
}