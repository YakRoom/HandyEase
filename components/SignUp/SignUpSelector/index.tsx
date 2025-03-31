import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import WhitePaper from "../../ui/white-paper";

interface SignUpOption {
  role: CreateUserDtoRole;
  title: string;
  description: string;
}

interface SignUpSelectorProps {
  setUserType: (type: CreateUserDtoRole) => void;
}

const options: SignUpOption[] = [
  {
    role: CreateUserDtoRole.CONSUMER,
    title: "Sign up as a customer",
    description:
      "Get the job done with low prices. Connect directly with hundreds of crew members in your local area.",
  },
  {
    role: CreateUserDtoRole.PROVIDER,
    title: "Sign up to be part of the crew",
    description:
      "Join the crew and find hundreds of jobs waiting for you with complete flexibility.",
  },
];

const SignUpSelector: FC<SignUpSelectorProps> = ({ setUserType }) => {
  return (
    <WhitePaper className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Choose your account type
        </h1>
        <p className="text-sm text-neutral-600">
          Select how you want to use our platform
        </p>

        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={option.role}>
              <button
                className="w-full group text-left transition-colors hover:bg-neutral-50 rounded-lg p-6 border border-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setUserType(option.role)}
                aria-label={`Sign up as ${option.role.toLowerCase()}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {option.title}
                    </h2>
                    <p className="text-base text-neutral-600">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={40}
                    className="text-neutral-400 group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </button>
              {index === 0 && (
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-neutral-600">Or</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </WhitePaper>
  );
};

export default SignUpSelector;
