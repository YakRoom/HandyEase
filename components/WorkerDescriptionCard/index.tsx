import { FC } from "react";
import Image from "next/image";

interface WorkerDescriptionCardProps {
  experience: string;
  name: string;
  services: Array<string>;
  description: string;
  photo: string;
  price: number;
  role: string;
  isNegotiable: boolean;
}

const WorkerDescriptionCard: FC<WorkerDescriptionCardProps> = (props) => {
  const {
    experience,
    name,
    services,
    description,
    photo,
    price,
    role,
    isNegotiable,
  } = props;
  return (
    <div className="flex flex-col gap-4 m-2 p-2 bg-white rounded-sm">
      <div className="flex flex-row">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">{name}</span>
          <span>{description}</span>
          <span className="text-lg font-bold">Services</span>
          <span>{services.join(", ")}</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={photo}
            alt="thumbnail"
            height={"100"}
            width={"100"}
            className="rounded-full object-cover  self-center"
          />
          
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <span className="text-lg font-bold text-green-700">{role}</span>
        <div>
        <div className="font-bold text-sm text-end">Exp: {experience}</div>
          {isNegotiable ? (
            <span className="text-sm text-green-400">Negotiable </span>
          ) : (
            <span className="text-sm text-orange-700">Non-Negotiable </span>
          )}
          <span className="font-bold">£{price}/hr</span>
        </div>
      </div>
    </div>
  );
};

export default WorkerDescriptionCard;
