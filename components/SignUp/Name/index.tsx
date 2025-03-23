import { FC, memo, useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";
import { useUsersControllerUpdateUserInfo } from "@/apis/generated";
import { useAppContext } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";
import WhitePaper from "@/components/ui/white-paper";

interface NameStepProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface FormState {
  firstName: string;
  lastName: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
}

const NameStep: FC<NameStepProps> = ({ setStep }) => {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { mutate, data, isPending } = useUsersControllerUpdateUserInfo();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (data?.firstName) {
      dispatch({
        type: "SET_USER",
        payload: data,
      });
      setStep((prev: number) => prev + 1);
    }
  }, [data, dispatch, setStep]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    if (formData.lastName.trim() && formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({
        data: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
      });
    }
  };

  return (
    <WhitePaper className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            What&apos;s your name?
          </h1>
          <p className="text-sm text-neutral-600">
            Please enter your name as it appears on your official documents
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="firstName"
              placeholder="First name"
              className="form-input"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="text-error text-sm"
                role="alert"
              >
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="lastName"
              placeholder="Last name (optional)"
              className="form-input"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="text-error text-sm"
                role="alert"
              >
                {errors.lastName}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary text-white hover:bg-primary-hover disabled:opacity-50 rounded-lg transition-colors"
            disabled={!formData.firstName.trim() || isPending}
            isLoading={isPending}
            loadingText="Saving..."
          >
            <span className="flex items-center gap-2">
              Continue
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
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

export default memo(NameStep);
