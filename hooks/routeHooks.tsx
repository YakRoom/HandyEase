"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CreateUserDtoRole } from "@/apis/generated.schemas";

// Hook for Provider only specific routes
export function useProviderRoute() {
  const router = useRouter();
  const { state } = useAppContext();
  useEffect(() => {
    if (
      state?.user?.role !== CreateUserDtoRole.PROVIDER ||
      !state?.user?.policyAccepted
    ) {
      router.replace("/");
    }
  }, [
    state.isOnboarded,
    router,
    state?.user?.role,
    state?.user?.policyAccepted,
  ]);
}

// Hook for public only routes
export function usePublicRoute() {
  const router = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    if (state?.isOnboarded) {
      router.replace("/");
    }
  }, [state?.isOnboarded, router]);
}

// Hook for protected routes (provider and consumer)
export function useProtectedRoute() {
  const router = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    if (!state?.isOnboarded) {
      router.replace("/");
    }
  }, [state?.isOnboarded, router]);
}
