"use client";
// import Header from "@/components/AuthHeader";
import SignUpSelector from "@/components/SignUpSelector";
import EmailStep from "@/components/SignUp/Email";
// import NameStep from "@/components/SignUp/Name";
// import OtpStep from "@/components/SignUp/Otp";

import { CreateUserDtoRole } from "../../../apis/generated.schemas";

import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useCallback, useState } from "react";
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  useAuthBasedRedirection();
  console.log(CreateUserDtoRole.CONSUMER);
  const [userType, setUserType] = useState<CreateUserDtoRole | "">("");
  const router = useRouter()
  const setUser = useCallback((type: any) => {
    setUserType(type);  
    console.log('here')
    router.push("/auth/sign-up/credentials");
  }, [])
  return (
    <>
      {!userType && (
        <SignUpSelector
          setUserType={setUser}
        />
      )}
    </>
  );
}
