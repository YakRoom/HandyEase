"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  path?: string;
  action?: () => void;
}

interface NavProps {
  isOpen: boolean;
  toggleMenu: () => void;
  menuItems: MenuItem[];
  CloseIcon: string;
}

const Nav: React.FC<NavProps> = ({
  isOpen,
  toggleMenu,
  menuItems,
  CloseIcon,
}) => {
  const router = useRouter();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // To prevent SSR mismatch

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth <= 1024);
    };

    // Check screen size and add resize listener
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    setHydrated(true); // Set hydrated after first render

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Prevent SSR mismatch by adding class only after hydration
  const mobileClass = hydrated && isMobileScreen ? "w-full bg-white " : "";

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <div
      className={` ${mobileClass}fixed top-0 left-0 h-full z-10 text-gray-800 overflow-hidden flex items-center justify-center font-bold text-xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      } lg:relative lg:translate-y-0 lg:flex lg:justify-between lg:items-center`}
    >
      {/* Close Icon on Small Screens */}
      {isOpen && hydrated && isMobileScreen && (
        <div className="absolute right-5 top-5">
          <Image
            src={CloseIcon}
            alt="Close"
            height={12}
            width={12}
            className="w-5 h-5 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex flex-col lg:flex-row gap-10 lg:gap-8 px-6 py-6 lg:py-4 lg:px-10 text-2xl">
        {menuItems.map((item, index) => (
          <a
            key={index}
            onClick={() => handleMenuClick(item)}
            className="hover:text-yellow-500 transition cursor-pointer"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
