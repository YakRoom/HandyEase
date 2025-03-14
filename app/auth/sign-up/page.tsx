"use client";
// import Header from "@/components/AuthHeader";
import SignUpSelector from "@/components/SignUpSelector";
import EmailStep from "@/components/SignUp/Email";
// import NameStep from "@/components/SignUp/Name";
// import OtpStep from "@/components/SignUp/Otp";

import { CreateUserDtoRole } from "../../../apis/generated.schemas";

import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useState } from "react";

export default function SignUpPage() {
  useAuthBasedRedirection();
  console.log(CreateUserDtoRole.CONSUMER);
  const [userType, setUserType] = useState<CreateUserDtoRole | "">("");

  return (
    <>
      {!userType && (
        <SignUpSelector
          setUserType={(type) => {
            setUserType(type);
          }}
        />
      )}
      {userType && <EmailStep userType={userType} />}
    </>
  );
}
