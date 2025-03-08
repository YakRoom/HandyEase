"use client";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import SelectorCard from "../SelectorCard";
import { Button } from "../ui/button";
import Image from "next/image";
import thumbnail from "@/public/images/thumbnail.png";
import User from "@/public/images/user.jpeg";
import WorkerDescriptionCard from "../WorkerDescriptionCard";
import {
  useProvidersControllerGetAllProviders,
  useProvidersControllerSearchProviders,
} from "@/apis/generated";
const Home: FC = () => {
  const { mutate, data } = useProvidersControllerSearchProviders();
  console.log(data);
  const [pincode, setPincode] = useState("");
  useEffect(() => {
    mutate({
      data: { locationId: "ChIJpSjxAwbXCDkRhHl5x_m4mzU" },
    });
  }, []);

  const onSearchClick = useCallback(() => {
    console.log("search clicked");
  }, []);

  const sampleUsers = [
    {
      experience: "5yrs",
      name: "John Doe",
      services: ["Plumbing", "Electrician"],
      description:
        "I am a professional plumber and electrician with 5 years of experience.",
      photo: User as unknown as string,
      price: 50,
      role: "Plumber",
      isNegotiable: true,
    },
    {
      experience: "3yrs",
      name: "Jane Doe",
      services: ["Plumbing", "Electrician"],
      description:
        "I am a professional plumber and electrician with 3 years of experience.",
      photo: User as unknown as string,
      price: 40,
      role: "Electrician",
      isNegotiable: false,
    },
  ];

  return (
    <div className="m-4 rounded-lg bg-gray-50">
      <span className="text-4xl font-bold ma">Get it done with Handymate</span>
      <div className="text-xl text-gray-600 mt-4">
        Direct contact, no commission and faster results.
      </div>
      <div className="mt-4 flex flex-col gap-6">
        <Input
          placeholder="Start by typing your postcode"
          type="text"
          className="bg-stone-200 h-11"
          value={pincode}
          onChange={(e) => setPincode(e?.target?.value)}
        />
        <div>Select the service type</div>
        <SelectorCard />
        <Button className="w-full" onClick={onSearchClick}>
          Search
        </Button>
        <Image src={thumbnail} alt="thumbnail" height={"500"} />
        <div>
          <div className="text-2xl font-bold">Explore Nearby</div>
          {sampleUsers.map((user, index) => {
            return <WorkerDescriptionCard key={index} {...user} />;
          })}
          <Button
            className="w-full bg-white text-black"
            onClick={onSearchClick}
          >
            View all
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default memo(Home);
