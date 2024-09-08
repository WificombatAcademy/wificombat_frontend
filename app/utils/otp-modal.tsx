"use client"
import { useEffect, useState } from 'react';
import Modal from './modal';
import OTPInput from './otpInput';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API } from './types-and-links';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axiosInstance from './auth-interceptor';

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const OtpModal = ({isOpen, onClose}: ModalProps) => {
  const {mail} = useAuth();
  const router = useRouter();
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [otp, setOtp] = useState("");
  const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
  const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setIsOtpExpired(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const validateOtp = async () => {
    try {
      setIsVerifyingLoading(true);
      const response = await axiosInstance.post(`${API}/otp/`, {
        email: mail,
        action: 'validate',
        otp
      });
      console.log('OTP verified:');
      setIsVerifyingLoading(false);
      setSuccessfulSignup(true);
      onClose(); // Close the modal after successful verification
      router.push("/create-profile");
    } catch (error) {
      toast.error('Error sending OTP');
      setIsVerifyingLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setIsResendCodeLoading(true);
      const response = await axiosInstance.post(`${API}/otp/`, {
        email: mail,
        action: 'resend'
      });
      toast.success('OTP resent');
      setIsResendCodeLoading(false);
      setMinutes(10);
      setSeconds(0);
      setIsOtpExpired(false);
    } catch (error) {
      console.error('OTP verification failed:', error);
      setIsResendCodeLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Toaster />
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
                length={6}
                className="mx-auto my-5/20 appearance-none"
                inputClassName="w-10 h-10 md:w-12 md:h-12 mx-1 md:mx-4 text-2xl text-center rounded-md border border-gray-400 overflow-y-hidden"
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
        onClick={validateOtp}
        className="flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
        p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
        {isVerifyingLoading? "Verifying..." : "Verify Account"}
        </button>

        <button 
        disabled={isOtpExpired}
        onClick={resendOtp}  
        className={`my-4 w-full text-center flex items-center justify-center font-semibold cursor-pointer 
          ${isOtpExpired ? '' : 'text-gray-400'}`}
        >
            {isResendCodeLoading ? "Resending..." : isOtpExpired ? "Resend Code" : "Wait for Expiry"}
        </button>
    </Modal>
  );
};

export default OtpModal;