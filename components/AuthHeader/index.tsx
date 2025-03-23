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

export default function Header() {
  const pathname = usePathname();
  const { state: appState } = useAppContext();
  const router = useRouter();

  const isLoginRoute = loginRoute.includes(pathname);
  const isSignUpRoute = signUpRoutes.includes(pathname);
  const showHamBurger = appState?.isOnboarded
    ? !(isLoginRoute || isSignUpRoute)
    : false;
  const showRightCtas = emptyRightSectionRoutes.includes(pathname);
  const showExit = isLoginRoute || isSignUpRoute;

  return (
    <header className="flex items-center justify-between h-16 mb-6">
      <button
        onClick={() => router.push("/")}
        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        aria-label="Go to homepage"
      >
        <Image
          src={Logo}
          alt="Handyman Logo"
          height={40}
          width={40}
          className="w-10 h-10"
        />
      </button>

      {!showRightCtas && (
        <nav className="flex items-center bg-neutral-100 rounded-full">
          {showHamBurger ? (
            <button
              onClick={() => router.push("/view-profile")}
              className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Image
                src={Hamburger}
                alt="Menu"
                height={24}
                width={24}
                className="w-6 h-6"
              />
            </button>
          ) : (
            <div className="flex items-center gap-1 p-1">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isLoginRoute
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => router.push("/auth/login")}
              >
                Log In
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isSignUpRoute
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => router.push("/auth/sign-up")}
              >
                Sign Up
              </button>
              {showExit && (
                <button
                  onClick={() => router.push("/")}
                  className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <Image
                    src={Close}
                    alt="Close"
                    height={16}
                    width={16}
                    className="w-4 h-4"
                  />
                </button>
              )}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
