"use client";
/* eslint-disable */
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  options,
  selectedOption,
  handleSelectOption,
  isDisabled,
}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (service: any) => {
    handleSelectOption(service);
    setIsOpen(false);
  };

  const label =
    options?.find((option) => option.key === selectedOption)?.label ||
    "Select type";

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center bg-[#F4F4F4] font-bold h-[25px] justify-between relative outline-none"
          disabled={isDisabled}
        >
          {label}
          <ChevronDown
            className={`absolute right-3 top-1 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        {options.length > 0 ? (
          <>
            {/* <h3 className="text-sm font-bold px-2">{serviceType}</h3> */}
            {options.map((service) => (
              <DropdownMenuItem
                key={service.key}
                onClick={() => handleSelect(service)}
              >
                {service.label}
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          <p className="text-gray-500 p-2">No services available</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
