import Image from "next/image";

const data = [
    { id: 1, feature: 'Auctor sed pharetra egestas gravida.', monthly: '/checkmark.svg', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 2, feature: 'Auctor sed pharetra egestas gravida.', monthly: '/checkmark.svg', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 3, feature: 'Auctor sed pharetra egestas gravida.', monthly: '/checkmark.svg', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 4, feature: 'Auctor sed pharetra egestas gravida.', monthly: '/checkmark.svg', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 5, feature: 'Auctor sed pharetra egestas gravida.', monthly: '/checkmark.svg', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 6, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 7, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 8, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '/checkmark.svg', yearly:'/checkmark.svg' },
    { id: 9, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '', yearly:'/checkmark.svg' },
    { id: 10, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '', yearly:'/checkmark.svg' },
    { id: 11, feature: 'Auctor sed pharetra egestas gravida.', monthly: '', quarterly: '', yearly:'/checkmark.svg' },
  ];

export const PricingFeatures = () => {
    return (
        <div className="w-full py-16 mb-16 bg-purple-500 text-white">
            <div className="w-[93%] md:w-[90] lg:w-[88%] mx-auto overflow-x-scroll">
                <table className="min-w-full">
                    <thead>
                    <tr>
                        <th className="text-lg lg:text-2xl lg:px-4 py-2 pb-10 text-left">Features</th>
                        <th className="text-lg lg:text-2xl lg:px-4 py-2 pb-10 text-left">Monthly</th>
                        <th className="text-lg lg:text-2xl lg:px-4 py-2 pb-10 text-left">Quarterly</th>
                        <th className="text-lg lg:text-2xl lg:px-4 py-2 pb-10 text-left">Yearly</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="mt-9">
                        <td className="p-4">{row.feature}</td>
                        <td className="p-4 text-center">
                            {row.monthly != "" && 
                            <Image 
                            alt="checkmark"
                            src={row.monthly}
                            width={24}
                            height={24}
                            className="object-contain"
                            />}
                        </td>
                        <td className="p-4 text-center">
                            {row.quarterly != "" && 
                            <Image 
                            alt="checkmark"
                            src={row.quarterly}
                            width={24}
                            height={24}
                            className="object-contain"
                            />}
                        </td>
                        <td className="p-4 text-center">
                           {row.yearly != "" &&
                            <Image 
                            alt="checkmark"
                            src={row.yearly}
                            width={24}
                            height={24}
                            className="object-contain"
                            />}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}