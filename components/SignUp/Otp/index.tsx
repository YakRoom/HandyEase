import { FC, memo, useEffect, useState } from "react";
import {
  Input,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui";
import { useAppContext } from "@/context/AppContext";
import { useAuthControllerVerifyOtp } from "@/apis/generated";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useRouter } from "next/navigation";

const OtpStep: FC = () => {
  const { state } = useAppContext();
  const [otp, setOtp] = useState<number>();
  const { mutate, data } = useAuthControllerVerifyOtp();
  const router = useRouter();
  const { dispatch } = useAppContext();
  useAuthBasedRedirection();
  useEffect(() => {
    if (data?.user) {
      dispatch({
        type: "SET_USER",
        payload: data?.user,
      });
    }
  }, [data]);
  // console.log(data);
  return (
    <div className="bg-gray-50 m-4 rounded-xl p-8 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
        <div className="text-2xl font-bold">
          Enter the 4-digit code sent to you at:
        </div>
        <div className="text-lg font-bold">{state?.user?.email}</div>
        <InputOTP maxLength={4} onChange={(e) => setOtp(parseInt(e, 10))}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          disabled={!otp || otp < 999}
          onClick={() => {
            mutate({ data: { otp } });
          }}
        >
          Submit
        </Button>
        <div className="text-sm mt-16">
          Get the job done with low prices connect directly with 100s of crew
          member in your local area
        </div>
      </div>
    </div>
  );
};

export default memo(OtpStep);
