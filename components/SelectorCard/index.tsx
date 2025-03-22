import { FC, memo } from "react";
import clsx from "clsx";
import Dropdown from "../ui/dropdown";

const SelectorCard: FC = ({
  checked,
  name,
  description,
  img,
  id,
  handleSelectCategory,
  dropwdownOptions,
  serviceType,
  setSelectedServiceType,
}) => {
  return (
    <div
      className={`w-[50%] h-40 bg-[#D9D9D9] border flex flex-col justify-around p-3  rounded-lg text-sm ${clsx(
        checked ? "bg-[#FFFFFF]" : "bg-[#D9D9D9]"
      )}`}
      onClick={() => handleSelectCategory(id)}
    >
      <span
        className={`rounded-full h-[17px] w-[17px] bg-none ${clsx(
          "border-4",
          checked ? "border-[#00a699]" : "border-white"
        )}`}
      ></span>
      <p className="text-[14px] h-[35px] text-[#151515CC] leading-[100%] w-[125px]">
        {" "}
        {description}
      </p>
      <div className="w-[100%] flex justify-between items-center">
        <p
          className={` text-[16px] text-[#00A699] ${clsx(
            checked ? "text-[#00a699]" : "text-white"
          )} `}
        >
          {name}
        </p>

        <span
          className={`${clsx(
            checked ? "text-[#00a699]" : "text-white w-[28px]"
          )}`}
        >
          {" "}
          {img}
        </span>
      </div>
      <Dropdown
        options={dropwdownOptions}
        selectedOption={serviceType}
        handleSelectOption={(option) => setSelectedServiceType(option.key)}
        isDisabled={!checked}
      />
    </div>
  );
};

export default memo(SelectorCard);
