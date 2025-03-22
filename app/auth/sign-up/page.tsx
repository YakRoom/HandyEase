"use client";
import SignUpSelector from "@/components/SignUpSelector";

import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";

export default function SignUpPage() {
  useAuthBasedRedirection();
  return <SignUpSelector />;
}
