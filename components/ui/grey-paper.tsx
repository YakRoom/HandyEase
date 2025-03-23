"use client";

import { FC, HTMLAttributes } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Header from "@/components/AuthHeader";

interface GreyPaperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  padding?: "default" | "large" | "none";
  showHeader?: boolean;
  className?: string;
}

const paddingVariants = {
  default: "p-4 md:p-6",
  large: "p-6 md:p-8",
  none: "",
};

const GreyPaper: FC<GreyPaperProps> = ({
  children,
  variant = "default",
  padding = "default",
  showHeader = true,
  className,
  ...props
}) => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.includes("auth");

  return (
    <div
      className={cn(
        "bg-neutral-50 rounded-xl flex flex-col",
        variant === "elevated" && "border border-neutral-200 shadow-sm",
        paddingVariants[padding],
        isAuthRoute && "min-h-[calc(100vh-8px)]",
        className
      )}
      {...props}
    >
      {showHeader && <Header />}
      <div className="flex-1 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default GreyPaper;
