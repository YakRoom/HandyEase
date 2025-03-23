"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  key: string;
  label: string;
  value?: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption?: string;
  handleSelectOption: (option: Option) => void;
  isDisabled?: boolean;
  className?: string;
  placeholder?: string;
  "aria-label"?: string;
}

const Dropdown: FC<DropdownProps> = ({
  options,
  selectedOption,
  handleSelectOption,
  isDisabled = false,
  className,
  placeholder = "Select type",
  "aria-label": ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    handleSelectOption(option);
    setIsOpen(false);
  };

  const selectedItem = options?.find((option) => option.key === selectedOption);
  const label = selectedItem?.label || placeholder;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-9 px-3 flex items-center justify-between gap-2 text-sm font-medium",
            "bg-white hover:bg-neutral-50 focus-visible:ring-primary",
            "disabled:opacity-50 disabled:pointer-events-none disabled:bg-neutral-100",
            isDisabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={isDisabled}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="truncate">{label}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-neutral-500 transition-transform",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] p-1"
        align="start"
      >
        {options.length > 0 ? (
          options.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => handleSelect(option)}
              className={cn(
                "flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer",
                "focus:bg-neutral-100 focus:text-neutral-900",
                "data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900",
                selectedOption === option.key && "bg-neutral-100 text-neutral-900 font-medium"
              )}
              role="option"
              aria-selected={selectedOption === option.key}
            >
              {option.label}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="py-2 px-3 text-sm text-neutral-500 text-center" role="status">
            No options available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
