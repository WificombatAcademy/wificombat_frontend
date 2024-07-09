type Props = {
    borderColor: string;
    bgColor: string;
    title: string;
    desc: string;
}


export const BenefitCard = ({desc, borderColor, bgColor, title}: Props) => {
    return (
        <div className={`w-full p-4 md:py-6 shadow-lg rounded-lg border-t-4 ${borderColor}`}>
            <div className="flex gap-4">
                <div className={`w-16 h-16 flex-shrink-0 ${bgColor} rounded-full`}></div>

                <div>
                <h3 className="text-lg md:text-2xl text-black-500 font-semibold">{title}</h3>
                <p className="pt-4 text-black-700">{desc}</p>
                </div>
            </div>
        </div>
    )
}