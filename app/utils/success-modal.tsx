"use client"
import { useState } from 'react';
import Modal from './modal';
import Image from 'next/image';
import Link from 'next/link';

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal = ({isOpen, onClose}: ModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} removeCancelIcon={true}>

        <Image 
        src={`/assets/auth/success.svg`}
        alt='success'
        width={91}
        height={87}
        className='mt-7 object-contain mx-auto'
        />

        <div className="mt-6 text-xl font-semibold text-center">
        Verification Successful
        </div>
        <p className="text-lg font-medium my-4 text-center">
       Your account has been created successfully
        </p>


        <Link href={`/create-profile`}>
            <button
            className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
            p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
            { "Create Profile"}
            </button>
        </Link>

    </Modal>
  );
};

export default SuccessModal;