"use client";

import { FC, memo, useEffect, useState } from "react";
import { useUsersControllerUpdateUserInfo } from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import WhitePaper from "@/components/ui/white-paper";
import { Button } from "@/components/ui";
import Link from "next/link";

const TermsConditions: FC = () => {
  const router = useRouter();
  const { mutate, data, isPending } = useUsersControllerUpdateUserInfo();
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    if (data?.firstName) {
      dispatch({
        type: "SET_USER",
        payload: data,
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (
      state?.user?.policyAccepted &&
      state?.user?.role === CreateUserDtoRole.CONSUMER
    ) {
      router.replace("/");
    }
  }, [state?.user?.policyAccepted, router, state?.user?.role]);

  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (isChecked) {
      mutate({
        data: {
          policyAccepted: true,
        },
      });
    }
  };

  return (
    <WhitePaper className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Terms & Privacy
          </h1>
          <p className="text-sm text-neutral-600">
            Please review and accept our terms to continue
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-neutral-50 rounded-lg text-sm text-neutral-700 leading-relaxed">
            By selecting &apos;I Agree&apos; below, I confirm that:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                I have reviewed and agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:text-primary-hover underline transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                I acknowledge the{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary-hover underline transition-colors"
                >
                  Privacy Notice
                </Link>
              </li>
              <li>I am at least 18 years of age</li>
            </ul>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-5 w-5 rounded border-neutral-300 text-primary focus:ring-primary transition-colors cursor-pointer"
              aria-describedby="terms-description"
            />
            <label
              htmlFor="agree"
              className="text-sm text-neutral-700 select-none cursor-pointer"
            >
              I agree to the terms and conditions
            </label>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isChecked || isPending}
            isLoading={isPending}
            loadingText="Processing..."
            className="w-full h-12 btn-primary text-white  disabled:opacity-50 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              Continue
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Button>
        </div>

        <div className="text-xs text-center text-neutral-500">
          By continuing, you agree to let Handymate collect and process your
          personal data. See our{" "}
          <Link
            href="/privacy"
            className="text-primary hover:text-primary-hover underline transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          for more details.
        </div>
      </div>
    </WhitePaper>
  );
};

export default memo(TermsConditions);
