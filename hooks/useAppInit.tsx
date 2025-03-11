"use client";
import {
  useProvidersControllerGetMyProviderDetails,
  useUsersControllerGetUserInfo,
} from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook to use the context
export function useAppInit(state: any, dispatch: any) {
  const hasToken =
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
  const router = useRouter();
  const [initApisLoading, setInitApisLoading] = useState(hasToken);
  const { data } = useUsersControllerGetUserInfo({
    query: {
      enabled: hasToken && !state?.user,
      refetchOnMount: false,
    },
  });
  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails(
    { userId: "" },
    {
      query: {
        enabled:
          state?.user?.role === CreateUserDtoRole.PROVIDER &&
          state?.user?.policyAccepted,
        refetchOnMount: false,
      },
    }
  );
  const isDetailsFilled = !!Object.values(providerDetails || {}).length;

  useEffect(() => {
    if (hasToken && data) {
      dispatch({
        type: "SET_USER",
        payload: data,
      });
      setInitApisLoading(false);
    }
  }, [hasToken, data]);

  useEffect(() => {
    if (state?.user) {
      if (state?.user?.otp) {
        router.replace("/auth/otp-verification");
      } else if (!state?.user?.firstName) {
        router.replace("/auth/add-name");
      } else if (!state?.user?.policyAccepted) {
        router.replace("/auth/policy");
      }
    }
  }, [state.user]);

  useEffect(() => {
    if (state?.user && providerDetails) {
      if (
        state?.user?.role === CreateUserDtoRole.PROVIDER &&
        !isDetailsFilled &&
        state?.user?.policyAccepted
      ) {
        router.replace("/auth/provider-details");
      }
    }
  }, [state.user, providerDetails]);

  return initApisLoading;
}
