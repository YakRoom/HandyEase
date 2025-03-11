"use client";
import {
  useProvidersControllerCreateProvider,
  useProvidersControllerGetMyProviderDetails,
  useProvidersControllerGetSuggestions,
  useProvidersControllerUpdateMyDetails,
} from "@/apis/generated";
import { CreateUserDtoRole } from "@/apis/generated.schemas";
import { useAppContext } from "@/context/AppContext";
import useAuthBasedRedirection from "@/hooks/useAuthBasedRedirection";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { FormField, Input, TextArea } from "@/components/ui/form-field";

interface ProviderState {
  profilePic: string;
  payRate: number | null;
  experience: number | null;
  postcode: string;
  radius: number;
  phone: string;
  allowCalls: boolean;
  resume: string | File;
  about: string;
  skills: string[];
}

interface ValidationErrors {
  [key: string]: string;
}

type FieldValue = string | number | boolean | File | string[] | null;

type ProviderAction =
  | { type: "SET_FIELD"; field: keyof ProviderState; value: FieldValue }
  | { type: "TOGGLE_CALLS" }
  | { type: "ADD_SKILL"; skill: string }
  | { type: "REMOVE_SKILL"; skill: string }
  | { type: "SET_RESUME"; file: File };

const DEFAULT_RADIUS = 5;
const MIN_RADIUS = 1;
const MAX_RADIUS = 50;

const AVAILABLE_SKILLS = [
  "ELECTRICIAN",
  "PLUMBER",
  "GARDENER",
  "CARPENTER",
  "PAINTER",
  "BABY_SITTER",
  "CLEANER",
];

const initialState: ProviderState = {
  profilePic: "",
  payRate: null,
  experience: null,
  postcode: "",
  radius: DEFAULT_RADIUS,
  phone: "",
  allowCalls: false,
  resume: "",
  about: "",
  skills: [],
};

function reducer(state: ProviderState, action: ProviderAction): ProviderState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_CALLS":
      return { ...state, allowCalls: !state.allowCalls };
    case "ADD_SKILL":
      return {
        ...state,
        skills: state.skills.includes(action.skill)
          ? state.skills
          : [...state.skills, action.skill],
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((s) => s !== action.skill),
      };
    case "SET_RESUME":
      return { ...state, resume: action.file };
    default:
      return state;
  }
}

const ProviderSetup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { mutate } = useProvidersControllerCreateProvider();
  const { state: appState } = useAppContext();
  const { data: providerDetails } = useProvidersControllerGetMyProviderDetails(
    { userId: "" },
    {
      query: {
        enabled:
          appState?.user?.role === CreateUserDtoRole.PROVIDER &&
          appState?.user?.policyAccepted,
        refetchOnMount: false,
      },
    }
  );
  const isEditMode = Object.values(providerDetails || {}).length > 0;
  const { mutate: mutateEdit } = useProvidersControllerUpdateMyDetails();
  const { mutate: mutateSuggestions, data: locationData } =
    useProvidersControllerGetSuggestions();
  useAuthBasedRedirection();
  const router = useRouter();

  useEffect(() => {
    if (state.postcode.trim()) {
      mutateSuggestions({ data: { place: state.postcode } });
    }
  }, [state.postcode, mutateSuggestions]);

  useEffect(() => {
    if (appState?.user?.role === CreateUserDtoRole.CONSUMER) {
      router.replace("/");
    }
  }, [appState?.user, router]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!state.about.trim()) {
      newErrors.about = "Please tell us about yourself";
    }

    if (state.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }

    if (state.payRate === null || state.payRate <= 0) {
      newErrors.payRate = "Please enter a valid pay rate";
    }

    if (state.experience === null) {
      newErrors.experience = "Please enter your years of experience";
    }

    if (!state.postcode.trim()) {
      newErrors.postcode = "Please enter your postcode";
    }

    if (!state.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^\+?[\d\s-]{10,}$/.test(state.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector("[data-error='true']");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const providerData = {
      providerPicture: state.profilePic,
      bio: state.about,
      serviceTypes: state.skills,
      hourlyRate: state.payRate,
      experienceYears: state.experience,
      locationId: locationData?.[0]?.place_id || "",
      radius: state.radius,
      phoneNumber: state.phone,
      showPhoneNumber: state.allowCalls,
      resume: state.resume,
    };

    try {
      if (isEditMode) {
        mutateEdit({ data: providerData });
      } else {
        mutate({ data: providerData });
      }
      router.replace("/");
    } catch (error) {
      console.error("Error saving provider details:", error);
      setErrors({
        ...errors,
        submit: "Failed to save your details. Please try again.",
      });
    }
  };

  // Helper function to clear specific error
  const clearError = (field: keyof ProviderState) => {
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [field]: removedError, ...rest } = prev;
      return rest;
    });
  };

  const handleFieldChange = (field: keyof ProviderState, value: FieldValue) => {
    dispatch({ type: "SET_FIELD", field, value });
    clearError(field);
  };

  const handleSkillToggle = (skill: string) => {
    dispatch({ type: "ADD_SKILL", skill });
    clearError("skills");
  };

  const handlePhoneChange = (value: string) => {
    dispatch({ type: "SET_FIELD", field: "phone", value });
    // Only clear error if the new value is valid
    if (/^\+?[\d\s-]{10,}$/.test(value.trim())) {
      clearError("phone");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Let's get to know you more
      </h2>

      <div className="flex flex-col items-center mt-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center relative">
          {state.profilePic ? (
            <Image
              src={state.profilePic}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            "📷"
          )}
        </div>
        <button className="text-sm text-gray-600 mt-2 underline">
          Add a picture
        </button>
      </div>

      <div className="space-y-4 mt-6">
        <FormField label="Tell us about yourself" error={errors.about}>
          <TextArea
            placeholder="Describe your experience and expertise..."
            value={state.about}
            onChange={(e) => handleFieldChange("about", e.target.value)}
            error={errors.about}
          />
        </FormField>

        <FormField label="What are your expertise" error={errors.skills}>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SKILLS.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer ${
                  state.skills.includes(skill)
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </span>
            ))}
          </div>
        </FormField>

        <FormField label="Basic Pay Rate" error={errors.payRate}>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              className="w-16"
              placeholder="£"
              min={1}
              value={state.payRate || ""}
              onChange={(e) =>
                handleFieldChange(
                  "payRate",
                  e.target.value ? Number(e.target.value) : null
                )
              }
              error={errors.payRate}
            />
            <span className="text-gray-700">/ hr</span>
          </div>
        </FormField>

        <FormField label="Experience" error={errors.experience}>
          <Input
            type="number"
            placeholder="Years of experience"
            min={0}
            value={state.experience || ""}
            onChange={(e) =>
              handleFieldChange(
                "experience",
                e.target.value ? Number(e.target.value) : null
              )
            }
            error={errors.experience}
          />
        </FormField>

        <FormField label="Preferred Location" error={errors.postcode}>
          <Input
            type="text"
            placeholder="Enter your postcode"
            value={state.postcode}
            onChange={(e) => handleFieldChange("postcode", e.target.value)}
            error={errors.postcode}
          />
        </FormField>

        <div className="mt-2">
          <input
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            value={state.radius}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "radius",
                value: Number(e.target.value),
              })
            }
            className="w-3/4"
          />
          <span className="text-gray-700">{state.radius} miles</span>
        </div>

        <FormField label="Phone Number" error={errors.phone}>
          <Input
            type="tel"
            placeholder="+44"
            value={state.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            error={errors.phone}
          />
        </FormField>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-700">Allow direct calls</span>
          <input
            type="checkbox"
            checked={state.allowCalls}
            onChange={() => dispatch({ type: "TOGGLE_CALLS" })}
            className="h-5 w-5"
          />
        </div>

        <FormField label="Resume or Certifications">
          <input
            type="file"
            className="mt-2 text-sm"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFieldChange("resume", e.target.files[0])
            }
          />
        </FormField>

        {errors.submit && (
          <div className="mt-4">
            <p className="text-sm text-red-500">{errors.submit}</p>
          </div>
        )}

        <button
          className="w-full bg-black text-white py-2 rounded-md mt-6 hover:bg-gray-800 transition-colors"
          onClick={handleSubmit}
        >
          {isEditMode ? "Save Changes" : "Next"} →
        </button>
      </div>
    </div>
  );
};

export default ProviderSetup;
