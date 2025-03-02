"use client";
import { FC, memo, useCallback, useState } from "react";
import { Input } from "../ui/input";
import SelectorCard from "../SelectorCard";
import { Button } from "../ui/button";
import Image from "next/image";
import thumbnail from "@/public/images/thumbnail.png";
import User from "@/public/images/user.jpeg";
import Service from "@/public/images/service.svg";
import WorkerDescriptionCard from "../WorkerDescriptionCard";
import Footer from "../Footer";

const Home: FC = () => {
  const [pincode, setPincode] = useState("");

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
    <>
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
        <Button className="w-full bg-white text-black" onClick={onSearchClick}>
          View all
        </Button>
        </div>
      </div>
      <div>
    </div>

    </div>
    <div className="m-6">
    <div className="text-2xl font-bold">Services</div>
    <div className="mt-4">
      {["Plumbing", "Electrician", "Carpenter", "Painter"].map((service, index) => {
        return (
          <div className="flex flex-row p-3 mb-4 bg-gray-50 rounded-2xl gap-4" key={index}>
            <div>
            <span className="font-bold">{service}</span>
            <div>Deep Clean, Move ot cleaning, Window Cleaning </div>
            <Button className="bg-white text-black mt-4 font-bold" size='lg'>Details</Button>
            </div>
            <Image src={Service} alt="thumbnail" height={"100"} width={"100"} />
          </div>
        );
      })}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Home);
