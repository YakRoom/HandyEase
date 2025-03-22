"use client";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Close from "@/public/images/close.svg";
import Hamburger from "@/public/images/hamBurger.svg";
import { useAppContext } from "@/context/AppContext";

const signUpRoutes = ["/auth/sign-up"];

const loginRoute = ["/auth/login"];

const emptyRightSectionRoutes = [
  "/auth/otp-verification",
  "/auth/add-name",
  "/auth/policy",
  "/auth/provider-details",
];

const selectedClass =
  "font-medium text-[16px] text-[#15151599] bg-[#E1E1E1] top-[14px] right-0 bottom-[14px] left-[12px] rounded-3xl";

export default function Header({}: Readonly<any>) { // eslint-disable-line  @typescript-eslint/no-explicit-any 
  const pathname = usePathname();
  const { state: appState } = useAppContext()
  const isLoginRoute = loginRoute.includes(pathname);
  const isSignUpRoute = signUpRoutes.includes(pathname);
  const showHamBurger =  appState?.isOnboarded ? !(isLoginRoute || isSignUpRoute) : false;
  const showRightCtas = emptyRightSectionRoutes.includes(pathname);
  const showExit = isLoginRoute || isSignUpRoute;
  const router = useRouter();
  return (
    <div className="flex justify-between mb-3 items-center">
      <Image
        src={Logo}
        alt="thumbnail"
        height={"40"}
        width={"40"}
        onClick={() => router.push("/")}
      />
      {!showRightCtas && (
        <div className="bg-[#EEEEEE] rounded-3xl flex">
          {showHamBurger ? (
            <Image
              src={Hamburger}
              alt="facebook"
              height={"40"}
              width={"40"}
              onClick={() => router.push("/view-profile")}
            />
          ) : (
            <>
              <button
                className={`px-4 py-2 font-medium ${
                  isLoginRoute ? selectedClass : "text-gray-500"
                }`}
                onClick={() => router.push("/auth/login")}
              >
                Log In
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  isSignUpRoute ? selectedClass : "text-gray-500"
                }`}
                onClick={() => router.push("/auth/sign-up")}
              >
                Sign Up
              </button>
              {showExit && (
                <Image
                  src={Close}
                  alt="facebook"
                  height={"12"}
                  width={"12"}
                  className="mr-[16px]"
                  onClick={() => router.push("/")}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
