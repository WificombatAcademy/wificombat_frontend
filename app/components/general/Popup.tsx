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
    <div className="z-[10] fixed top-[4rem] bg-white shadow-md py-4 rounded max-lg:hidden">
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="block text-black-500 px-4 py-2 hover:bg-gray-200">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Popup