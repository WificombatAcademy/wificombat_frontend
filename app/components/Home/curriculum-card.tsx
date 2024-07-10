import Image from "next/image";

type Props = {
    borderColor: string,
    bgColor: string;
    title: string;

}

const listItems = [
    "Lorem ipsum dolor sit amet c1",
    "Lorem ipsum dolor sit amet c2",
    "Lorem ipsum dolor sit amet c3",
    "Lorem ipsum dolor sit amet c4",
    "Lorem ipsum dolor sit amet c5",
    "Lorem ipsum dolor sit amet c6",
    "Lorem ipsum dolor sit amet c7",
    "Lorem ipsum dolor sit amet c8"
];

export const CurriculumCard = ({bgColor, borderColor, title}: Props) => {
    return (
        <div className={`w-full py-6 px-4 rounded-3xl border-t-4 ${borderColor} ${bgColor}`}>
            <div className="w-full flex items-center justify-center">
                <div className="w-24 h-24 bg-primary-gray rounded-full"></div>
            </div>

                <h3 className="w-full mt-4 text-center font-semibold text-2xl">{title}</h3>

                <ul className="mt-5 space-y-3">
                    {listItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Image src={`/star.png`} width={24} height={24} alt="star" className="object-contain flex-shrink-0"/>
                            <li className="text-black-500">{item}</li>
                        </div>
                    ))}
                </ul>
        </div>
    )
}