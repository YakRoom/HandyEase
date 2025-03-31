// src/components/Loader.js
import React, { useEffect, useState } from "react";
import { MdHandyman } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaPaintRoller } from "react-icons/fa6";
import { FaHandHoldingWater } from "react-icons/fa";


const iconClass="w-12 h-12 text-[#00A699]"
const icons = [
  {
    src: <MdHandyman className={ iconClass} />,
    alt: "Cleaner",
  },
  {
    src: <MdOutlineCleaningServices className={ iconClass} />,
    alt: "Plumber",
  },
  {
    src: <MdElectricBolt className={ iconClass} />,
    alt: "Electrician",
  },
  {
    src: <MdOutlineMiscellaneousServices className={ iconClass} />,
    alt: "Handyman",
  },
  {
    src: <FaPaintRoller className={ iconClass} />,
    alt: "Paint",
  },
  {
    src: <FaHandHoldingWater className={ iconClass} />,
    alt: "Plumber",
  },
];

const Loader = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) =>
        prevIndex === icons.length - 1 ? 0 : prevIndex + 1
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center  bg-white/90 opacity-0.1 z-20">
      {/* Icon Wrapper */}
      <div className="relative w-20 h-20 flex justify-center items-center mb-5">
        {icons.map((icon, index) => (
          <span
            key={index}
            alt={icon.alt}
            className={`absolute transition-all duration-500 ${
              index === currentIconIndex
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 -translate-y-5"
            }`}
          >
            {icon.src}
          </span>
        ))}
      </div>

      {/* Loading Text */}
      <p className="text-lg font-semibold text-[#00A699]">Loading...</p>
      {/* <div className="text-base text-gray-600 font-medium mt-4">
        Finding the best services for you...
      </div> */}
    </div>
  );
};

export default Loader;
