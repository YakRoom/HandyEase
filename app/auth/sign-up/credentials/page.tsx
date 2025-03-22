"use client";
import AuthHeader from '@/components/AuthHeader';
import EmailStep from '@/components/SignUp/Email'
import Name from '@/components/SignUp/Name';
import Terms from '@/components/SignUp/Terms';
import OtpStep from '@/components/SignUp/Otp';
import { useState } from 'react';

export default function Credentials() {
    const [step, setStep] = useState(0)
  return (
    <>
    {/* <AuthHeader isLogin={false} /> */}
    {step === 0 && <EmailStep userType={''} setStep={setStep}/>}
    {step === 1 && <OtpStep setStep={setStep}/>}
    {step === 2 && <Name setStep={setStep}/> }
    {step === 3 && <Terms setStep={setStep} />}
    </>
  );
}
