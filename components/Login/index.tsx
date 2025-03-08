import { FC, memo, useState } from "react";
import { Input, Button } from "@/components/ui";

const LoginCredentails: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="bg-gray-50 m-4 rounded-xl p-8 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
        <div className="text-2xl font-bold">
          What's your phone number or email?
        </div>
        <Input
          placeholder="Email or phone number"
          type="email"
          className="bg-stone-200 h-11"
          value={username}
          onChange={(e) => setUsername(e?.target?.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          className="bg-stone-200 h-11"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
        />
        <Button variant="link" className="text-sm underline">Forgot Password?</Button>
        <Button>Submit</Button>
        <div className="text-sm mt-16">Get the job done with low prices connect directly with 100s of crew member in your local area</div>
      </div>
    </div>
  );
};

export default memo(LoginCredentails);
