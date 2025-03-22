"use client";
// @ts-nocheck
import { useUsersControllerUpdateUserInfo } from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import WhitePaper from "@/components/ui/white-paper";
import { AppState, useAppContext } from "@/context/AppContext";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { get } from "lodash";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

const TermsConditions: FC = () => {
  useAuthBasedRedirection();
  const router = useRouter();
  const { mutate, data } = useUsersControllerUpdateUserInfo();
  const { dispatch, state } = useAppContext();

  useEffect(() => {
    if (get(data, "firstName")) {
      dispatch({
        type: "SET_USER",
        payload: data as unknown as AppState["user"],
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (
      state?.user?.policyAccepted && // @ts-expect-error need to fix types
      state?.user?.role === CreateUserDtoRole.CONSUMER
    ) {
      router.replace("/");
    }
  }, [state?.user?.policyAccepted, router, state?.user?.role]);

  const [isChecked, setIsChecked] = useState(false);
  return (
    <WhitePaper>
      {" "}
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">
          Accept Handymate&apos;s Terms & Review Privacy Notice
        </h2>
      </div>
      {/* Terms Text */}
      <p className="text-sm text-gray-600 mt-4">
        By selecting &apos;I Agree&apos; below, I have reviewed and agree to the{" "}
        <a href="#" className="text-blue-600 underline">
          Terms of Use
        </a>{" "}
        and acknowledge the{" "}
        <a href="#" className="text-blue-600 underline">
          Privacy Notice
        </a>
        . I am at least 18 years of age.
      </p>
      {/* Checkbox */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="w-5 h-5 border-gray-400"
        />
        <label htmlFor="agree" className="text-sm text-gray-800">
          I agree
        </label>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            mutate({
              data: {
                policyAccepted: true,
              },
            });
          }}
          disabled={!isChecked}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isChecked
              ? "bg-black text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next R
        </button>
      </div>
    </WhitePaper>
  );
};

export default memo(TermsConditions);
