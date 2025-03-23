"use client";
/* eslint-disable */
import {
  useAuthControllerSignIn,
  useProvidersControllerGetMyProviderDetails,
} from "@/apis/generated";
import { Button, Input } from "@/components/ui";
import WhitePaper from "@/components/ui/white-paper";
import { useAppContext } from "@/context/AppContext";
import { usePublicRoute } from "@/hooks/routeHooks";
import { useEffect, useState } from "react";
import { TOKEN_KEY } from "./constants";
import get from "lodash/get";
import { useRouter } from "next/navigation";
import { CreateUserDtoRole } from "@/apis/generated.schemas";

const ISSERVER = typeof window === "undefined";

export default function LoginPage() {
  usePublicRoute();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { mutate: signIn, data, isPending } = useAuthControllerSignIn();

  useProvidersControllerGetMyProviderDetails({
    query: {
      enabled:
        state?.user?.role === CreateUserDtoRole.PROVIDER &&
        state?.user?.policyAccepted,
      refetchOnMount: false,
    },
    onSuccess: (data: any) => {
      const isProviderDetailsEmpty = Object.values(data || {}).length === 0;
      if (isProviderDetailsEmpty) {
        router.replace("/auth/provider-details");
      }
    },
  } as any);

  useEffect(() => {
    if (data) {
      if (!ISSERVER && localStorage)
        localStorage.setItem(TOKEN_KEY, get(data, "access_token"));
      dispatch({
        type: "SET_USER",
        payload: get(data, "user"),
      });
      if (!data?.user?.policyAccepted) {
        router.replace("/auth/sign-up");
      }
    }
  }, [data, dispatch, router]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be 8+ characters with uppercase, number & special character";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      signIn({
        data: { email, password },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <WhitePaper className="w-full max-w-md">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="form-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-error text-sm" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-error text-sm" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <a href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-hover">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-white hover:bg-primary-hover disabled:opacity-50 rounded-lg transition-colors"
              disabled={!email || !password || isPending}
              isLoading={isPending}
              loadingText="Signing in..."
            >
              Sign in
            </Button>
          </form>

          {/* Footer */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-neutral-600">Or</span>
              </div>
            </div>

            <p className="text-sm text-center text-neutral-600">
              Don&apos;t have an account?{" "}
              <a href="/auth/sign-up" className="text-primary hover:text-primary-hover font-medium">
                Sign up
              </a>
            </p>

            <p className="text-sm text-center text-neutral-600">
              Get the job done with low prices. Connect directly with 100s of crew members in your local area.
            </p>
          </div>
        </div>
      </WhitePaper>
    </div>
  );
}
