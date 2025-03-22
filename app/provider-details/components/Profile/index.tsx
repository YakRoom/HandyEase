import WhitePaper from "@/components/ui/white-paper";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React from "react";
import Image from 'next/image'; 

const Profile = ({ provider, editProfile }) => {
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
      <div>
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <Image
            src={provider.providerPicture || "https://placehold.co/50"}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {`${provider.user.firstName} ${provider.user.lastName}`}
            </h2>
            <div className="flex space-x-4 text-gray-600 text-sm">
              <p>
                <strong>{provider.experienceYears}yrs</strong> Exp
              </p>
              <p>
                {avgRating !== "N/A" && <strong>{avgRating}</strong>} Rating (
                {reviews.length})
              </p>
              {/* Note: If you have completed jobs count, add it here */}
            </div>
          </div>
        </div>

        {/* Job Title */}

        <h3 className="text-teal-600 font-semibold mt-3">
          {provider.serviceTypes[0]}
        </h3>

        {/* Description */}

        <p className="text-gray-700 text-sm mt-2">{provider.bio}</p>

        {/* Skills */}

        <div className="mt-4">
          <h4 className="text-gray-800 font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.serviceTypes.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}

        <div className="mt-4 text-lg font-semibold">
          <span className="text-black">£{provider.hourlyRate}/hr</span>
          {provider.isNegotiable && (
            <span className="text-green-500 text-sm ml-2">Negotiable</span>
          )}
        </div>

        {editProfile && (
          <button
            onClick={() => router.push("/auth/provider-details")}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg mt-4"
          >
            Edit profile
          </button>
        )}
      </div>
    </WhitePaper>
  );
};

export default Profile;

export const ConsumerProfile = () => {
  const { state } = useAppContext();
  const reviews = state?.user?.reviewsReceived || [];

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <WhitePaper>
      <div>
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <Image
            src={state?.user?.profilePicture || "https://placehold.co/50"}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {`${state?.user?.firstName} ${state?.user?.lastName}`}
            </h2>
            <div className="flex space-x-4 text-gray-600 text-sm">
              <p>
                {avgRating !== "N/A" && <strong>{avgRating}</strong>} Rating (
                {reviews.length})
              </p>
              {/* Note: If you have completed jobs count, add it here */}
            </div>
          </div>
        </div>
      </div>
    </WhitePaper>
  );
};
