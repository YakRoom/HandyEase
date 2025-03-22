"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
export default function useAuthBasedRedirection() {
  const router = useRouter();
  const { state } = useAppContext();
  const authRoutes = ["/auth/login", "/auth/sign-up"];
  const pathname = usePathname();
  const isAuthenticatedRoute = authRoutes.includes(pathname);
  console.log(state?.isOnboarded);
  useEffect(() => {
    if (
      (state?.isOnboarded && isAuthenticatedRoute) ||
      (!state?.isOnboarded && !isAuthenticatedRoute)
    ) {
      // console.log(window.history);
      // if (window.history.length > 1) {
      //   router.back(); // Go to the previous page if possible
      // } else {
      router.replace("/"); // Otherwise, go to home
      // }
    }
  }, [isAuthenticatedRoute, state?.isOnboarded, router]);
}

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

export function usePublicRoute() {
  const router = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    if (state?.isOnboarded) {
      router.replace("/");
    }
  }, [state?.isOnboarded, router]);
}
