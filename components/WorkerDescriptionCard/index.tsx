import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import defaultUser from "@/public/images/user.jpeg";
import { cn } from "@/lib/utils";

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface WorkerDescriptionCardProps {
  id: number;
  userId: number;
  serviceTypes: string[];
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
  className?: string;
}

const WorkerDescriptionCard: FC<WorkerDescriptionCardProps> = ({
  serviceTypes,
  user,
  userId,
  bio,
  providerPicture,
  experienceYears,
  hourlyRate,
  isNegotiable = true,
  distance,
  className,
}) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Link
      href={`/provider-details/${userId}`}
      className={cn(
        "block p-5 bg-white rounded-xl border border-neutral-200",
        "hover:shadow-md transition-shadow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <h2 className="text-lg font-semibold text-neutral-900 truncate">
              {fullName}
            </h2>
            <p className="text-sm text-neutral-600 line-clamp-2">{bio}</p>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={providerPicture || defaultUser}
              alt={`Profile picture of ${fullName}`}
              height={80}
              width={80}
              className="rounded-full object-cover h-[60px] w-[60px]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-neutral-900">Services</h3>
            <p className="text-sm text-neutral-600">
              {serviceTypes.join(", ")}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4" />
              <span>{distance} miles away</span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-sm text-neutral-600">
                <Clock className="h-4 w-4" />
                <span>
                  {experienceYears} {experienceYears === 1 ? "year" : "years"}{" "}
                  exp
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    isNegotiable
                      ? "bg-primary/10 text-primary"
                      : "bg-orange-100 text-orange-700"
                  )}
                >
                  {isNegotiable ? "Negotiable" : "Non-Negotiable"}
                </span>
                <div className="flex items-center gap-1 text-sm font-medium text-neutral-900">
                  E{hourlyRate}/hr
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkerDescriptionCard;
