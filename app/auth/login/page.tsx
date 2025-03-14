"use client";
import { useAuthControllerSignIn } from "@/apis/generated";
// import { useAuthControllerSignIn } from "@/apis/generated";
import { Button, Input } from "@/components/ui";
import WhitePaper from "@/components/ui/white-paper";
import { useAppContext } from "@/context/AppContext";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useEffect, useState } from "react";
import { TOKEN_KEY } from "./constants";
import get from 'lodash/get'
const ISSERVER = typeof window === "undefined";


export default function LoginPage() {
  useAuthBasedRedirection();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { mutate: signIn, data, isPending } = useAuthControllerSignIn();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (data) {
      if (!ISSERVER && localStorage) localStorage.setItem(TOKEN_KEY, get(data , 'access_token'));
      dispatch({
        type: "SET_USER",
        payload: get(data , 'user'),
      });
    }
  }, [data, dispatch]);

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
      signIn({
        data: {
          email,
          password,
        },
      });
    }
  };

  return (
    <div>
      <WhitePaper>
        {/* Header with tabs */}

        {/* Form */}
        <div className="space-y-4 w-[100%] min-w-[300px]  h-[547px] flex flex-col gap-3">
          <div className="w-[265px] h-[60px] p-1">
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "500",
                lineHeight: "100%",
                letterSpacing: "0",
              }}
            >
              What&apos;s your phone number or email
            </h1>
          </div>

          {/* <Input
            placeholder="Email"
            type="email"
            className="bg-[#F4F4F4] rounded-lg h-12 text-[16px] font-semibold"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
          <div>
            <Input
              placeholder="Email"
              type="email"
              className="bg-[#F4F4F4] rounded-lg h-12 text-[16px] font-semibold"
              value={email}
              onChange={(e) => {
                setEmail(e?.target?.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              value={password}
              type="password"
              placeholder="Password"
              className=" bg-[#F4F4F4] rounded-lg h-12 text-[16px] font-semibold"
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
            value={password}
            type="password"
            placeholder="Password"
            className="w-full  bg-[#F4F4F4] rounded-lg h-12 text-[16px] font-semibold"
            onChange={(e) => setPassword(e?.target?.value)}
          />
           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} */}
          {/* <a href="#" className="text-sm text-blue-500">
            Forgot password?
          </a> */}
          <Button
            style={{ width: "100%" }}
            className="h-12 font-medium text-[16px] rounded-lg "
            disabled={!email || !password}
            // onClick={() =>
            //   signIn({
            //     data: {
            //       email,
            //       password,
            //     },
            //   })
            // }
            onClick={handleSubmit}
            isLoading={isPending}
          >
            Continue
          </Button>
        </div>
        {/* Footer Text */}
        <p className="mb-2 font-normal h-[51px] w-[261px] text-sm text-gray-500 ">
          Get the job done with low prices. Connect directly with 100s of crew
          members in your local area.
        </p>
      </WhitePaper>
    </div>
  );
}
