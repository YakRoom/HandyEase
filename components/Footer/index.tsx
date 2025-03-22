"use client";
import Link from "next/link";
import { FC, memo } from "react";
import Facebook from "@/public/images/facebook.svg";
import Twitter from "@/public/images/twitter.svg";
import Linkedin from "@/public/images/linkedin.svg";
import Image from "next/image";
// import Service from "@/public/images/service.svg";
// import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const noFooterRoutes = [
  "/edit-profile",
  "/auth/login",
  "/auth/sign-up",
  "/auth/otp-verification",
  "/auth/add-name",
  "/auth/policy",
  "/auth/provider-details",
  "/auth/sign-up/credentials",
];

const Footer: FC = () => {
  const pathname = usePathname();

  if (noFooterRoutes.includes(pathname)) {
    return null;
  }
  return (
      <div className="bg-black h-max w-full text-white p-4 flex flex-col gap-4 pt-10">
        <div className="font-bold">Handymate</div>
        <Link href={""}>Visit Help Center</Link>
        <Link href={""}>Learn more about company&apos;s mission</Link>
        <div className="font-bold mt-8">Company</div>
        <Link href={""}>Our offerings</Link>
        <Link href={""}>Newsroom</Link>
        <Link href={""}>Blogs</Link>
        <Link href={""}>Questions</Link>
        <div className="font-bold mt-8">Product</div>
        <Link href={""}>Customer</Link>
        <Link href={""}>Handyman</Link>
        <Link href={""}>Cleaner</Link>
        <Link href={""}>Unicorn</Link>
        <div className="flex flex-row justify-around my-12">
          <Image src={Facebook} alt="facebook" height={"32"} width={"32"} />
          <Image src={Twitter} alt="facebook" height={"32"} width={"32"} />
          <Image src={Linkedin} alt="facebook" height={"32"} width={"32"} />
        </div>
        <div className="text-gray-400">© 2025 Handyman</div>
        <div className="flex flex-row gap-4 text-gray-400">
          <Link href={""}>Privacy</Link>
          <Link href={""}>Accessibility</Link>
          <Link href={""}>Terms</Link>
        </div>
      </div>
  );
};

export default memo(Footer);
