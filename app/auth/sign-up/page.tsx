"use client";
import EmailStep from "@/components/SignUp/Email";
import Name from "@/components/SignUp/Name";
import Terms from "@/components/SignUp/Terms";
import OtpStep from "@/components/SignUp/Otp";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import SignUpSelector from "@/components/SignUp/SignUpSelector";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { usePublicRoute } from "@/hooks/routeHooks";
import { useRouter } from "next/navigation";

interface User {
  id?: string;
  name?: string;
  policyAccepted?: boolean;
  firstName?: string;
  otp?: string;
  role?: CreateUserDtoRole;
}

export default function Credentials() {
  usePublicRoute();
  const [step, setStep] = useState(0);
  const { state } = useAppContext();
  const router = useRouter();
  const [userType, setUserType] = useState<CreateUserDtoRole | null>(
    state?.user?.role || null
  );
  // Helper functions to determine signup flow steps
  const determineSignupStep = (user: User | null | undefined) => {
    if (!user) return null;
    if (user?.otp) return 2;
    if (!user?.firstName) return 3;
    if (!user?.policyAccepted) return 4;
    return null;
  };

  // Helper function to handle provider routing
  const handleProviderRouting = (
    user: User | null | undefined,
    isOnboarded: boolean | undefined,
    router: ReturnType<typeof useRouter>
  ) => {
    if (user?.role === CreateUserDtoRole.PROVIDER && !isOnboarded) {
      router.replace("/auth/provider-details");
    }
  };

  useEffect(() => {
    // Handle signup flow steps
    const newStep = determineSignupStep(state?.user);
    if (newStep) {
      setStep(newStep);
    } else if (userType && !state?.user?.role) {
      setStep(1);
    } else {
      handleProviderRouting(state?.user, state?.isOnboarded, router);
    }
  }, [state?.user, userType, state?.isOnboarded, router]);

  return (
    <>
      {step === 0 && <SignUpSelector setUserType={setUserType} />}
      {step === 1 && <EmailStep userType={userType} setStep={setStep} />}
      {step === 2 && <OtpStep setStep={setStep} />}
      {step === 3 && <Name setStep={setStep} />}
      {step === 4 && <Terms setStep={setStep} />}
    </>
  );
}
