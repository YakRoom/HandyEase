"use client";
import { useAuthControllerSignIn } from "@/apis/generated";
// import { useAuthControllerSignIn } from "@/apis/generated";
import Header from "@/components/AuthHeader";
import { Button, Input } from "@/components/ui";
import WhitePaper from "@/components/ui/white-paper";
import { useAppContext } from "@/context/AppContext";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
export const TOKEN_KEY = "token";

export default function LoginPage({}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuthBasedRedirection();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn, data } = useAuthControllerSignIn();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (data) {
      localStorage.setItem(TOKEN_KEY, data?.access_token);
      dispatch({
        type: "SET_USER",
        payload: data.user,
      });
    }
  }, [data]);

  return (
    <div>
      <WhitePaper>
        {/* Header with tabs */}

        {/* Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            What's your phone number or email
          </h2>
          <Input
            placeholder="Email"
            type="email"
            className="bg-stone-200 h-11"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            className="bg-stone-200 h-11"
            onChange={(e) => setPassword(e?.target?.value)}
          />
          {/* <a href="#" className="text-sm text-blue-500">
            Forgot password?
          </a> */}
          <Button
            style={{ width: "100%" }}
            disabled={!email || !password}
            onClick={() =>
              signIn({
                data: {
                  email,
                  password,
                },
              })
            }
          >
            Continue
          </Button>
        </div>
        {/* Footer Text */}
        <p className="mt-32 text-xs text-gray-500">
          Get the job done with low prices. Connect directly with 100s of crew
          members in your local area.
        </p>
      </WhitePaper>
    </div>
  );
}
