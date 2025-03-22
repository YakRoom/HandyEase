import { FC, memo, useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useAuthControllerSignUp } from "@/apis/generated";
import { TOKEN_KEY } from "@/app/auth/login/constants";
import { useAppContext } from "@/context/AppContext";
import WhitePaper from "@/components/ui/white-paper";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
const isServer = typeof window === "undefined";

const EmailStep: FC<{
  userType: CreateUserDtoRole;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ userType, setStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { dispatch } = useAppContext();

  const { mutate, data, isPending } = useAuthControllerSignUp();
  //  console.log("data",data);

  useEffect(() => {
    if (data?.access_token) {
      if (!isServer && localStorage)
        localStorage.setItem(TOKEN_KEY, data?.access_token);
      dispatch({
        type: "SET_USER",
        payload: data?.user,
      });
      setStep((prev: number) => prev + 1);
    }
  }, [data, dispatch, setStep]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // const emailRegex = /^[^\s@]{8,}@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   newErrors.email = "Invalid email format";
    //   isValid = false;
    // }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, number & special char";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      mutate({
        data: {
          email,
          password,
          role: userType,
        },
      });
    }
  };

  return (
    <WhitePaper>
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">What&apos;s your email?</div>

        <div>
          <Input
            placeholder="Email"
            type="email"
            className="bg-stone-200 h-11"
            value={email}
            onChange={(e) => {
              setEmail(e?.target?.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
          {data && data.code == "EMAIL_EXISTS" && (
            <p className="text-red-500 text-sm mt-2">{data.message}</p>
          )}
        </div>
        {/* <Input
          placeholder="Email"
          type="email"
          className="bg-stone-200 h-11"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
        /> */}
        <div>
          <Input
            placeholder="Password"
            type="password"
            className="bg-stone-200 h-11"
            value={password}
            onChange={(e) => {
              setPassword(e?.target?.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        {/* <Input
          placeholder="Password"
          type="password"
          className="bg-stone-200 h-11"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
        /> */}
        <Button
          onClick={handleSubmit}
          disabled={!email || !password}
          isLoading={isPending}
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
