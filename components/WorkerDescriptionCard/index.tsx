import { FC } from "react";
import Image from "next/image";
import User from "@/public/images/user.jpeg";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface WorkerDescriptionCardProps {
  id: number;
  userId: number;
  serviceTypes: Array<string>;
  providerPicture: string;
  experienceYears: number;
  hourlyRate: string;
  bio: string;
  listingState: string;
  phoneNumber: string;
  showPhoneNumber: boolean;
  radius: number;
  user: User;
  distance: number;
  isNegotiable?: boolean;
}

const WorkerDescriptionCard: FC<WorkerDescriptionCardProps> = (props) => {
  const {
    serviceTypes,
    user,
    userId,
    bio,
    providerPicture,
    experienceYears,
    hourlyRate,
    isNegotiable = true,
    distance,
  } = props;

  const fullName = `${user.firstName} ${user.lastName}`;
  const role = serviceTypes[0] || "Service Provider";
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-white rounded-lg"
      onClick={() => router.push("/provider-details/" + userId)}
    >
      <div className="flex flex-row justify-between gap-[1.5rem]">
        <div className="flex flex-col">
          <span className="text-lg font-bold">{fullName}</span>
          <span>{bio}</span>
          <span className="text-lg font-bold mt-4">Services</span>
          <span>{serviceTypes.join(", ")}</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={providerPicture || User}
            alt="Provider"
            height={80}
            width={80}
            className="rounded-full object-cover self-center mt-[8px]"
            style={{ minWidth: "60px", maxWidth: "60px" }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-end">
        <span className="text-lg font-bold text-green-700">{role}</span>

        <div>
          <div className="font-bold text-sm text-end">
            Exp: {experienceYears} {experienceYears === 1 ? "year" : "years"}
          </div>
          {isNegotiable ? (
            <span className="text-sm text-green-400">Negotiable </span>
          ) : (
            <span className="text-sm text-orange-700">Non-Negotiable </span>
          )}
          <span className="font-bold">£{hourlyRate}/hr</span>
        </div>
      </div>
      <span className="text-sm text-gray-500">{distance + " miles away"}</span>
    </div>
  );
};

export default WorkerDescriptionCard;
