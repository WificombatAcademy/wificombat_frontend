import Link from 'next/link';
import React from 'react'

export type PopupProps = {
  links: link[];
  onClose?: () => void;
  onclick?: () => void;
  portfolio?: boolean;
}

export type link = {
    href: string;
    label: string
  }

const Popup = ({links, portfolio, onclick}: PopupProps) => {
  return (
    <div className={`z-[10] absolute top-full ${portfolio && "right-0 shadow-xl"} bg-white flex shadow-md py-4 rounded max-lg:hidden`}>
    <ul>
      {links.map((link, index) => (
        <li 
        key={index} 
        className={`w-full ${portfolio && "text-center mb-4"}`}
        onClick={onclick}
        >
          <Link href={link.href} className="block text-black-500 px-4 py-2 hover:bg-gray-200 whitespace-nowrap">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Popup