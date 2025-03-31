import { FC, memo, useEffect, useState } from "react";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui";
import { useAppContext } from "@/context/AppContext";
import { useAuthControllerVerifyOtp } from "@/apis/generated";
import { ArrowRight } from "lucide-react";
import WhitePaper from "@/components/ui/white-paper";

interface OtpStepProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const OtpStep: FC<OtpStepProps> = ({ setStep }) => {
  const { state, dispatch } = useAppContext();
  const [otp, setOtp] = useState<number>();
  const { mutate, data, isPending } = useAuthControllerVerifyOtp();

  useEffect(() => {
    if (data?.user) {
      dispatch({
        type: "SET_USER",
        payload: data.user,
      });
    }
  }, [data, dispatch]);

  const handleSubmit = () => {
    if (otp && otp >= 1000) {
      mutate({
        data: { otp },
        onSuccess: () => setStep((prev: number) => prev + 1),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <WhitePaper className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Verify your email
          </h1>
          <p className="text-sm text-neutral-600">
            Enter the 4-digit code sent to:
            <span className="block mt-1 font-medium text-neutral-900">
              {state?.user?.email}
            </span>
          </p>
        </div>

        <div
          className="space-y-4"
          role="group"
          aria-label="Enter verification code"
        >
          <InputOTP
            maxLength={4}
            onChange={(value) => setOtp(parseInt(value, 10))}
            onKeyDown={handleKeyDown}
          >
            <InputOTPGroup className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-14 h-14 text-lg font-medium border border-neutral-200 rounded-lg bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <p className="text-sm text-neutral-600 flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-400"
            >
              <path
                d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM8.66667 11.3333H7.33333V7.33334H8.66667V11.3333ZM8.66667 6.00001H7.33333V4.66668H8.66667V6.00001Z"
                fill="currentColor"
              />
            </svg>
            Check your inbox and spam folders
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!otp || otp < 1000 || isPending}
          className="w-full h-12 text-white  disabled:opacity-50 rounded-lg transition-colors"
          isLoading={isPending}
          loadingText="Verifying..."
        >
          <span className="flex items-center gap-2">
            Continue
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </Button>

        <div className="text-sm text-center text-neutral-600">
          Get the job done with low prices. Connect directly with hundreds of
          crew members in your local area.
        </div>
      </div>
    </WhitePaper>
  );
};

export default memo(OtpStep);
