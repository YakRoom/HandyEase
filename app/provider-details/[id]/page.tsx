"use client";

import { useProvidersControllerGetMyProviderDetails } from "@/apis/generated";
import GreyPaper from "@/components/ui/grey-paper";
import ConnectSection from "../components/ConnectProvider";
import Profile from "../components/Profile";
import Reviews from "../components/Reviews";

const ProviderDetails = ({ params }) => {
  const { id } = params; // Get the dynamic ID from URLL
  const providorDetails = useProvidersControllerGetMyProviderDetails({
    userId: id,
  });

  return (
    <GreyPaper>
      <Profile />
      <ConnectSection />
      <Reviews />
    </GreyPaper>
  );
};

export default ProviderDetails;
