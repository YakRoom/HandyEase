"use client";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";

export default function SignUpPage({}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthBasedRedirection(true);
  return <main>Sign up page</main>;
}
