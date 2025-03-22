"use client";
import Header from "../AuthHeader";
import { usePathname } from "next/navigation";
const GreyPaper = ({ children, ...props }) => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.includes("auth");
  return (
    <div
      className={`border-1 rounded-3xl bg-gray-50 shadow-md p-4 m-1 flex flex-col  gap-4 ${
        isAuthRoute ? "min-h-[calc(100vh-8px)]" : ""
      }`}
      {...props}
    >
      <Header />
      {children}
    </div>
  );
};

export default GreyPaper;
