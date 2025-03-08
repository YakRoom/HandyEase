import { FC, memo, useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useAuthControllerSignUp } from "@/apis/generated";
import { TOKEN_KEY } from "@/app/auth/login/page";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const EmailStep: FC = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAppContext();
  const router = useRouter();

  const { mutate, data } = useAuthControllerSignUp();

  useEffect(() => {
    if (data?.access_token) {
      localStorage.setItem(TOKEN_KEY, data?.access_token);
      dispatch({
        type: "SET_USER",
        payload: data?.user,
      });
    }
  }, [data]);

  return (
    <div className="bg-gray-50 m-4 rounded-xl p-8 h-full">
      <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
        <div className="text-2xl font-bold">What's your email?</div>
        <Input
          placeholder="Email"
          type="email"
          className="bg-stone-200 h-11"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
        />
        <Input
          placeholder="Password"
          type="email"
          className="bg-stone-200 h-11"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
        />
        <Button
          onClick={() => {
            mutate({
              data: {
                email,
                password,
                role: userType,
              },
            });
          }}
          disabled={!email || !password}
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

export default memo(EmailStep);
