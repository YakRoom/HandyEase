import { FC, memo, useEffect, useState } from "react";
import {
  // Input,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  // InputOTPSeparator,
} from "@/components/ui";
import { useAppContext } from "@/context/AppContext";
import { useAuthControllerVerifyOtp } from "@/apis/generated";
import { ArrowRight } from "lucide-react";

const OtpStep: FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const { state } = useAppContext();
  const [otp, setOtp] = useState<number>();
  const { mutate, data } = useAuthControllerVerifyOtp();

  const { dispatch } = useAppContext();
  useEffect(() => {
    if (data?.user) {
      dispatch({
        type: "SET_USER",
        payload: data?.user,
      });
    }
  }, [data, dispatch]);
  // console.log(data);

  const otpSlotClasses = "bg-[#F4F4F4] w-[45] h-[45] rounded-[6px]";
  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
      <div className="text-2xl font-bold">
        Enter the 4-digit code sent to you at:
      </div>
      <div className="text-lg font-bold">{state?.user?.email}</div>
      <InputOTP maxLength={4} onChange={(e) => setOtp(parseInt(e, 10))}>
        <InputOTPGroup className="flex gap-6">
          <InputOTPSlot className={otpSlotClasses} index={0} />
          <InputOTPSlot className={otpSlotClasses} index={1} />
          <InputOTPSlot className={otpSlotClasses} index={2} />
          <InputOTPSlot className={otpSlotClasses} index={3} />
        </InputOTPGroup>
      </InputOTP>

      <p className="text-[16px] font-medium text-[#151515CC]">
        Tip: Be sure to check your inbox and spam folders
      </p>
      <Button
        disabled={!otp || otp < 999}
        onClick={() => {
          mutate({ data: { otp } });
          setStep((prev: number) => prev + 1);
        }}
        variant="outline"
        className="w-20 bg-gray-50 font-bold rounded-3xl text-xs"
      >
        Next
        <ArrowRight />
      </Button>
      <div className="text-sm mt-16">
        Get the job done with low prices connect directly with 100s of crew
        member in your local area
      </div>
    </div>
  );
};

export default memo(OtpStep);
