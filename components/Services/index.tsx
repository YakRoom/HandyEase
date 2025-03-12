"use client";
import { FC, memo } from "react";
import Image from "next/image";
import Service from "@/public/images/service.svg";
import { Button } from "../ui/button";

const Services: FC = () => {
  return (
    <div className="m-6">
      <div className="text-2xl font-bold">Services</div>
      <div className="mt-4">
        {["Plumbing", "Electrician", "Carpenter", "Painter"].map(
          (service, index) => {
            return (
              <div
                className="flex flex-row p-6 mb-4 bg-gray-50 rounded-2xl gap-4 "
                key={index}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-bold">{service}</span>
                  <div>Deep Clean, Move ot cleaning, Window Cleaning </div>
                  <Button
                    className="bg-white text-black font-bold w-max rounded-lg"
                    // size="lg"
                  >
                    Details
                  </Button>
                </div>
                <Image
                  src={Service}
                  alt="thumbnail"
                  height={"100"}
                  width={"100"}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default memo(Services);
