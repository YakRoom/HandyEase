import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui";
import WhitePaper from "@/components/ui/white-paper";
import { Star, Clock, Briefcase, Edit } from "lucide-react";
import Logo from "@/public/images/logo.png";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import Modal from "@/components/ui/logoutModal";

interface ProfileProps {
  provider?: {
    user: {
      firstName: string;
      lastName: string;
      reviewsReceived: Array<{ rating: number }>;
      profilePicture?: string;
    };
    providerPicture?: string;
    experienceYears: number;
    serviceTypes: string[];
    bio: string;
    hourlyRate: number;
    isNegotiable: boolean;
  };
  editProfile?: boolean;
}

const StarRating: FC<{ rating: number | string }> = ({ rating }) => {
  if (rating === "N/A") return null;
  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="font-medium">{rating}</span>
    </div>
  );
};

const Profile: FC<ProfileProps> = ({ provider, editProfile }) => {
  const router = useRouter();
  const reviews = provider?.user?.reviewsReceived || [];

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <WhitePaper>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex gap-4">
          <Image
            src={provider.providerPicture || Logo}
            alt={`${provider.user.firstName}'s profile picture`}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-100"
            width={64}
            height={64}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-neutral-900 truncate">
              {`${provider.user.firstName} ${provider.user.lastName}`}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  <strong>{provider.experienceYears}yrs</strong> Experience
                </span>
              </div>
              {avgRating !== "N/A" && (
                <div className="flex items-center gap-1.5">
                  <StarRating rating={avgRating} />
                  <span className="text-neutral-500">({reviews.length})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Type */}
        <div>
          <h3 className="inline-flex items-center gap-2 px-3 py-1 text-primary font-medium bg-primary/5 rounded-full">
            <Briefcase className="w-4 h-4" />
            {provider.serviceTypes[0]}
          </h3>
        </div>

        {/* Bio */}
        <div>
          <p className="text-neutral-600 leading-relaxed">{provider.bio}</p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-medium text-neutral-900 mb-3">
            Skills & Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {provider.serviceTypes.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Negotiation */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-neutral-900">
              £{provider.hourlyRate}/hr
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${provider.isNegotiable ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className="font-medium text-neutral-700">
              {provider.isNegotiable ? 'Open to rate negotiation' : 'Fixed rate'}
            </span>
            <div className={`px-2 py-0.5 rounded-full text-xs ${
              provider.isNegotiable 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-rose-50 text-rose-600'
            }`}>
              {provider.isNegotiable ? 'Negotiable' : 'Non-negotiable'}
            </div>
          </div>
        </div>

        {editProfile && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push("/auth/provider-details")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      
      </div>
    </WhitePaper>
  );
};

export const ConsumerProfile: FC = () => {
  const { state,dispatch } = useAppContext();
  const reviews = state?.user?.reviewsReceived || [];

  const [showModal, setShowModal] = useState(false)
  const router = useRouter();

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";
      useBodyScrollLock(showModal);

  
      const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        router.push("/");
      };
  return (
    <WhitePaper>
      <div className="space-y-4">
        {/* Profile Header */}
        <div className="flex gap-4">
          <Image
            src={state?.user?.profilePicture || Logo}
            alt="Profile picture"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-100"
            width={64}
            height={64}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-neutral-900 truncate">
              {`${state?.user?.firstName} ${state?.user?.lastName}`}
            </h2>
            {avgRating !== "N/A" && (
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating rating={avgRating} />
                <span className="text-sm text-neutral-500">
                  ({reviews.length} reviews)
                </span>
              </div>
            )}
          </div>
        </div>
        <Button onClick={()=>setShowModal(true)} variant="secondary" className="w-full text-red-600">Log Out</Button>
        <Modal
        isModal={showModal}
        setShowModal={setShowModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
      />
      </div>
  
    </WhitePaper>
  );
};

export default Profile;
