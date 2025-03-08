import { FC, memo, useState } from "react";
import { Input, Button } from "@/components/ui";

const EmailStep: FC = () => {
    const [username, setUsername] = useState("");
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
        <Button>Submit</Button>
        <div className="text-sm mt-16">Get the job done with low prices connect directly with 100s of crew member in your local area</div>
      </div>
    </div>
    )
}

export default memo(EmailStep);