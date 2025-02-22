"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function usePublicRedirection() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/");
    }
  }, []);
}
