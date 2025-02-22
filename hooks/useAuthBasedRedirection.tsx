"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuthBasedRedirection(isAuthenticatedRoute: boolean) {
  const router = useRouter();
  const hasToken = localStorage.getItem("token");
  useEffect(() => {
    if (
      (hasToken && isAuthenticatedRoute) ||
      (!hasToken && !isAuthenticatedRoute)
    ) {
      router.replace("/");
    }
  }, [isAuthenticatedRoute, hasToken, router]);
}
