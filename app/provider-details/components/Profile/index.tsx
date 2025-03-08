import WhitePaper from "@/components/ui/white-paper";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = (props) => {
  const router = useRouter();
  return (
    <WhitePaper>
      <div>
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src="https://placehold.co/50" // Replace with actual image URL
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">Ashely Brait</h2>
            <div className="flex space-x-4 text-gray-600 text-sm">
              <p>
                <strong>5yrs</strong> Exp
              </p>
              <p>
                <strong>4.6</strong> Rating (18)
              </p>
              <p>
                <strong>36</strong> Jobs
              </p>
            </div>
          </div>
        </div>

        {/* Job Title */}
        <h3 className="text-teal-600 font-semibold mt-3">Cleaner</h3>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-2">
          Hi, I'm Ashley with years of experience in the industry. I can handle
          Deep Clean, Move-out cleaning, Window Cleaning—all sorts of jobs with
          no worries. With years of experience, I have gained immense
          professionalism to tackle difficult tasks with expert knowledge.
        </p>

        {/* Skills */}
        <div className="mt-4">
          <h4 className="text-gray-800 font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Deep Clean",
              "Move out cleaning",
              "Window Cleaning",
              "Mattress Cleaning",
            ].map((skill, index) => (
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
          <span className="text-black">£12.5/hr</span>
          <span className="text-green-500 text-sm ml-2">Negotiable</span>
        </div>
        {props.editProfile && (
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
