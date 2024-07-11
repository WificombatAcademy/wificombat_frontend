import Link from 'next/link';
import React from 'react'

export type PopupProps = {
  links: link[];
  onClose?: () => void;
}

export type link = {
    href: string;
    label: string
  }

const Popup = ({links}: PopupProps) => {
  return (
    <div className="z-[10] absolute top-full bg-white flex shadow-md py-4 rounded max-lg:hidden">
    <ul>
      {links.map((link, index) => (
        <li key={index} className='w-full'>
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