import { FC, memo, useState } from "react";
import {
  Input,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui";

const OtpStep: FC = () => {
  const [username, setUsername] = useState("");
  const [email] = useState("ayaan2103@gmail.com");
  return (
    <div className="bg-gray-50 m-4 rounded-xl p-8 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
        <div className="text-2xl font-bold">
          Enter the 4-digit code sent to you at:
        </div>
        <div className="text-lg font-bold">{email}</div>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button>Submit</Button>
        <div className="text-sm mt-16">
          Get the job done with low prices connect directly with 100s of crew
          member in your local area
        </div>
      </div>
    </div>
  );
};

export default memo(OtpStep);
