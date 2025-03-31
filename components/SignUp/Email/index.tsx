import { FC, memo, useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useAuthControllerSignUp } from "@/apis/generated";
import { TOKEN_KEY } from "@/app/auth/login/constants";
import { useAppContext } from "@/context/AppContext";
import WhitePaper from "@/components/ui/white-paper";
import { CreateUserDtoRole } from "@/apis/generated.schemas";

const isServer = typeof window === "undefined";

interface EmailStepProps {
  userType: CreateUserDtoRole;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EmailStep: FC<EmailStepProps> = ({ userType, setStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { dispatch } = useAppContext();
  const { mutate, data, isPending } = useAuthControllerSignUp();

  useEffect(() => {
    if (data?.access_token) {
      if (!isServer && localStorage) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
      }
      dispatch({
        type: "SET_USER",
        payload: data.user,
      });
      setStep((prev: number) => prev + 1);
    }
  }, [data, dispatch, setStep]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ characters with uppercase, number & special character";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const getEmailError = () => {
    if (errors.email) return errors.email;
    if (data?.code === "EMAIL_EXISTS") return data.message;
    return "";
  };

  return (
    <WhitePaper className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Create your account
          </h1>
          <p className="text-sm text-neutral-600">
            Enter your email and create a password to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              className="form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              aria-invalid={!!getEmailError()}
              aria-describedby={getEmailError() ? "email-error" : undefined}
            />
            {getEmailError() && (
              <p id="email-error" className="text-error text-sm" role="alert">
                {getEmailError()}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              className="form-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-error text-sm"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12  text-white disabled:opacity-50 rounded-lg transition-colors"
            disabled={!email || !password || isPending}
            isLoading={isPending}
            loadingText="Creating account..."
          >
            Create account
          </Button>
        </form>

        <div className="text-sm text-center text-neutral-600">
          Get the job done with low prices. Connect directly with hundreds of
          crew members in your local area.
        </div>
      </div>
    </WhitePaper>
  );
};

export default memo(EmailStep);
