"use client";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Close from "@/public/images/close.svg";
import Hamburger from "@/public/images/hamBurger.svg";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Modal from "../ui/logoutModal";
import Nav from "../ui/nav";

const signUpRoutes = ["/auth/sign-up"];
const loginRoute = ["/auth/login"];
const emptyRightSectionRoutes = [
  "/auth/otp-verification",
  "/auth/add-name",
  "/auth/policy",
  "/auth/provider-details",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { label: "Profile", path: "/view-profile" },
    { label: "Home", path: "/" },
    { label: "Messages", path: "#" },
    { label: "Settings", path: "#" },
    {
      label: "Log out",
      action: () =>setShowModal(true)
    },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const pathname = usePathname();
  const router = useRouter();
  const { state: appState, dispatch } = useAppContext();
  // const firstName = state.state.user?.firstName;
  const firstName = appState.user?.firstName;

  const isLoginRoute = loginRoute.includes(pathname);
  const isSignUpRoute = signUpRoutes.includes(pathname);
  const showHamBurger = appState?.isOnboarded
    ? !(isLoginRoute || isSignUpRoute)
    : false;
  const showRightCtas = emptyRightSectionRoutes.includes(pathname);
  const showExit = isLoginRoute || isSignUpRoute;

  // const handleLogoutClick = () => {
  //   setShowModal(true);
  // };

  console.log("isopn", isOpen);

  // const handleConfirmLogout = () => {
  //   localStorage.removeItem("token");
  //   dispatch({ type: "LOGOUT" })
  //   setIsOpen(false);
  //   setShowModal(false);
  //   router.push("/");
  // };

  // const handleCancelLogout = () => {
  //   setShowModal(false);
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setIsOpen(false);
    router.push("/");
  };
  //  adeeb111@gmail.com
  // Adeeb111@

 
  return (
    <header className="flex items-center justify-between h-16 mb-6 ">
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

      <Nav
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        menuItems={menuItems}
        CloseIcon={Close}
      />

      {!showRightCtas && (
        <nav className="flex items-center bg-neutral-100 rounded-full">
          {showHamBurger ? (
            <div className="flex items-center h-full">
              <button className="bg-black rounded-[160px] text-[16px] font-[500] text-white px-4 py-2  h-full">
                {firstName}
              </button>
              <button
                // onClick={() => router.push("/view-profile")}
                className="p-2 hover:bg-neutral-200 rounded-full transition-colors w-10"
                aria-label="Open menu"
                onClick={toggleMenu}
              >
                <Image
                  src={Hamburger}
                  alt="Menu"
                  height={34}
                  width={34}
                  className="w-full h-full"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 p-1">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isLoginRoute
                    ? "btn-primary text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
                onClick={() => router.push("/auth/login")}
              >
                Log In
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isSignUpRoute
                    ? "btn-primary text-neutral-900"
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
      {/* <div
        className={`${isOpen ? "block":"hidden"} fixed top-0 left-0 h-full z-10 w-full text-gray-800 flex items-center justify-center font-bold text-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } lg:relative lg:translate-y-0 lg:flex lg:justify-between lg:items-center`}
      >
        {isOpen && <div className="absolute right-5 top-5">
          <Image
            // src={Close}
            alt="Close"
            height={12}
            width={12}
            className="w-5 h-5"
            onClick={toggleMenu}
          />
        </div>}
        <nav className="flex flex-col lg:flex-row gap-10 lg:gap-8 px-6 py-6 lg:py-4 lg:px-10 text-2xl">
          <a
            onClick={() => router.push("/view-profile")}
            className="hover:text-yellow-500 transition"
          >
            Profile
          </a>
          <a
            onClick={() => router.push("/")}
            className="hover:text-yellow-500 transition"
          >
            Home
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            Messages
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            Settings
          </a>
          <a
            onClick={handleLogoutClick}
            className="hover:text-yellow-500 transition"
          >
            Log out
          </a>
        </nav>
      </div> */}
      {/* {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-lg font-semibold mb-4">
                      Confirm Logout
                    </h2>
                    <p className="mb-4">Are you sure you want to log out?</p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={handleCancelLogout}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmLogout}
                        className="btn-primary btn-primary text-white px-4 py-2 rounded-lg"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
      {/* <LogOutModal isModal={showModal} setShowModal={setShowModal} setIsOpen={setIsOpen} /> */}

      <Modal
        isModal={showModal}
        setShowModal={setShowModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
      />
    </header>
  );
}
