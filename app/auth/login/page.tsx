"use client";
import { useAuthControllerSignIn } from "@/apis/generated";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useEffect } from "react";

export default function LoginPage({}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthBasedRedirection(true);
  const { mutate: signIn } = useAuthControllerSignIn();
  useEffect(() => {
    signIn({
      data: {
        email: "test@test.com",
        password: "test",
      },
    });
  }, []);
  return <main>Login page</main>;
}
