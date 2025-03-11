import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import WhitePaper from "../ui/white-paper";

const SignUpSelector: FC = ({ setUserType }) => {
  return (
    <WhitePaper>
      <div
        className="flex flex-row p-4 gap-4"
        onClick={() => setUserType(CreateUserDtoRole.CONSUMER)}
      >
        <div className="flex flex-col gap-16">
          <div className="text-3xl font-bold w-3/5">Sign up as a customer</div>
          <div className="text-lg text-gray-600">
            Get the job done with low prices connect directly with 100s of crew
            member in your local area
          </div>
        </div>
        <ArrowRight size={64} className="h-full self-center" />
      </div>
      <div className="flex justify-center">
        _______________________________________
      </div>
      <div
        className="flex flex-row p-4 gap-4"
        onClick={() => setUserType(CreateUserDtoRole.PROVIDER)}
      >
        <div className="flex flex-col gap-16">
          <div className="text-3xl font-bold w-4/5">
            Sign up to be the part of crew
          </div>
          <div className="text-lg text-gray-600">
            Join the crew and find 100s of job waiting for you at your own
            flexibility
          </div>
        </div>
        <ArrowRight size={64} className="h-full self-center" />
      </div>
    </WhitePaper>
  );
};

export default SignUpSelector;
