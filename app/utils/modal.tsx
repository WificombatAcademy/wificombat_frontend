import { ReactNode } from 'react';
import { VscClose } from 'react-icons/vsc';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  removeCancelIcon?: boolean;
  portfolio?: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, removeCancelIcon, children, portfolio }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[150] flex ${portfolio ? "items-start" : "items-center"} justify-center overflow-y-auto`}>
      <div className="fixed inset-0 bg-[#26002C80]" onClick={onClose}></div>
      <div className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
      relative ${portfolio ? "lg:left-[8%] w-[95%] lg:w-[50%] mx-auto my-16" : "max-w-lg"} max-md:mt-16 max-md:h-fit max-md:w-[96%]`}>
        {!removeCancelIcon && 
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <VscClose size={25}
          onClick={onClose}/>
        </button>}
        {children}
      </div>
    </div>
  );
};

export default Modal;