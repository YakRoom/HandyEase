"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
const isServer = typeof window === "undefined";
export default function useAuthBasedRedirection() {
  const router = useRouter();

  const hasToken = !isServer && localStorage ? localStorage.getItem("token") : "";
  const authRoutes = ["/auth/login", "/auth/sign-up"];
  const pathname = usePathname();
  const isAuthenticatedRoute = authRoutes.includes(pathname);
  useEffect(() => {
    if (
      (hasToken && isAuthenticatedRoute) ||
      (!hasToken && !isAuthenticatedRoute)
    ) {
      // console.log(window.history);
      // if (window.history.length > 1) {
      //   router.back(); // Go to the previous page if possible
      // } else {
      router.replace("/"); // Otherwise, go to home
      // }
    }
  }, [isAuthenticatedRoute, hasToken, router]);
}
