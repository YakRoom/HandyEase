"use client";
import GreyPaper from "@/components/ui/grey-paper";
import Profile, {
  ConsumerProfile,
} from "../provider-details/components/Profile";
import Reviews from "../provider-details/components/Reviews";
import { useProvidersControllerGetMyProviderDetails } from "@/apis/generated";
import { useAppContext } from "@/context/AppContext";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";

const ViewProfile = () => {
  const { state } = useAppContext();
  //   useAuthBasedRedirection();
  const { data: providerDetails } =
    useProvidersControllerGetMyProviderDetails();

  if (!providerDetails && state?.user?.role === CreateUserDtoRole.PROVIDER) {
    return <div>Loading...</div>;
  }

  const reviews = providerDetails
    ? providerDetails?.user?.reviewsReceived
    : state?.user?.reviewsReceived;

  return (
    <GreyPaper>
      {state?.user?.role === CreateUserDtoRole.CONSUMER ? (
        <ConsumerProfile />
      ) : (
        <Profile editProfile provider={providerDetails} />
      )}
      <Reviews reviews={reviews} />
    </GreyPaper>
  );
};

export default ViewProfile;
