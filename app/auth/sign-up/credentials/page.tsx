"use client";
import EmailStep from '@/components/SignUp/Email'
import OtpStep from '@/components/SignUp/Otp';
import { useState } from 'react';

export default function Credentials({}: Readonly<{
  children: React.ReactNode;
}>) {
    const [step, setStep] = useState(1)
  return (
    <>
    {step === 0 && <EmailStep />}
    {step === 1 && <OtpStep />}
    </>
  );
}
