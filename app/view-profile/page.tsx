"use client";
import GreyPaper from "@/components/ui/grey-paper";
import Profile, {
  ConsumerProfile,
} from "../provider-details/components/Profile";
import Reviews from "../provider-details/components/Reviews";
import { useProvidersControllerGetMyProviderDetails } from "@/apis/generated";
import { useAppContext } from "@/context/AppContext";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { useProtectedRoute } from "@/hooks/routeHooks";

const ViewProfile = () => {
  useProtectedRoute();
  const { state } = useAppContext();
  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails({
    query: {
      enabled: state?.user?.role === CreateUserDtoRole.PROVIDER,
    },
  });

  if (!providerDetails && state?.user?.role === CreateUserDtoRole.PROVIDER) {
    return <div>Loading...</div>;
  }

  const reviews = providerDetails
    ? providerDetails?.user?.reviewsReceived
    : state?.user?.reviewsReceived;

  return (
    <GreyPaper>
      {state?.user?.role === CreateUserDtoRole.CONSUMER && <ConsumerProfile />}
      {state?.user?.role === CreateUserDtoRole.PROVIDER && (
        <Profile editProfile provider={providerDetails} />
      )}    
      {state?.user && <Reviews reviews={reviews} />}
    </GreyPaper>
  );
};

export default ViewProfile;
