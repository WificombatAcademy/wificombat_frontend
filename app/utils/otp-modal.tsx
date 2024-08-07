"use client"
import { useEffect, useState } from 'react';
import Modal from './modal';
import OTPInput from './otpInput';

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const OtpModal = ({isOpen, onClose}: ModalProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [otp, setOtp] = useState("");
  const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
  const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);


  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-xl font-semibold text-center">
        OTP Verification
        </div>
        <p className="text-lg font-medium my-4 text-center">
        Please enter the 4-digit code sent to your email
        </p>

        <div className="my-4 pt-6 md:py-10 text-center space-y-3">
            <OTPInput
                autoFocus
                isNumberInput
                length={4}
                className="mx-auto my-5/20 appearance-none"
                inputClassName="w-12 h-12 mx-3 md:mx-4 text-2xl text-center rounded-md border border-gray-400 overflow-y-hidden"
                onChangeOTP={(newOtp) => setOtp(newOtp)}
            />

            <div>
                <p className='text-black-400'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
            </div>
        </div>

        <button
        disabled={otp === "" || isVerifyingLoading || isResendCodeLoading}
        className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
        p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
        {isVerifyingLoading? "Verifying..." : "Verify Account"}
        </button>

        <p 
        // onClick={resendCode}  
        className="my-4 text-center font-semibold cursor-pointer">
            {isResendCodeLoading ? "Resending..." : "Resend Code"}
        </p>
    </Modal>
  );
};

export default OtpModal;