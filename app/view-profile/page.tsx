"use client";
import GreyPaper from "@/components/ui/grey-paper";
import Profile from "../provider-details/components/Profile";
import Reviews from "../provider-details/components/Reviews";
import { useProvidersControllerGetMyProviderDetails } from "@/apis/generated";

const ViewProfile = () => {
  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails({
    userId: "",
  });
  console.log(providerDetails);
  return (
    <GreyPaper>
      <Profile editProfile />
      <Reviews />
    </GreyPaper>
  );
};

export default ViewProfile;
