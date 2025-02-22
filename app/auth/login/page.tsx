"use client";
import usePublicRedirection from "@/hooks/usePublicRedirection";

export default function LoginPage({}: Readonly<{
  children: React.ReactNode;
}>) {
  usePublicRedirection();
  return <main>Login page</main>;
}
