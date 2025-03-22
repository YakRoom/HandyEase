"use client";

import { use } from "react";
import { useProvidersControllerGetProviderDetails } from "@/apis/generated";
import GreyPaper from "@/components/ui/grey-paper";
import ConnectSection from "../components/ConnectProvider";
import Profile from "../components/Profile";
import Reviews from "../components/Reviews";
import Services from "@/components/Services";

const ProviderDetails = ({ params }) => {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const { data } = useProvidersControllerGetProviderDetails({
    userId: id,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <GreyPaper>
      <Profile provider={data} />
      <ConnectSection providerData={data} />
      <Reviews reviews={data?.user?.reviewsReceived} />
      <Services />
    </GreyPaper>
  );
};

export default ProviderDetails;
