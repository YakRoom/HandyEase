import { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface WhitePaperProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const WhitePaper: FC<WhitePaperProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm p-4 md:p-6 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default WhitePaper;
