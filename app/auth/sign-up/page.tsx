"use client";
import usePublicRedirection from "@/hooks/usePublicRedirection";

export default function SignUpPage({}: Readonly<{
  children: React.ReactNode;
}>) {
  usePublicRedirection();
  return <main>Sign up page</main>;
}
