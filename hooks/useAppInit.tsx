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
  const [initApisLoading, setInitApisLoading] = useState(hasToken);
  const { data } = useUsersControllerGetUserInfo({
    query: {
      enabled: hasToken && !state?.user,
      refetchOnMount: false,
    },
  });

  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails({
    query: {
      enabled:
        state?.user?.role === CreateUserDtoRole.PROVIDER &&
        state?.user?.policyAccepted,
      refetchOnMount: false,
    },
  });

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
    const { user } = state;
    if (state?.user) {
      if (user?.role === CreateUserDtoRole.CONSUMER && user?.policyAccepted) {
        dispatch({
          type: "SET_ONBOARDED",
          payload: true,
        });
      }
    }
  }, [state.user]);

  useEffect(() => {
    const isDetailsFilled = !!Object.values(providerDetails || {}).length;
    if (state?.user && providerDetails) {
      if (state?.user?.role === CreateUserDtoRole.PROVIDER && isDetailsFilled) {
        dispatch({
          type: "SET_ONBOARDED",
          payload: true,
        });
      }
    }
  }, [state.user, providerDetails]);

  return initApisLoading;
}
