import { FC, memo } from "react";
import Dropdown from "../ui/dropdown";
import { Check } from "lucide-react";

interface ServiceOption {
  key: string;
  value: string;
}

interface SelectorCardProps {
  checked: boolean;
  name: string;
  description: string;
  img: JSX.Element;
  id: string;
  handleSelectCategory: (id: string) => void;
  dropwdownOptions: ServiceOption[];
  serviceType: string;
  setSelectedServiceType: (key: string) => void;
  className?: string;
}

const SelectorCard: FC<SelectorCardProps> = ({
  checked,
  viewAll,
  name,
  description,
  img,
  id,
  handleSelectCategory,
  dropwdownOptions,
  serviceType,
  setSelectedServiceType,
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col p-4 rounded-xl transition-colors ${
        checked
          ? "bg-white shadow-sm border border-primary/20"
          : "bg-neutral-100 hover:bg-neutral-50"
      } ${className}`}
      onClick={() => handleSelectCategory(id)}
      role="radio"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSelectCategory(id);
        }
      }}
    >
      {/* <div
        className={`h-6 w-6 rounded-full border-2 transition-colors mb-3 ${
          checked
            ? "border-primary bg-primary/10"
            : "border-neutral-300 bg-white"
        }`}
      >
        {checked && (
          <Check className="h-4 w-4 text-primary m-0.5" aria-hidden="true" />
        )}
      </div> */}
     
      <div className="space-y-4 flex-1">
      { !viewAll && 
        (  <>
             <div
        className={`h-6 w-6 rounded-full border-2 transition-colors mb-3 ${
          checked
            ? "border-primary bg-primary/10"
            : "border-neutral-300 bg-white"
        }`}
      >
        {checked && (
          <Check className="h-4 w-4 text-primary m-0.5" aria-hidden="true" />
        )}
      </div>
            
            <div className="space-y-1">
          <h3
            className={`text-base font-medium transition-colors ${
              checked ? "text-primary" : "text-neutral-600"
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`transition-colors ${
              checked ? "text-primary" : "text-neutral-400"
            }`}
          >
            {img}
          </div>
        </div>
          
        </>)
      }
        {/* <div className="space-y-1">
          <h3
            className={`text-base font-medium transition-colors ${
              checked ? "text-primary" : "text-neutral-600"
            }`}
          >
            {name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`transition-colors ${
              checked ? "text-primary" : "text-neutral-400"
            }`}
          >
            {img}
          </div>
        </div> */}

        <div className="pt-2">
          <Dropdown
            options={dropwdownOptions}
            selectedOption={serviceType}
            handleSelectOption={(option) => setSelectedServiceType(option.key)}
            isDisabled={!checked}
            className={checked ? "opacity-100" : "opacity-50"}
            aria-label={`Select ${name.toLowerCase()} service type`}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(SelectorCard);
