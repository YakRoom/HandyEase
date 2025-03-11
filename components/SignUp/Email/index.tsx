import { FC, memo, useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useAuthControllerSignUp } from "@/apis/generated";
import { TOKEN_KEY } from "@/app/auth/login/page";
import { useAppContext } from "@/context/AppContext";
import WhitePaper from "@/components/ui/white-paper";

const EmailStep: FC = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAppContext();

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
    <WhitePaper>
      <div className="flex flex-col gap-4">
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
    </WhitePaper>
  );
};

export default memo(EmailStep);
